import DirectoryPage from "@/components/pages/DirectoryPage";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Case Studies | Codernatix",
  description: "Selected digital product and software projects from Codernatix.",
};

export default function Page() {
  return (
    <DirectoryPage
      eyebrow="Selected work"
      title="Proof in the details."
      description="Explore a few product concepts that show how we think about clear user journeys, maintainable technology and useful outcomes."
      items={projects.map((project) => ({
        ...project,
        href: `/case-studies/${project.slug}`,
        description: project.description,
      }))}
      ctaTitle="Let’s make your next case study."
      ctaText="Tell us what you are trying to improve, build or launch."
    />
  );
}
