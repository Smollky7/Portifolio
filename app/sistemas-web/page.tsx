import { ServicePage } from "@/components/service-page"
import { servicePages } from "@/data/services"
import { createPageMetadata } from "@/lib/seo"

const service = servicePages["sistemas-web"]
export const metadata = createPageMetadata({ title: "Desenvolvimento de sistemas web", description: service.description, path: "/sistemas-web" })
export default function Page() { return <ServicePage service={service} /> }
