/*
 * SaaS Development: detail content
 *
 * Draft copy. Review against what Codernatix actually delivers before publishing.
 * Rules: no invented clients, numbers, awards, guarantees, prices or timelines.
 * `technologies` must use names from data/technologies.js so logos resolve.
 * `icon` values are string keys, resolved inside the client component.
 */

const saasDevelopment = {
  seo: {
    title: "SaaS Development Services | Codernatix",
    description:
      "Subscription-based web software planned for real users and built to grow. Talk to Codernatix about turning your SaaS idea into a working product.",
  },

  headline: "SaaS Products Built to",
  highlight: "Grow With Your Users",
  intro:
    "Cloud-based software with accounts, subscriptions and dashboards, planned carefully so the first version is solid and the next ones are easy to add.",

  overview: [
    "A SaaS product is more than a set of screens. It needs accounts and permissions, a reliable way to handle subscriptions, and a structure that stays manageable as more customers and features are added.",
    "We help you shape the first version around the problem you solve, then build it so it can be extended. That includes the customer-facing app, the admin tools your team needs, and the integrations that connect it to the rest of your business.",
  ],

  bestFor: [
    "Founders turning a software idea into a product",
    "Businesses moving an internal tool to a subscription service",
    "Teams replacing a manual process with a web platform",
    "Companies adding a software product alongside their services",
  ],

  features: [
    {
      title: "Accounts and roles",
      text: "Sign-up, login and role-based access so each user sees what they should.",
      icon: "users",
    },
    {
      title: "Subscription billing",
      text: "Connect a payment provider to handle plans, upgrades and recurring payments where your model needs it.",
      icon: "credit-card",
    },
    {
      title: "Dashboards and reporting",
      text: "Clear views of the information your users and your team need to make decisions.",
      icon: "bar-chart",
    },
    {
      title: "Admin tools",
      text: "Internal screens for your team to manage users, plans and content without touching code.",
      icon: "settings",
    },
    {
      title: "Built to scale",
      text: "An architecture planned so more users and features can be added without starting over.",
      icon: "layers",
    },
    {
      title: "Integrations and APIs",
      text: "Connect email, analytics, CRMs and other services, or expose an API for your own customers.",
      icon: "plug",
    },
  ],

  process: [
    {
      title: "Discover",
      text: "We learn about your idea, your target users and the problem the product should solve.",
    },
    {
      title: "Define the first version",
      text: "Features are prioritised into a focused first release, with the rest planned for later.",
    },
    {
      title: "Design",
      text: "Key flows, dashboards and the data structure are planned and reviewed with you.",
    },
    {
      title: "Build and test",
      text: "The product is developed in stages and tested, with regular check-ins to review progress.",
    },
    {
      title: "Launch and iterate",
      text: "The product goes live, and improvements are planned from real user feedback.",
    },
  ],

  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
  ],

  faqs: [
    {
      q: "I only have an idea. Can you help me start?",
      a: "Yes. A clear description of the problem and your users is enough to begin. We help turn it into a focused first version.",
    },
    {
      q: "What is an MVP and do I need one?",
      a: "An MVP is a smaller first version with the essential features. It lets you reach real users sooner and learn before investing in everything. We can discuss whether it suits your case.",
    },
    {
      q: "Can you handle subscriptions and payments?",
      a: "We can integrate a payment provider to manage plans and recurring billing. The exact setup depends on your pricing model and the regions you serve.",
    },
    {
      q: "How long will the project take and what will it cost?",
      a: "Both depend on the features and complexity. We prefer to understand your requirements first and then discuss a realistic estimate.",
    },
    {
      q: "Can you continue working on the product after launch?",
      a: "Ongoing development and support can be discussed based on your needs, and we can agree on the level that suits your product.",
    },
  ],

  related: ["software-development", "cloud-devops", "api-integration"],
};

export default saasDevelopment;