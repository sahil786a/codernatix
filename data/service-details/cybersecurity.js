/*
 * Cybersecurity: detail content
 *
 * Draft copy. Review against what Codernatix actually delivers before publishing.
 * Rules: no invented clients, numbers, awards, guarantees, prices or timelines.
 * No compliance or certification claims. No "secure" or breach-prevention promises.
 * `technologies` must use names from data/technologies.js so logos resolve.
 * `icon` values are string keys, resolved inside the client component.
 */

const cybersecurity = {
  seo: {
    title: "Cybersecurity Services | Codernatix",
    description:
      "Security reviews and practical safeguards for your websites, applications and infrastructure. Talk to Codernatix about reducing risk in the systems your business relies on.",
  },

  headline: "Practical Security for",
  highlight: "Your Digital Systems",
  intro:
    "Find weak points in your websites, applications and infrastructure, and put sensible safeguards in place to reduce risk.",

  overview: [
    "Security is not a one-off task. Applications change, new tools are added and threats evolve. A good starting point is knowing where your risks are, so effort goes where it matters most.",
    "We review how your systems are built and configured, point out the weaknesses we find, and help you fix the important ones in a sensible order. No system can be made risk-free, so we focus on reducing risk and making problems easier to spot.",
  ],

  bestFor: [
    "Businesses launching a website or application that handles user data",
    "Teams that have never reviewed the security of their systems",
    "Companies that want a second pair of eyes on their setup",
    "Products moving to the cloud or adding new integrations",
  ],

  features: [
    {
      title: "Security review",
      text: "We examine your application and infrastructure for common weaknesses and misconfigurations.",
      icon: "search",
    },
    {
      title: "Secure development practices",
      text: "Safer ways of building, such as input validation and careful handling of secrets, built into the code.",
      icon: "code",
    },
    {
      title: "Access control",
      text: "Sensible authentication and permissions, so people can reach only what they need.",
      icon: "lock",
    },
    {
      title: "Data protection basics",
      text: "Encryption in transit, careful storage of sensitive data and backups, set up where your project needs them.",
      icon: "database",
    },
    {
      title: "Monitoring and alerts",
      text: "Visibility into unusual activity, so problems can be noticed and looked at sooner.",
      icon: "activity",
    },
    {
      title: "Clear findings and next steps",
      text: "Issues are written up in plain language and prioritised, so you know what to fix first.",
      icon: "file-text",
    },
  ],

  process: [
    {
      title: "Scope",
      text: "We agree which systems are in scope and what you want to protect.",
    },
    {
      title: "Review",
      text: "We assess the systems for weaknesses, looking at code, configuration and access.",
    },
    {
      title: "Report",
      text: "Findings are written up and prioritised by how much they matter to your business.",
    },
    {
      title: "Fix",
      text: "We help address the important issues, starting with the ones that carry the most risk.",
    },
    {
      title: "Re-check and monitor",
      text: "We check that fixes work and can set up monitoring so new issues are noticed.",
    },
  ],

  technologies: [
    "Node.js",
    "Python",
    "AWS",
    "Azure",
    "Docker",
    "Nginx",
    "Git",
    "GitHub",
  ],

  faqs: [
    {
      q: "Will this make my system completely secure?",
      a: "No. No system can be made completely secure, and security is an ongoing effort. Our aim is to find and reduce real risks and make problems easier to detect.",
    },
    {
      q: "Do you provide compliance or certification?",
      a: "We do not issue certifications or guarantee compliance with any standard. If you have specific requirements, we can discuss how our work could support your own compliance efforts.",
    },
    {
      q: "Can you review an application that is already live?",
      a: "Yes. We agree the scope and the way the review is carried out beforehand, so it does not disrupt your users.",
    },
    {
      q: "What happens to the information you find?",
      a: "Findings are shared with you and kept confidential. We agree how they are handled before the review starts.",
    },
    {
      q: "How long will the work take and what will it cost?",
      a: "Both depend on the size and complexity of the systems in scope. We prefer to understand your setup first and then discuss a realistic estimate.",
    },
  ],

  related: ["cloud-devops", "software-development", "api-integration"],
};

export default cybersecurity;
