import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import About from "@/components/home/AboutSection";
import Services from "@/components/home/ServicesSection";
import Solutions from "@/components/home/SolutionsSection";
import CaseStudies from "@/components/home/CaseStudiesSection";
import Technologies from "@/components/home/TechnologiesSection";
import WhyChooseUs from "@/components/home/WhyChooseUsSection";
import Process from "@/components/home/ProcessSection";
import CTA from "@/components/home/CTASection";
import FinalCTA from "@/components/home/FinalContactCTA";
import FAQ from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <Solutions />
      <CaseStudies />
      <Technologies />
      <WhyChooseUs />
      <Process />
      <CTA />
      <FinalCTA />
      <FAQ />
    </main>
  );
}