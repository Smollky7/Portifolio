import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { CONTACT_URL } from "@/data/site"
import type { ServicePageData } from "@/data/services"
import { BreadcrumbStructuredData } from "@/lib/seo"

export function ServicePage({ service }: { service: ServicePageData }) {
  return (
    <>
      <BreadcrumbStructuredData name={service.title} path={`/${service.slug}`} />
      <CustomCursor />
      <Navbar />
      <main className="seo-page">
        <header className="seo-hero section-shell">
          <Link href="/#services" className="seo-back"><ArrowLeft aria-hidden="true" /> Voltar para soluções</Link>
          <p className="section-kicker">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className="seo-lead">{service.introduction}</p>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta-primary seo-primary-cta"><span>Conversar sobre o projeto</span><ArrowUpRight aria-hidden="true" /></a>
        </header>

        <section className="seo-section section-shell" aria-labelledby="problemas-title">
          <p className="section-kicker">01 — QUANDO FAZ SENTIDO</p>
          <div className="seo-two-column">
            <h2 id="problemas-title">Problemas que esta solução pode organizar.</h2>
            <ul className="seo-list">{service.problems.map((problem) => <li key={problem}>{problem}</li>)}</ul>
          </div>
        </section>

        <section className="seo-section section-shell" aria-labelledby="entregas-title">
          <p className="section-kicker">02 — POSSIBILIDADES</p>
          <h2 id="entregas-title">Uma solução definida pelo objetivo.</h2>
          <div className="seo-card-grid">{service.deliveries.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        </section>

        <section className="seo-section section-shell" aria-labelledby="processo-title">
          <p className="section-kicker">03 — PROCESSO</p>
          <div className="seo-two-column">
            <h2 id="processo-title">Da necessidade à operação.</h2>
            <ol className="seo-steps">{service.process.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
          </div>
        </section>

        <nav className="seo-related section-shell" aria-label="Serviços relacionados">
          <p className="section-kicker">CONTINUE EXPLORANDO</p>
          <div>{service.related.map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight aria-hidden="true" /></Link>)}</div>
        </nav>
      </main>
      <Footer />
    </>
  )
}
