import { ServicePage } from "@/components/service-page"
import { servicePages } from "@/data/services"
import { createPageMetadata } from "@/lib/seo"

const service = servicePages.automacoes
export const metadata = createPageMetadata({ title: "Automações e integrações", description: service.description, path: "/automacoes" })
export default function Page() { return <ServicePage service={service} /> }
