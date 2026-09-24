import { ALTERNATE_NAME, SITE_NAME, SITE_URL, socialLinks } from "@/data/site"

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        alternateName: ALTERNATE_NAME,
        url: `${SITE_URL}/`,
        jobTitle: "Desenvolvedor de sites, sistemas e automações",
        knowsAbout: ["Sites profissionais", "Sistemas web", "Automações", "Integrações com APIs", "Software sob medida"],
        sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: `${SITE_NAME} — Sites, Sistemas e Automações`,
        alternateName: `${ALTERNATE_NAME} — Portfólio`,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
}
