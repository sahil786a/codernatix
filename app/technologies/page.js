import DirectoryPage from "@/components/pages/DirectoryPage";
import { technologyCategories } from "@/data/technologies";

export const metadata = {
  title: "Technologies | Codernatix",
  description: "Explore the technologies Codernatix uses to build reliable digital products.",
};

export default function Page() {
  return (
    <DirectoryPage
      eyebrow="Our toolkit"
      title="Technology that fits the job."
      description="We choose tools around your goals, team and long-term needs—not trends. The result is software that is practical to launch and easier to evolve."
      items={technologyCategories.map((category) => ({
        ...category,
        description: `${category.description} ${category.technologies.slice(0, 4).map((technology) => technology.name).join(" · ")}.`,
      }))}
    />
  );
}
