import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Flag, Globe, GraduationCap } from "lucide-react";

const About = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();

  const facts = [
    { icon: <MapPin size={18} />, label: "Location", value: t.about.location },
    { icon: <Flag size={18} />, label: "Nationality", value: t.about.nationality },
    { icon: <Globe size={18} />, label: "Languages", value: t.about.languages },
    { icon: <GraduationCap size={18} />, label: "Currently", value: t.about.currently },
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="section-number">01</div>
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">{t.about.title}</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className={`md:col-span-3 ${isVisible ? "animate-fade-up stagger-1" : "opacity-0"}`}>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              {t.about.text}
            </p>
          </div>

          <div className={`md:col-span-2 ${isVisible ? "animate-fade-up stagger-2" : "opacity-0"}`}>
            <div className="bg-card border border-border rounded-xl p-6 accent-glow">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Quick Facts</h3>
              <div className="space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-center gap-3">
                    <span className="text-primary">{fact.icon}</span>
                    <span className="font-mono text-sm text-foreground">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
