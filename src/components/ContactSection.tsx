import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Linkedin, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: <Mail size={16} />, value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
    { icon: <Linkedin size={16} />, value: t.contact.info.linkedin, href: `https://${t.contact.info.linkedin}` },
    { icon: <MapPin size={16} />, value: t.contact.info.location, href: "" },
    { icon: <Phone size={16} />, value: t.contact.info.phone, href: `tel:${t.contact.info.phone.replace(/\s/g, "")}` },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="section-number">07</div>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h2>
          <p className="font-mono text-sm text-muted-foreground mb-16">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact info */}
          <div className={`space-y-6 ${isVisible ? "animate-fade-up stagger-1" : "opacity-0"}`}>
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-primary">{item.icon}</span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <span className="font-mono text-sm text-muted-foreground">{item.value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`space-y-4 ${isVisible ? "animate-fade-up stagger-2" : "opacity-0"}`}>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">{t.contact.name}</label>
              <input
                type="text"
                required
                className="w-full bg-card border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">{t.contact.email}</label>
              <input
                type="email"
                required
                className="w-full bg-card border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">{t.contact.message}</label>
              <textarea
                required
                rows={4}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              {t.contact.send}
              <Send size={14} />
            </button>
            {submitted && (
              <p className="font-mono text-sm text-primary animate-fade-up">{t.contact.success}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
