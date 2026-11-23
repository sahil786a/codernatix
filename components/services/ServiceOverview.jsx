import { Check } from "lucide-react";
import { WRAP } from "@/lib/ui";

/*
 * Server component: overview copy + "Best for" list.
 * Background: brand-gray-50 (hero is white, features will be white).
 */
export default function ServiceOverview({ service }) {
  const accent = service.accent || "#2563eb";
  const overview = service.overview || [];
  const bestFor = service.bestFor || [];

  if (!overview.length && !bestFor.length) return null;

  return (
    <section
      aria-labelledby="service-overview-heading"
      className="relative bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={`${WRAP} grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14`}>
        <div className="min-w-0">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Overview
          </p>
          <h2
            id="service-overview-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl"
          >
            What {service.title} means for your business
          </h2>
          <div className="mt-6 space-y-4">
            {overview.map((para, i) => (
              <p
                key={i}
                className="text-base leading-7 text-brand-gray-600 sm:text-lg sm:leading-8"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {bestFor.length > 0 && (
          <div
            className="h-fit rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
            style={{ borderColor: `${accent}33` }}
          >
            <h3 className="text-lg font-bold text-brand-black">Best for</h3>
            <ul className="mt-5 space-y-4">
              {bestFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${accent}1a`, color: accent }}
                  >
                    <Check size={14} strokeWidth={2.6} />
                  </span>
                  <span className="text-[15px] leading-6 text-brand-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}