import DirectoryPage from "@/components/pages/DirectoryPage";

const services = [
  { title: "Search Engine Optimisation", description: "Build sustainable visibility with content and technical improvements that match how people search.", href: "/digital-marketing/seo" },
  { title: "Content Marketing", description: "Useful, consistent content that earns attention and supports your sales journey.", href: "/digital-marketing/content-marketing" },
  { title: "Google Ads", description: "Reach high-intent audiences with focused campaigns and clear measurement.", href: "/digital-marketing/google-ads" },
  { title: "Social Media Marketing", description: "Create a recognisable presence and conversations around your brand.", href: "/digital-marketing/social-media-marketing" },
  { title: "Performance Marketing", description: "Connect creative, campaigns and reporting around outcomes that matter.", href: "/digital-marketing/performance-marketing" },
];

export const metadata = {
  title: "Digital Marketing | Codernatix",
  description: "Digital marketing services that help growing businesses get discovered and grow.",
};

export default function Page() {
  return (
    <DirectoryPage
      eyebrow="Digital marketing"
      title="Be easier to find. Be easier to choose."
      description="We combine thoughtful messaging, discoverability and measurable campaigns to help the right people find your business."
      items={services}
    />
  );
}
