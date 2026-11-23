import NotchedProjectCard from "@/components/ui/NotchedProjectCard";
import { getRelatedServices } from "@/lib/services";
import { WRAP } from "@/lib/ui";

/*
 * Server component: up to 3 related services as cards.
 * Background: brand-gray-50 (#f8fafc). NotchedProjectCard's `surface` must
 * equal this hex, or a visible box appears in the card's corner.
 * Only plain strings/arrays go to the client card (no functions).
 */
const SURFACE = "#f8fafc";

export default function RelatedServices({ service }) {
  const accent = service.accent || "#2563eb";
  const related = getRelatedServices(service.slug, 3);

  if (!related.length) return null;

  return (
    <section
      aria-labelledby="related-services-heading"
      className="relative bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <div className="max-w-2xl">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Explore more
          </p>
          <h2
            id="related-services-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl"
          >
            Related services
          </h2>
        </div>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <li key={s.id}>
              <NotchedProjectCard
                href={`/services/${s.id}`}
                title={s.title}
                description={s.description}
                image={s.image}
                imageAlt=""
                tags={(s.tags || []).slice(0, 3)}
                surface={SURFACE}
                accent={s.accent || accent}
                accentForeground="#ffffff"
                idleDelay={i * 0.4}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}