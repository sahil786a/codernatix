import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ProcessSection from "@/components/home/ProcessSection";
import FreeConsultationCTA from "@/components/home/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import { listServices } from "@/lib/services";
import { serviceCategories } from "@/data/services";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const metadata = {
  title: "Our Services | Codernatix",
  description:
    "Software development, websites, mobile apps, AI, cloud, security, design and digital marketing. Explore what Codernatix can build and support for your business.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Codernatix",
    description:
      "Software development, websites, mobile apps, AI, cloud, security, design and digital marketing.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  const services = listServices();

  // Plain objects only: nothing but strings/arrays crosses to the client grid
  const gridServices = services.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    image: s.image,
    tags: s.tags,
    category: s.category,
    accent: s.accent,
  }));

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${SITE_URL}/services/${s.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={listSchema} />
      <ServicesHero count={services.length} />
      <ServicesGrid services={gridServices} categories={serviceCategories} />
      <ProcessSection />
      <FreeConsultationCTA />
    </>
  );
}
