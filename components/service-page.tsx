import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { CONTACT_URL } from "@/data/site"
import type { ServicePageData } from "@/data/services"
import { BreadcrumbStructuredData, FaqStructuredData } from "@/lib/seo"

export function ServicePage({ service }: { service: ServicePageData }) {
  return (
    <>
      <BreadcrumbStructuredData name={service.title} path={`/${service.slug}`} />
      {service.faq ? <FaqStructuredData items={service.faq} /> : null}
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

        {service.overview ? <section className="seo-section section-shell" aria-labelledby="visao-geral-title">
          <p className="section-kicker">{service.overview.eyebrow}</p>
          <div className="seo-two-column seo-copy-section">
            <h2 id="visao-geral-title">{service.overview.title}</h2>
            <div className="seo-prose">{service.overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </section> : null}

        <section className="seo-section section-shell" aria-labelledby="entregas-title">
          <p className="section-kicker">{service.overview ? "03" : "02"} — POSSIBILIDADES</p>
          <h2 id="entregas-title">Uma solução definida pelo objetivo.</h2>
          <div className="seo-card-grid">{service.deliveries.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        </section>

        {service.decision ? <section className="seo-section section-shell" aria-labelledby="decisao-title">
          <p className="section-kicker">{service.decision.eyebrow}</p>
          <h2 id="decisao-title">{service.decision.title}</h2>
          <p className="seo-section-intro">{service.decision.introduction}</p>
          <div className="seo-decision-grid">{service.decision.items.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        </section> : null}

        {service.considerations ? <section className="seo-section section-shell" aria-labelledby="consideracoes-title">
          <p className="section-kicker">{service.considerations.eyebrow}</p>
          <div className="seo-two-column">
            <h2 id="consideracoes-title">{service.considerations.title}</h2>
            <dl className="seo-definition-list">{service.considerations.items.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
          </div>
        </section> : null}

        <section className="seo-section section-shell" aria-labelledby="processo-title">
          <p className="section-kicker">{service.decision ? "06" : "03"} — PROCESSO</p>
          <div className="seo-two-column">
            <h2 id="processo-title">Da necessidade à operação.</h2>
            <ol className="seo-steps">{service.process.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
          </div>
        </section>

        {service.projectLinks ? <section className="seo-section section-shell" aria-labelledby="provas-title">
          <p className="section-kicker">07 — PROJETOS RELACIONADOS</p>
          <h2 id="provas-title">Soluções que mostram essa capacidade.</h2>
          <div className="seo-proof-grid">{service.projectLinks.map((project) => <Link key={project.href} href={project.href}><div><h3>{project.title}</h3><p>{project.description}</p></div><ArrowUpRight aria-hidden="true" /></Link>)}</div>
        </section> : null}

        {service.faq ? <section className="seo-section section-shell" aria-labelledby="faq-title">
          <p className="section-kicker">08 — DÚVIDAS DE DECISÃO</p>
          <div className="seo-two-column seo-faq-layout">
            <div><h2 id="faq-title">Perguntas frequentes.</h2><p className="seo-faq-intro">Respostas diretas para avaliar se esta solução combina com o problema atual.</p></div>
            <div className="seo-faq-list">{service.faq.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section> : null}

        <nav className="seo-related section-shell" aria-label="Serviços relacionados">
          <p className="section-kicker">CONTINUE EXPLORANDO</p>
          <div>{service.related.map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight aria-hidden="true" /></Link>)}</div>
        </nav>
      </main>
      <Footer />
    </>
  )
}
