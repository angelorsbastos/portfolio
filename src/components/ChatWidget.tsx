import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface ChatWidgetProps {
  language: "en" | "pt";
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

const WEBHOOK_URL = "https://n8n-angelo.duckdns.org/webhook/chat";

const i18n = {
  en: {
    title: "Ângelo's Assistant",
    subtitle: "Ask me anything",
    placeholder: "Type a message…",
    welcome:
      "Hi! 👋 I'm Ângelo's assistant. Ask me anything about his work or background!",
  },
  pt: {
    title: "Assistente do Ângelo",
    subtitle: "Pergunta-me o que quiseres",
    placeholder: "Escreve uma mensagem…",
    welcome:
      "Olá! 👋 Sou o assistente do Ângelo. Pergunta-me o que quiseres!",
  },
};

const ChatWidget = ({ language }: ChatWidgetProps) => {
  const t = i18n[language];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: t.welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => [{ role: "assistant", text: i18n[language].welcome }, ...prev.slice(1)]);
  }, [language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sendMessage", chatInput: text, sessionId }),
      });
      const data = await res.json();
      const reply = typeof data === "string" ? data : data.output ?? data.text ?? "…";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: language === "pt" ? "Erro ao responder. Tenta novamente." : "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, sessionId, language]);

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${open
          ? "bg-muted text-foreground rotate-90 scale-95"
          : "bg-primary text-primary-foreground hover:scale-110 accent-glow"
          }`}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[340px] max-h-[480px] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
          }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-secondary border-b border-border">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/20">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground font-display">{t.title}</p>
            <p className="text-xs text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[320px] scrollbar-thin">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center mt-1">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
                  }`}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center mt-1">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-start">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center mt-1">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex items-center gap-2 px-4 py-3 border-t border-border bg-card"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-secondary text-foreground text-sm px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
