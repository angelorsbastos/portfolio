import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowDown, Download, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Hero = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // NEW: State to hold our custom error messages
  const [errors, setErrors] = useState({ name: "", email: "" });

  // --- Typewriter Effect ---
  useEffect(() => {
    const role = t.hero.roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < role.length) {
        timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % t.hero.roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, t.hero.roles]);

  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setRoleIndex(0);
  }, [t]);

  // NEW: Custom Validation Function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
      isValid = false;
    }

    // Regex to check if email looks like "something@something.com"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // --- Handle Form Submission ---
  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for errors before doing anything!
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);

    try {
      // REPLACE THIS URL WITH YOUR ACTUAL N8N WEBHOOK URL LATER
      const webhookUrl = "https://n8n-angelo.duckdns.org/webhook-test/cv-download";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, language: t === "pt" ? "pt" : "en" }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Success! Check your email for my CV.");
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSuccess(false);
          setName("");
          setEmail("");
          setErrors({ name: "", email: "" }); // Clear errors on success
        }, 3000);
      } else {
        throw new Error("Webhook failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background (Kept identical) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[200%] h-[150%] md:w-[150%] md:h-[150%] rounded-[100%] border-t-[3px] border-primary opacity-80 left-[-50%] md:left-[-25%] top-[25%] md:top-[15%] rotate-[-15deg]"
          style={{ boxShadow: "0 -20px 100px 20px hsl(var(--primary) / 0.4), inset 0 20px 100px 20px hsl(var(--primary) / 0.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
      </div>

      {/* Main Content (Kept identical) */}
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">Portfolio</p>
        </div>

        <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 ${isVisible ? "animate-fade-up stagger-1" : "opacity-0"}`}>
          {t.hero.name}
        </h1>

        <div className={`h-10 mb-8 ${isVisible ? "animate-fade-up stagger-2" : "opacity-0"}`}>
          <span className="font-mono text-xl md:text-2xl text-primary">
            {displayText}
            <span className="animate-cursor text-primary">|</span>
          </span>
        </div>

        <p className={`font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed ${isVisible ? "animate-fade-up stagger-3" : "opacity-0"}`}>
          {t.hero.bio}
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? "animate-fade-up stagger-4" : "opacity-0"}`}>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.hero.cta1}
            <ArrowDown size={16} />
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border text-foreground font-mono text-sm rounded-lg hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            {t.hero.cta2}
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* --- POP-UP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setErrors({ name: "", email: "" }); // Clear errors when closed
              }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-2xl font-bold mb-2">Request my CV</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Drop your details below and I'll email my resume directly to your inbox.
            </p>

            {isSuccess ? (
              <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg p-4 text-center font-mono text-sm">
                CV sent successfully! ✨
              </div>
            ) : (
              // ADDED noValidate HERE to stop browser alerts
              <form onSubmit={handleDownloadSubmit} className="flex flex-col gap-4" noValidate>

                {/* Name Input */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" }); // Clear error when typing
                    }}
                    // Dynamic classes: Red border if there's an error
                    className={`w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none transition-colors ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                    placeholder="John Doe"
                  />
                  {/* Custom Error Message */}
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                {/* Email Input */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" }); // Clear error when typing
                    }}
                    // Dynamic classes: Red border if there's an error
                    className={`w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none transition-colors ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                    placeholder="john@example.com"
                  />
                  {/* Custom Error Message */}
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Send it to me!"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;