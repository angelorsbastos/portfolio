import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="section-number">05</div>
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">{t.skills.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {t.skills.categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`${isVisible ? `animate-fade-up stagger-${i + 1}` : "opacity-0"}`}
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">{cat.name}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item, j) => (
                  <span
                    key={item}
                    style={{ 
                      animationDelay: `${(i * 0.2) + (j * 0.1)}s`,
                      animationDuration: `${5 + Math.random() * 3}s`
                    }}
                    className="font-mono text-xs px-4 py-2 rounded-full border border-border bg-card text-foreground hover:border-primary hover:text-primary hover:scale-110 hover:shadow-[0_0_20px_rgba(0,230,118,0.2)] transition-all duration-300 cursor-default animate-float"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
