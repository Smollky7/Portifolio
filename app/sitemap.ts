import type { MetadataRoute } from "next"
import { SITE_URL } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/criacao-de-sites", priority: 0.9 },
    { path: "/sistemas-web", priority: 0.9 },
    { path: "/automacoes", priority: 0.9 },
    { path: "/software-sob-medida", priority: 0.9 },
    { path: "/projetos", priority: 0.8 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }))
}
