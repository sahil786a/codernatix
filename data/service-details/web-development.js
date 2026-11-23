/*
 * Web Development: detail content
 *
 * Draft copy. Review against what Codernatix actually delivers before publishing.
 * Rules: no invented clients, numbers, awards, guarantees, prices or timelines.
 * `technologies` must use names from data/technologies.js so logos resolve.
 * `icon` values are string keys, resolved inside the client component.
 */

const webDevelopment = {
  seo: {
    title: "Web Development Services | Codernatix",
    description:
      "Responsive, accessible and performance-minded websites and web applications built around your business goals. Talk to Codernatix about your project.",
  },

  headline: "Websites Built Around",
  highlight: "Your Business Goals",
  intro:
    "Responsive, fast and accessible websites designed to support your business goals, from the first idea through launch and beyond.",

  overview: [
    "A website is often the first place people meet your business. We design and build websites that explain what you do clearly, work well on every screen and stay easy to maintain as your needs change.",
    "Whether you need a new site, a redesign of an existing one, or a web application with more advanced functionality, we start from your goals and choose a practical approach to match.",
  ],

  bestFor: [
    "Businesses launching their first website",
    "Teams replacing an outdated or hard-to-update site",
    "Companies that need a web application beyond a brochure site",
    "Organisations that want a clearer, more modern online presence",
  ],

  features: [
    {
      title: "Responsive layouts",
      text: "Pages are designed to adapt across phones, tablets and desktops, so visitors get a comfortable experience on any device.",
      icon: "layout",
    },
    {
      title: "Performance-minded builds",
      text: "Lean pages, optimised assets and sensible loading so the site feels quick to use.",
      icon: "gauge",
    },
    {
      title: "Search-friendly structure",
      text: "Semantic markup, clear headings and metadata that help search engines understand your content.",
      icon: "search",
    },
    {
      title: "Accessible by design",
      text: "Keyboard-friendly navigation, readable contrast and clear structure so more people can use your site.",
      icon: "accessibility",
    },
    {
      title: "Content your team can manage",
      text: "Where it fits the project, content is organised so your team can update it without needing a developer.",
      icon: "file-text",
    },
    {
      title: "Forms and integrations",
      text: "Contact forms, analytics, payments and other third-party services connected where your project needs them.",
      icon: "plug",
    },
  ],

  process: [
    {
      title: "Discover",
      text: "We learn about your business, audience and goals, and agree on what the website needs to do.",
    },
    {
      title: "Plan",
      text: "Sitemap, page structure and content needs are outlined, along with the technology that suits the project.",
    },
    {
      title: "Design",
      text: "Layouts and visual direction are shaped around your brand and your visitors' journey.",
    },
    {
      title: "Build",
      text: "Pages are developed and connected, with regular check-ins so you can review progress.",
    },
    {
      title: "Launch and improve",
      text: "After testing across devices and browsers the site goes live, and improvements can continue based on feedback.",
    },
  ],

  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Node.js",
  ],

  faqs: [
    {
      q: "Can you redesign my existing website?",
      a: "Yes. We can review your current site, discuss what is and isn't working, and agree on whether a refresh or a full rebuild makes more sense.",
    },
    {
      q: "Will my website work well on mobile devices?",
      a: "Responsive design is a standard part of how we build. Layouts are planned for different screen sizes and checked across common devices and browsers.",
    },
    {
      q: "Will the website help with search engine visibility?",
      a: "We build with a search-friendly foundation: clean structure, metadata and sensible performance. Rankings depend on many factors beyond the website itself, so we don't promise specific results.",
    },
    {
      q: "How long will the project take and what will it cost?",
      a: "Both depend on the scope, number of pages, features and complexity. We prefer to understand your requirements first and then discuss a realistic estimate.",
    },
    {
      q: "Do you provide support after launch?",
      a: "Ongoing improvements and maintenance can be discussed based on your needs. We can agree on the level of support that suits your project.",
    },
  ],

  related: ["ui-ux-design", "ecommerce-development", "software-development"],
};

export default webDevelopment;