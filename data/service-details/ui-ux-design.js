/*
 * UI/UX Design: detail content
 *
 * Draft copy. Review against what Codernatix actually delivers before publishing.
 * Rules: no invented clients, numbers, awards, guarantees, prices or timelines.
 * No conversion or usability-result promises.
 * `technologies` must use names from data/technologies.js so logos resolve.
 * `icon` values are string keys, resolved inside the client component.
 */

const uiUxDesign = {
  seo: {
    title: "UI/UX Design Services | Codernatix",
    description:
      "User-centred interface design for websites, web apps and mobile apps. Talk to Codernatix about designing a product people find clear and easy to use.",
  },

  headline: "Interfaces People Find",
  highlight: "Clear and Easy to Use",
  intro:
    "Design that starts from your users and your goals, from first sketches and wireframes through to polished screens ready for development.",

  overview: [
    "Good design is not decoration. It helps people understand what a product does, find what they need and complete tasks without confusion. That takes an understanding of your users as well as visual skill.",
    "We work through the structure and flow first, then the visual design, and review it with you along the way. The result is a set of designs, and where needed a design system, that developers can build from directly.",
  ],

  bestFor: [
    "Teams starting a new website, web app or mobile app",
    "Products that users find confusing or hard to navigate",
    "Businesses refreshing an outdated look and feel",
    "Founders who want to see their idea before building it",
  ],

  features: [
    {
      title: "User research and flows",
      text: "We learn who the users are and map the steps they take, so the design supports real tasks.",
      icon: "users",
    },
    {
      title: "Wireframes",
      text: "Low-fidelity layouts that settle structure and content before any visual styling.",
      icon: "layout",
    },
    {
      title: "Visual design",
      text: "Colour, typography and imagery shaped around your brand and your audience.",
      icon: "palette",
    },
    {
      title: "Interactive prototypes",
      text: "Clickable prototypes so you and your users can try the experience before development starts.",
      icon: "mouse-pointer",
    },
    {
      title: "Design systems",
      text: "Where it fits the project, reusable components and style rules keep the product consistent as it grows.",
      icon: "layers",
    },
    {
      title: "Accessible design",
      text: "Readable contrast, clear structure and keyboard-friendly patterns so more people can use the product.",
      icon: "accessibility",
    },
  ],

  process: [
    {
      title: "Understand",
      text: "We learn about your users, your goals and what the product needs to achieve.",
    },
    {
      title: "Structure",
      text: "User flows and wireframes lay out the screens and how people move between them.",
    },
    {
      title: "Design",
      text: "Visual direction is applied to the screens, with reviews and feedback from you.",
    },
    {
      title: "Prototype",
      text: "Key flows are turned into a clickable prototype that can be tested with real users.",
    },
    {
      title: "Hand off",
      text: "Final designs and assets are prepared for developers, and we can stay involved during the build.",
    },
  ],

  technologies: ["Figma", "React", "Next.js", "Tailwind CSS", "HTML", "CSS"],

  faqs: [
    {
      q: "What is the difference between UI and UX?",
      a: "UX covers how a product works and feels to use: structure, flows and tasks. UI covers how it looks: layout, colour, typography and visual details. Good products need both.",
    },
    {
      q: "Can you redesign my existing website or app?",
      a: "Yes. We can review what you have, discuss what is and is not working, and agree whether a refresh or a full redesign makes sense.",
    },
    {
      q: "Will the design improve my sales or user numbers?",
      a: "Clear, usable design supports your goals, but results also depend on your product, pricing and marketing. We do not promise specific outcomes.",
    },
    {
      q: "Do you also build what you design?",
      a: "Yes, our development team can build the designs, or we can hand them to your own developers with the assets and notes they need.",
    },
    {
      q: "How long will the project take and what will it cost?",
      a: "Both depend on the number of screens and the depth of research. We prefer to understand your requirements first and then discuss a realistic estimate.",
    },
  ],

  related: ["web-development", "mobile-app-development", "saas-development"],
};

export default uiUxDesign;
