import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

interface ChatWidgetProps {
  language: "en" | "pt";
}

const ChatWidget = ({ language }: ChatWidgetProps) => {
  useEffect(() => {
    createChat({
      webhookUrl: "PLACEHOLDER_WEBHOOK_URL",
      mode: "window",
      showWelcomeScreen: true,
      initialMessages:
        language === "pt"
          ? ["Olá! 👋 Sou o assistente do Ângelo. Pergunta-me o que quiseres!"]
          : ["Hi! 👋 I'm Ângelo's assistant. Ask me anything about his work or background!"],
      defaultLanguage: language === "pt" ? "pt" : "en",
      i18n: {
        en: {
          title: "Ângelo's Assistant",
          subtitle: "Ask me anything",
          inputPlaceholder: "Type a message...",
          getStarted: "Start chatting",
          closeButtonTooltip: "Close",
        },
        pt: {
          title: "Assistente do Ângelo",
          subtitle: "Pergunta-me o que quiseres",
          inputPlaceholder: "Escreve uma mensagem...",
          getStarted: "Começar conversa",
          closeButtonTooltip: "Fechar",
        },
      },
    });
  }, [language]);

  return null;
};

export default ChatWidget;
