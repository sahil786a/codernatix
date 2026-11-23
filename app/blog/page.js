import DirectoryPage from "@/components/pages/DirectoryPage";

const articles = [
  { title: "How to scope a digital product before development", description: "A practical way to turn an early idea into a focused first release.", href: "/contact", kicker: "Product" },
  { title: "Choosing a technology stack that can grow with you", description: "The questions that matter more than picking the newest framework.", href: "/contact", kicker: "Engineering" },
  { title: "What makes a website useful for a growing business?", description: "A clear look at content, performance and conversion fundamentals.", href: "/contact", kicker: "Growth" },
];

export const metadata = {
  title: "Insights | Codernatix",
  description: "Practical notes on digital products, technology and growth.",
};

export default function Page() {
  return (
    <DirectoryPage
      eyebrow="Insights"
      title="Useful ideas for building what’s next."
      description="Short, practical notes from the work we do across product strategy, software development and digital growth."
      items={articles}
      ctaTitle="Have a question for our team?"
      ctaText="Bring us the problem behind the question and we’ll help you think it through."
    />
  );
}
