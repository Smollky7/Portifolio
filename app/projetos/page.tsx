import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { projects } from "@/data/projects"
import { CONTACT_URL } from "@/data/site"
import { BreadcrumbStructuredData, createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Projetos de sites, sistemas e automações",
  description: "Conheça projetos de plataformas, landing pages, automações e software desenvolvidos por Jardel Sousa.",
  path: "/projetos",
})

const serviceLinks = [
  { label: "Criação de sites", href: "/criacao-de-sites" },
  { label: "Sistemas web", href: "/sistemas-web" },
  { label: "Automações", href: "/automacoes" },
  { label: "Software sob medida", href: "/software-sob-medida" },
]

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbStructuredData name="Projetos" path="/projetos" />
      <CustomCursor />
      <Navbar />
      <main className="seo-page">
        <header className="seo-hero section-shell">
          <Link href="/#projects" className="seo-back"><ArrowLeft aria-hidden="true" /> Voltar para a página inicial</Link>
          <p className="section-kicker">PROJETOS SELECIONADOS</p>
          <h1>Software construído para problemas reais.</h1>
          <p className="seo-lead">Uma seleção de sites, sistemas e automações desenvolvidos a partir de necessidades concretas. Os detalhes abaixo reutilizam somente informações já documentadas nos cases do portfólio.</p>
        </header>

        <section className="seo-projects section-shell" aria-label="Lista de projetos">
          {projects.map((project, index) => (
            <article key={project.slug} id={project.slug} className="seo-project">
              <div className="seo-project-index"><span>{String(index + 1).padStart(2, "0")}</span><p>{project.category}</p></div>
              <div className="seo-project-copy">
                <h2>{project.title}</h2><p>{project.summary}</p>
                <dl><div><dt>Contexto</dt><dd>{project.context}</dd></div><div><dt>Necessidade</dt><dd>{project.problem}</dd></div><div><dt>Solução</dt><dd>{project.solution}</dd></div>{project.status ? <div><dt>Status</dt><dd>{project.status}</dd></div> : null}</dl>
                <div className="seo-project-deliverables"><h3>O que foi desenvolvido</h3><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
                {project.technologies?.length ? <div className="seo-project-technologies"><h3>Tecnologias relacionadas</h3><p>{project.technologies.join(" · ")}</p></div> : null}
              </div>
              <div className="seo-project-media">
                {project.images?.[0] ? <div className="seo-project-image"><Image src={project.images[0]} alt={project.imageAlts?.[0] ?? `Tela do projeto ${project.title}`} fill sizes="(max-width: 767px) 100vw, 38vw" className="object-contain" /></div> : <span aria-hidden="true">{project.title}</span>}
              </div>
            </article>
          ))}
        </section>

        <nav className="seo-related section-shell" aria-label="Serviços relacionados aos projetos">
          <p className="section-kicker">SOLUÇÕES</p>
          <div>{serviceLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight aria-hidden="true" /></Link>)}</div>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta-primary seo-primary-cta"><span>Conversar sobre um projeto</span><ArrowUpRight aria-hidden="true" /></a>
        </nav>
      </main>
      <Footer />
    </>
  )
}
