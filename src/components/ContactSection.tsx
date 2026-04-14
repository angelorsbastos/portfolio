import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Linkedin, MapPin, Phone, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(t === "pt" ? "E-mail copiado!" : "Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const contactInfo = [
    { id: 'email', icon: <Mail size={20} />, value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
    { id: 'linkedin', icon: <Linkedin size={20} />, value: t.contact.info.linkedin, href: `https://${t.contact.info.linkedin}` },
    { id: 'location', icon: <MapPin size={20} />, value: t.contact.info.location, href: "" },
    { id: 'phone', icon: <Phone size={20} />, value: t.contact.info.phone, href: `tel:${t.contact.info.phone.replace(/\s/g, "")}` },
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
            <div key={i} className="flex items-center gap-6 group">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20">
                {item.icon}
              </span>
              <div className="flex items-center gap-4">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-mono text-lg text-muted-foreground hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <span className="font-mono text-lg text-muted-foreground">{item.value}</span>
                )}
                
                {item.id === 'email' && (
                  <button
                    onClick={() => copyToClipboard(item.value)}
                    className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;