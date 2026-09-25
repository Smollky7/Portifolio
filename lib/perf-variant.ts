export const PERF_VARIANTS = ["baseline", "no-sphere", "no-lenis", "no-hero-motion"] as const

export type PerfVariant = (typeof PERF_VARIANTS)[number]

export function getPerfVariant(): PerfVariant {
  const value = process.env.PERF_VARIANT

  return PERF_VARIANTS.includes(value as PerfVariant) ? (value as PerfVariant) : "baseline"
}

export function isPreviewDeployment() {
  return process.env.VERCEL_ENV === "preview"
}
