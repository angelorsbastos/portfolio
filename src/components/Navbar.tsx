import { useState, useEffect } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Menu, X } from "lucide-react";

const sections = ["about", "experience", "education", "projects", "skills", "lifestyle", "contact"];

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const activeId = useScrollSpy(sections);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "education", label: t.nav.education },
    { id: "projects", label: t.nav.projects },
    { id: "skills", label: t.nav.skills },
    { id: "lifestyle", label: t.nav.lifestyle },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <nav className="fixed top-4 inset-x-4 md:inset-x-8 max-w-6xl mx-auto z-50">
      {/* Main Navbar Pill */}
      <div
        className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled
            ? "bg-background/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            : "bg-transparent border border-transparent"
          }`}
      >
        {/* Logo */}
        <a href="#" className="font-display text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          ÂB
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-2 text-sm font-mono rounded-full transition-all duration-300 ${activeId === item.id
                  ? "bg-primary/10 text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
            className="hidden md:flex text-xs font-mono font-medium rounded-full px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all items-center gap-2 text-foreground"
          >
            <span className="opacity-50">{lang === "en" ? "GB" : "PT"}</span>
            <span>{lang === "en" ? "EN" : "PT"}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 origin-top md:hidden ${mobileOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
          }`}
      >
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-sm font-mono transition-all ${activeId === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              {item.label}
            </a>
          ))}

          <div className="w-full h-px bg-white/10 my-2" />

          {/* Mobile Language Toggle */}
          <button
            onClick={() => {
              setLang(lang === "en" ? "pt" : "en");
              setMobileOpen(false);
            }}
            className="flex w-full items-center justify-between px-4 py-3 rounded-2xl text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            <span>Language</span>
            <div className="flex items-center gap-2">
              <span className="opacity-50">{lang === "en" ? "GB" : "PT"}</span>
              <span className="text-foreground">{lang === "en" ? "EN" : "PT"}</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;