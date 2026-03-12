import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="section-number">02</div>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">{t.experience.title}</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {t.experience.items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative mb-12 md:flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} ${
                  isVisible ? `animate-fade-up stagger-${i + 1}` : "opacity-0"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-6 z-10" />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-card border border-border rounded-xl p-6 card-hover">
                    <p className="font-mono text-xs text-primary mb-2">{item.dates}</p>
                    <h3 className="font-display text-xl font-semibold mb-1">{item.role}</h3>
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-primary hover:underline"
                      >
                        {item.company}
                      </a>
                    ) : (
                      <p className="font-mono text-sm text-muted-foreground">{item.company}</p>
                    )}
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((b, j) => (
                        <li key={j} className="font-mono text-xs text-muted-foreground flex gap-2">
                          <span className="text-primary mt-0.5">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
