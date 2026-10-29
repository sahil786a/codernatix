import AboutHero from "@/components/about/AboutHero";
import OurStorySection from "@/components/about/OurStorySection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import OurApproachSection from "@/components/about/OurApproachSection";
import ExpertiseSection from "@/components/about/ExpertiseSection";
import HowWeWorkSection from "@/components/about/HowWeWorkSection";
import TeamSection from "@/components/about/TeamSection";
import DifferenceSection from "@/components/about/DifferenceSection";
import AboutFAQSection from "@/components/about/AboutFAQSection";
import AboutFinalCTA from "@/components/about/AboutFinalCTA";

export const metadata = {
  title: "About Codernatix | Technology & Digital Solutions",
  description:
    "Learn about Codernatix: our story, mission, values and the practical, requirement-first approach we take to building useful digital solutions.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Codernatix",
    description:
      "Our story, mission, values and the way we turn ideas into practical digital solutions.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStorySection />
      <MissionVisionSection />
      <CoreValuesSection />
      <OurApproachSection />
      <ExpertiseSection />
      <HowWeWorkSection />
      <TeamSection />
      <DifferenceSection />
      <AboutFAQSection />
      <AboutFinalCTA />
    </>
  );
}