import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Football = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="lifestyle" className="relative py-32 px-6 bg-secondary/30">
      <div className="section-number">06</div>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">{t.football.title}</h2>
        </div>

        <p className={`font-mono text-sm text-muted-foreground leading-relaxed mb-10 max-w-3xl ${isVisible ? "animate-fade-up stagger-1" : "opacity-0"}`}>
          {t.football.intro}
        </p>

        <div className={`grid sm:grid-cols-3 gap-4 mb-10 ${isVisible ? "animate-fade-up stagger-2" : "opacity-0"}`}>
          {t.football.highlights.map((h, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 text-center card-hover">
              <p className="font-mono text-sm">{h}</p>
            </div>
          ))}
        </div>

        <p className={`font-mono text-sm text-muted-foreground leading-relaxed max-w-3xl ${isVisible ? "animate-fade-up stagger-3" : "opacity-0"}`}>
          {t.football.extra}
        </p>
      </div>
    </section>
  );
};

export default Football;
