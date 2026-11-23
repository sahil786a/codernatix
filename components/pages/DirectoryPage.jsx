import Link from "next/link";
import { ArrowRight, Check, Code2, Layers3, Sparkles } from "lucide-react";

const icons = [Code2, Layers3, Sparkles];

export default function DirectoryPage({
  eyebrow,
  title,
  description,
  items,
  ctaTitle = "Have a project in mind?",
  ctaText = "Let’s talk through the right next step for your business.",
  ctaHref = "/contact",
}) {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.28),transparent_38%)]" />
        <div className="site-container relative py-24 sm:py-32">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-blue-300">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
        </div>
      </section>

      <section className="site-container py-20 sm:py-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon || icons[index % icons.length];
            return (
              <article
                key={item.id || item.title}
                className="group flex min-h-64 flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_50px_-28px_rgba(37,99,235,0.45)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  {item.kicker && <span className="text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">{item.kicker}</span>}
                </div>
                <h2 className="mt-7 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.description}</p>
                {item.href && (
                  <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3">
                    Explore <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="site-container pb-20 sm:pb-28">
        <div className="flex flex-col gap-6 rounded-3xl bg-blue-600 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{ctaTitle}</h2>
            <p className="mt-2 max-w-xl text-blue-100">{ctaText}</p>
          </div>
          <Link href={ctaHref} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
            Start a conversation <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
          <Check size={16} className="shrink-0 text-blue-600" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
