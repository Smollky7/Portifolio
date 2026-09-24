"use client"

import { useEffect, useMemo, useRef, useState, type MutableRefObject, type PointerEvent as ReactPointerEvent } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MathUtils } from "three"
import type { Group, Mesh, Points, ShaderMaterial } from "three"
import { useReducedMotion } from "framer-motion"

type InteractionState = { x: number; y: number; active: number; touching: boolean }

const vertexShader = `
uniform float uTime; uniform vec2 uMouse; uniform float uInteraction;
varying float vDisplacement; varying float vInteraction; varying vec3 vNormal; varying vec3 vViewDirection;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;} vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);} vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m*=m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
void main(){vec3 unitPosition=normalize(position);float cursorDistance=distance(unitPosition.xy,uMouse*0.72);float cursorField=exp(-4.5*cursorDistance)*uInteraction;float primaryNoise=snoise(position*1.42+vec3(uTime*0.13,uTime*0.08,-uTime*0.1));float detailNoise=snoise(position*3.1-uTime*0.08)*0.035;float displacement=primaryNoise*0.18+detailNoise+cursorField*0.075;vec3 displaced=position+normal*displacement;vec4 modelViewPosition=modelViewMatrix*vec4(displaced,1.0);vDisplacement=displacement;vInteraction=cursorField;vNormal=normalize(normalMatrix*normal);vViewDirection=normalize(-modelViewPosition.xyz);gl_Position=projectionMatrix*modelViewPosition;}`

const fragmentShader = `
varying float vDisplacement; varying float vInteraction; varying vec3 vNormal; varying vec3 vViewDirection;
void main(){float fresnel=pow(1.0-max(dot(normalize(vNormal),normalize(vViewDirection)),0.0),2.35);float crest=smoothstep(0.055,0.19,vDisplacement);float pulse=0.5+0.5*sin(vDisplacement*38.0);float blueAmount=clamp(fresnel*0.48+crest*0.42+vInteraction*0.8,0.0,0.86);vec3 graphite=vec3(0.4+vDisplacement*0.9);vec3 electricBlue=vec3(0.145,0.388,0.922);vec3 color=mix(graphite,electricBlue,blueAmount*(0.7+pulse*0.3));float alpha=0.36+fresnel*0.24+crest*0.1+vInteraction*0.15;gl_FragColor=vec4(color,clamp(alpha,0.34,0.82));}`

function OrganicSphere({ interaction, reducedMotion, detail }: { interaction: MutableRefObject<InteractionState>; reducedMotion: boolean; detail: number }) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const target = useRef({ x: 0, y: 0, interaction: 0 })
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMouse: { value: [0, 0] }, uInteraction: { value: 0 } }), [])
  useFrame((_, delta) => {
    const current = interaction.current
    target.current.x = MathUtils.lerp(target.current.x, current.x, 0.075)
    target.current.y = MathUtils.lerp(target.current.y, current.y, 0.075)
    target.current.interaction = MathUtils.lerp(target.current.interaction, current.active, 0.065)
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * (reducedMotion ? 0.08 : 1)
      materialRef.current.uniforms.uMouse.value = [target.current.x, target.current.y]
      materialRef.current.uniforms.uInteraction.value = target.current.interaction
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (reducedMotion ? 0.006 : 0.045)
      const response = current.touching ? 0.42 : 0.24
      meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, target.current.y * response, 0.045)
      meshRef.current.rotation.z = MathUtils.lerp(meshRef.current.rotation.z, target.current.x * response, 0.045)
    }
  })
  return <mesh ref={meshRef}><icosahedronGeometry args={[1.8, detail]} /><shaderMaterial ref={materialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent wireframe depthWrite={false} /></mesh>
}

function Orbitals({ reducedMotion, mobile }: { reducedMotion: boolean; mobile: boolean }) {
  const groupRef = useRef<Group>(null)
  const pointsRef = useRef<Points>(null)
  const points = useMemo(() => {
    const count = mobile ? 28 : 54
    const positions = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2
      const radius = 2.08 + ((index * 17) % 11) * 0.018
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = Math.sin(angle) * radius * 0.58
      positions[index * 3 + 2] = Math.sin(angle * 2.7) * 0.32
    }
    return positions
  }, [mobile])
  useFrame((_, delta) => {
    if (reducedMotion) return
    if (groupRef.current) groupRef.current.rotation.z += delta * 0.025
    if (pointsRef.current) pointsRef.current.rotation.y -= delta * 0.035
  })
  return <group ref={groupRef} rotation={[0.48, -0.18, -0.24]}>
    <mesh><torusGeometry args={[2.15, 0.006, 4, mobile ? 96 : 180]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.22} depthWrite={false} /></mesh>
    {!mobile && <mesh rotation={[0.35, 0.2, 0.72]}><torusGeometry args={[2.28, 0.004, 4, 180]} /><meshBasicMaterial color="#dbeafe" transparent opacity={0.1} depthWrite={false} /></mesh>}
    <points ref={pointsRef}><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry><pointsMaterial color="#3b82f6" size={mobile ? 0.022 : 0.018} transparent opacity={0.58} sizeAttenuation depthWrite={false} /></points>
  </group>
}

export function SentientSphere() {
  const [mounted, setMounted] = useState(false)
  const [mobile, setMobile] = useState(false)
  const reducedMotion = Boolean(useReducedMotion())
  const interaction = useRef<InteractionState>({ x: 0, y: 0, active: 0, touching: false })
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => setMobile(media.matches)
    const frame = window.requestAnimationFrame(() => { update(); setMounted(true) })
    media.addEventListener("change", update)
    return () => { window.cancelAnimationFrame(frame); media.removeEventListener("change", update) }
  }, [])
  const updatePointer = (event: ReactPointerEvent<HTMLDivElement>, active = 0.7) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    interaction.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    interaction.current.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
    interaction.current.active = reducedMotion ? 0 : active
  }
  if (!mounted) return <div className="h-full w-full" aria-hidden="true" />
  return <div className="h-full w-full touch-pan-y" onPointerEnter={(event) => updatePointer(event, 0.35)} onPointerMove={(event) => updatePointer(event, interaction.current.touching ? 1 : 0.68)} onPointerDown={(event) => { interaction.current.touching = event.pointerType !== "mouse"; updatePointer(event, 1) }} onPointerUp={() => { interaction.current.touching = false; interaction.current.active = 0.25 }} onPointerCancel={() => { interaction.current.touching = false; interaction.current.active = 0 }} onPointerLeave={() => { interaction.current = { x: 0, y: 0, active: 0, touching: false } }}>
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={mobile ? [1, 1.2] : [1, 1.65]} gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }} performance={{ min: 0.55 }}>
      <OrganicSphere interaction={interaction} reducedMotion={reducedMotion} detail={mobile ? 24 : 48} /><Orbitals reducedMotion={reducedMotion} mobile={mobile} />
    </Canvas>
  </div>
}
