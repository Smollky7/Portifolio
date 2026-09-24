import { SITE_URL, socialLinks } from "@/data/site"

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Jardel Sousa",
        url: `${SITE_URL}/`,
        jobTitle: "Desenvolvedor de soluções digitais",
        sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Jardel Sousa — Sites, Sistemas e Automações",
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
}
