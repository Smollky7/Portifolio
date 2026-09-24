import { ServicePage } from "@/components/service-page"
import { servicePages } from "@/data/services"
import { createPageMetadata } from "@/lib/seo"

const service = servicePages["criacao-de-sites"]
export const metadata = createPageMetadata({ title: "Criação de sites profissionais", description: service.description, path: "/criacao-de-sites" })
export default function Page() { return <ServicePage service={service} /> }
