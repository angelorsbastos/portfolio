import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap } from "lucide-react";

const Education = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="relative py-32 px-6">
      <div className="section-number">03</div>
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">{t.education.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {t.education.items.map((item, i) => (
            <div
              key={i}
              className={`bg-card border border-border rounded-xl p-8 card-hover ${
                isVisible ? `animate-fade-up stagger-${i + 1}` : "opacity-0"
              }`}
            >
              <GraduationCap className="text-primary mb-4" size={28} />
              <p className="font-mono text-xs text-primary mb-2">{item.dates}</p>
              <h3 className="font-display text-xl font-semibold mb-1">{item.degree}</h3>
              <p className="font-mono text-sm text-muted-foreground mb-6">{item.school}</p>
              <div className="flex flex-wrap gap-2">
                {item.courses.map((c) => (
                  <span key={c} className="font-mono text-[10px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {c}
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

export default Education;
