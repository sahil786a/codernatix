import DirectoryPage from "@/components/pages/DirectoryPage";
import { solutions } from "@/data/solutions";

export const metadata = {
  title: "Solutions | Codernatix",
  description: "Digital solutions tailored to the way your business works.",
};

export default function Page() {
  return (
    <DirectoryPage
      eyebrow="Solutions for growth"
      title="Useful technology for real business needs."
      description="Whether you are validating an idea or improving an established operation, we help you turn complex requirements into clear digital products."
      items={solutions}
    />
  );
}
