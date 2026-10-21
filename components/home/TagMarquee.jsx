const tags = ["Web", "E-commerce", "Mobile", "AI", "Cloud"];

export default function TagMarquee() {
  return (
    <div className="tag-marquee relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="tag-marquee-track flex w-max">
        {[0, 1, 2, 3].map((group) => (
          <ul
            key={group}
            aria-hidden={group > 0 ? "true" : undefined}
            className="flex shrink-0 gap-2 pr-2"
          >
            {tags.map((tag) => (
              <li
                key={`${group}-${tag}`}
                className="whitespace-nowrap rounded-full border border-brand-gray-200 bg-white px-3 py-1 text-xs font-medium text-brand-gray-600 shadow-sm transition-colors hover:border-brand-blue/30 hover:text-brand-blue"
              >
                {tag}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}