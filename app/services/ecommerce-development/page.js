import { notFound } from "next/navigation";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import { getService, buildServiceMetadata } from "@/lib/services";

const SLUG = "ecommerce-development";
export const metadata = buildServiceMetadata(SLUG);

export default function Page() {
  const service = getService(SLUG);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}