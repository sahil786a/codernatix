/*
 * Server-side helpers that join data/services.js (listing data) with
 * data/service-details/<slug>.js (page content).
 *
 * A service with no detail file returns details: null, and its route shows the
 * "Coming soon" page instead of an empty template.
 */

import { services } from "@/data/services";
import { getServiceDetails } from "@/data/service-details";

/** All services, for the listing page and sitemap. */
export function listServices() {
  return services;
}

/** Service listing data only (no detail content). */
export function getBaseService(slug) {
  return services.find((s) => s.id === slug) ?? null;
}

/**
 * Service merged with its detail content.
 * Returns null if the slug is unknown OR the detail content isn't written yet.
 */
export function getService(slug) {
  const base = getBaseService(slug);
  const details = getServiceDetails(slug);
  if (!base || !details) return null;
  return { ...base, ...details, slug };
}

/** Up to `limit` related services, taken from the detail's `related` ids. */
export function getRelatedServices(slug, limit = 3) {
  const details = getServiceDetails(slug);
  const ids = details?.related ?? [];

  const picked = ids
    .map((id) => getBaseService(id))
    .filter(Boolean)
    .slice(0, limit);

  // Fill with other services if fewer than `limit` were listed
  if (picked.length < limit) {
    const taken = new Set([slug, ...picked.map((s) => s.id)]);
    for (const s of services) {
      if (picked.length >= limit) break;
      if (!taken.has(s.id)) picked.push(s);
    }
  }
  return picked;
}

/** Next.js metadata object for a service route. */
export function buildServiceMetadata(slug) {
  const service = getService(slug);

  // No content yet: don't let search engines index a placeholder
  if (!service) {
    return {
      title: "Coming Soon | Codernatix",
      robots: { index: false, follow: false },
    };
  }

  const { seo } = service;
  const path = `/services/${slug}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: path,
      type: "website",
    },
  };
}