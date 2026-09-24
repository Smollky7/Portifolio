export const SITE_URL = "https://www.jardelsousadev.com.br"

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/jardelsousadev",
  github: "https://github.com/Smollky7",
  instagram: "https://instagram.com/smollky7",
  whatsapp: "https://wa.me/5538997394643",
} as const

export const CONTACT_URL = `${socialLinks.whatsapp}?text=${encodeURIComponent(
  "Olá, Jardel! Vi seu portfólio e gostaria de conversar sobre um projeto."
)}`