/*
 * Service detail registry.
 *
 * To publish a new service:
 *   1. Create data/service-details/<slug>.js (copy web-development.js as a template)
 *   2. Import it below and add it to `serviceDetails`
 *
 * A service with no entry here shows the "Coming soon" page.
 */

import webDevelopment from "./web-development";
import softwareDevelopment from "./software-development";
import ecommerceDevelopment from "./ecommerce-development";
import mobileAppDevelopment from "./mobile-app-development";
import saasDevelopment from "./saas-development";
import aiAutomation from "./ai-automation";
import cloudDevops from "./cloud-devops";
import apiIntegration from "./api-integration";
import uiUxDesign from "./ui-ux-design";
import cybersecurity from "./cybersecurity";
import digitalMarketing from "./digital-marketing";
import itConsulting from "./it-consulting";

export const serviceDetails = {
  "web-development": webDevelopment,
  "software-development": softwareDevelopment,
  "ecommerce-development": ecommerceDevelopment,
  "mobile-app-development": mobileAppDevelopment,
  "saas-development": saasDevelopment,
  "ai-automation": aiAutomation,
  "cloud-devops": cloudDevops,
  "api-integration": apiIntegration,
  "ui-ux-design": uiUxDesign,
  "cybersecurity": cybersecurity,
    "digital-marketing": digitalMarketing,
  "it-consulting": itConsulting,
};

export function getServiceDetails(slug) {
  return serviceDetails[slug] ?? null;
}

export function hasServiceDetails(slug) {
  return slug in serviceDetails;
}

export function publishedServiceSlugs() {
  return Object.keys(serviceDetails);
}