import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Linkedin, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();

  const contactInfo = [
    { icon: <Mail size={20} />, value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
    { icon: <Linkedin size={20} />, value: t.contact.info.linkedin, href: `https://${t.contact.info.linkedin}` },
    { icon: <MapPin size={20} />, value: t.contact.info.location, href: "" },
    { icon: <Phone size={20} />, value: t.contact.info.phone, href: `tel:${t.contact.info.phone.replace(/\s/g, "")}` },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="section-number">07</div>
      <div ref={ref} className="max-w-3xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h2>
          <p className="font-mono text-sm text-muted-foreground mb-16">{t.contact.subtitle}</p>
        </div>

        {/* Contact info list */}
        <div className={`flex flex-col gap-8 ${isVisible ? "animate-fade-up stagger-1" : "opacity-0"}`}>
          {contactInfo.map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20">
                {item.icon}
              </span>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-mono text-lg text-muted-foreground hover:text-primary transition-colors">
                  {item.value}
                </a>
              ) : (
                <span className="font-mono text-lg text-muted-foreground">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;