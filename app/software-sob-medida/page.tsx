import { ServicePage } from "@/components/service-page"
import { servicePages } from "@/data/services"
import { createPageMetadata } from "@/lib/seo"

const service = servicePages["software-sob-medida"]
export const metadata = createPageMetadata({ title: "Software sob medida", description: service.description, path: "/software-sob-medida" })
export default function Page() { return <ServicePage service={service} /> }
