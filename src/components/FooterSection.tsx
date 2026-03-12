import { useLang } from "@/lib/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-xl font-bold text-primary">ÂB</span>
        <p className="font-mono text-xs text-muted-foreground">
          © {year} — {t.footer.text}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
