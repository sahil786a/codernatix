import DirectoryPage from "@/components/pages/DirectoryPage";

export const metadata = {
  title: "Careers | Codernatix",
  description: "Build useful digital products with the Codernatix team.",
};

export default function Page() {
  return (
    <DirectoryPage
      eyebrow="Work with us"
      title="Good work starts with good people."
      description="We are building a thoughtful team around clear communication, strong craft and a genuine interest in solving the right problem."
      items={[
        { title: "Product-minded", description: "We care about the people using what we build, not only the code behind it." },
        { title: "Always learning", description: "We make space to ask questions, share context and keep improving our craft." },
        { title: "Remote-friendly", description: "Work clearly and responsibly with a team that values focus and flexibility." },
      ]}
      ctaTitle="No open role that fits?"
      ctaText="Send us a note anyway. We are always happy to meet people who care about useful technology."
      ctaHref="/contact"
    />
  );
}
