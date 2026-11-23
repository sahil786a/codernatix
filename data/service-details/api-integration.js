/*
 * API Integration: detail content
 *
 * Draft copy. Review against what Codernatix actually delivers before publishing.
 * Rules: no invented clients, numbers, awards, guarantees, prices or timelines.
 * No speed, uptime or security guarantees.
 * `technologies` must use names from data/technologies.js so logos resolve.
 * `icon` values are string keys, resolved inside the client component.
 */

const apiIntegration = {
  seo: {
    title: "API Development & Integration Services | Codernatix",
    description:
      "Connect your software, payment providers and third-party services with well-built APIs. Talk to Codernatix about integrating the tools your business relies on.",
  },

  headline: "Connect Your Tools With",
  highlight: "Reliable APIs",
  intro:
    "Make your applications and services work together, so data moves where it is needed without manual copying.",

  overview: [
    "Most businesses use several tools: a website, payments, a CRM, email, analytics. When they do not talk to each other, people end up copying data by hand. APIs let these systems exchange information automatically.",
    "We build integrations with third-party services, and design APIs of your own when other apps or partners need to connect to you. We start from the data you need to move, then choose a clear, maintainable approach.",
  ],

  bestFor: [
    "Teams copying data between tools by hand",
    "Businesses connecting payments, shipping or CRM services",
    "Products that need an API for their own customers or partners",
    "Companies joining older systems with newer applications",
  ],

  features: [
    {
      title: "Third-party integrations",
      text: "Connect services such as payments, email, CRMs and analytics to your application.",
      icon: "plug",
    },
    {
      title: "Custom API development",
      text: "Design and build APIs so your own apps, partners or customers can work with your data.",
      icon: "webhook",
    },
    {
      title: "Data syncing",
      text: "Keep information consistent across systems, with clear rules for what moves where and when.",
      icon: "refresh-cw",
    },
    {
      title: "Webhooks and events",
      text: "React to things as they happen, such as a new order or a completed payment, instead of checking repeatedly.",
      icon: "bell",
    },
    {
      title: "Error handling",
      text: "Failed requests are handled and logged, so problems are visible and can be retried where it makes sense.",
      icon: "activity",
    },
    {
      title: "Clear documentation",
      text: "Where it fits the project, endpoints and usage are written down so others can work with them.",
      icon: "file-text",
    },
  ],

  process: [
    {
      title: "Map the data",
      text: "We identify which systems are involved and what data needs to move between them.",
    },
    {
      title: "Check the APIs",
      text: "We review the documentation and limits of the services involved and agree on an approach.",
    },
    {
      title: "Design",
      text: "The data flow, endpoints and error handling are planned before development begins.",
    },
    {
      title: "Build and test",
      text: "Integrations are developed and tested with realistic data, with regular check-ins to review progress.",
    },
    {
      title: "Launch and maintain",
      text: "After release we can keep an eye on the integrations and update them when a service changes.",
    },
  ],

  technologies: [
    "REST API",
    "GraphQL",
    "Node.js",
    "Python",
    "TypeScript",
    "PostgreSQL",
    "Postman",
    "Docker",
  ],

  faqs: [
    {
      q: "Can you connect any software to any other?",
      a: "Most modern services offer an API we can use. Some older or closed systems are harder, so we check what is possible before we commit to an approach.",
    },
    {
      q: "What if a third-party service changes its API?",
      a: "Services do change over time. We can discuss ongoing maintenance so integrations are updated when that happens.",
    },
    {
      q: "Can you build an API for my own product?",
      a: "Yes. We can design and build an API for your customers, partners or your own apps, including documentation.",
    },
    {
      q: "Is the data safe while it moves between systems?",
      a: "We follow sensible practices such as authenticated access and encrypted connections, but no system is risk-free. We can discuss what your data requires.",
    },
    {
      q: "How long will the project take and what will it cost?",
      a: "Both depend on the number of systems and the complexity of the data. We prefer to understand your requirements first and then discuss a realistic estimate.",
    },
  ],

  related: ["software-development", "ai-automation", "cloud-devops"],
};

export default apiIntegration;