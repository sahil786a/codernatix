import DirectoryPage from "@/components/pages/DirectoryPage";
import { industries } from "@/data/industries";

export const metadata = {
  title: "Industries | Codernatix",
  description: "Digital products and software for the industries we serve.",
};

export default function Page() {
  return (
    <DirectoryPage
      eyebrow="Industry experience"
      title="Context matters. We build with yours in mind."
      description="Every industry has its own language, constraints and opportunities. Our team learns how your work happens before we recommend what to build."
      items={industries}
    />
  );
}
