/*
 * Cloud & DevOps: detail content
 *
 * Draft copy. Review against what Codernatix actually delivers before publishing.
 * Rules: no invented clients, numbers, awards, guarantees, prices or timelines.
 * No uptime, speed, cost-saving or security guarantees.
 * `technologies` must use names from data/technologies.js so logos resolve.
 * `icon` values are string keys, resolved inside the client component.
 */

const cloudDevops = {
  seo: {
    title: "Cloud & DevOps Services | Codernatix",
    description:
      "Cloud setup, automated deployment and monitoring for your applications. Talk to Codernatix about making releases smoother and your infrastructure easier to manage.",
  },

  headline: "Cloud and DevOps That Make",
  highlight: "Releases Smoother",
  intro:
    "Set up and manage the cloud infrastructure your applications run on, and automate how code gets tested and released.",

  overview: [
    "Where your application runs and how updates reach it affect how reliably your team can ship. Cloud setup and DevOps practices bring structure to this: consistent environments, automated releases and visibility into how things are running.",
    "We review how you host and deploy today, then plan practical improvements. That may mean moving to the cloud, automating a manual release process, or adding monitoring, step by step and without unnecessary complexity.",
  ],

  bestFor: [
    "Teams releasing software manually and wanting less friction",
    "Businesses moving an application to the cloud",
    "Products whose infrastructure is hard to manage or reproduce",
    "Companies that want better visibility into their systems",
  ],

  features: [
    {
      title: "Cloud setup",
      text: "Hosting and services set up on a cloud provider that suits your application and budget.",
      icon: "cloud",
    },
    {
      title: "Automated pipelines",
      text: "Code is built and tested automatically, and releases follow a repeatable process.",
      icon: "git-branch",
    },
    {
      title: "Containers",
      text: "Applications packaged so they run the same way on a laptop, in testing and in production.",
      icon: "container",
    },
    {
      title: "Monitoring and alerts",
      text: "Visibility into how your systems are running, with alerts so problems can be noticed early.",
      icon: "activity",
    },
    {
      title: "Security basics",
      text: "Sensible access controls, secrets handling and backups, set up as part of the infrastructure.",
      icon: "lock",
    },
    {
      title: "Documented setup",
      text: "Infrastructure is written down and, where it fits, defined as code so your team can understand and repeat it.",
      icon: "file-text",
    },
  ],

  process: [
    {
      title: "Review",
      text: "We look at how your application is hosted, built and released today, and where the friction is.",
    },
    {
      title: "Plan",
      text: "Improvements are prioritised and a practical approach is agreed, including the cloud services involved.",
    },
    {
      title: "Set up",
      text: "Environments, pipelines and containers are configured, starting with the highest-value changes.",
    },
    {
      title: "Migrate and test",
      text: "Applications are moved or connected step by step and tested before anything goes live.",
    },
    {
      title: "Monitor and refine",
      text: "We add monitoring and adjust the setup as we learn how your systems behave in use.",
    },
  ],

  technologies: [
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Nginx",
    "CI/CD",
    "GitHub",
  ],

  faqs: [
    {
      q: "Which cloud provider should I use?",
      a: "It depends on your application, your team and your budget. We can compare the options and recommend what fits, rather than pushing one provider.",
    },
    {
      q: "Can you move our existing application to the cloud?",
      a: "In many cases, yes. We review the application first, then plan a migration in stages so risk stays low.",
    },
    {
      q: "Will this reduce our hosting costs?",
      a: "Not necessarily. Costs depend on how your application is built and used. We aim for a setup that is sensible for your needs and we do not promise specific savings.",
    },
    {
      q: "Is my infrastructure secure after this?",
      a: "We follow sensible security practices, but no system is risk-free and security is an ongoing effort. We can discuss what level of protection your project needs.",
    },
    {
      q: "How long will the project take and what will it cost?",
      a: "Both depend on the size and complexity of your setup. We prefer to understand your current situation first and then discuss a realistic estimate.",
    },
  ],

  related: ["software-development", "api-integration", "cybersecurity"],
};

export default cloudDevops;