"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { WELCOME_MESSAGES, SUGGESTED_QUESTIONS } from "@/lib/chat-context";
import styles from "./ChatWidget.module.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const lang = (
    ["en", "ru", "sk", "ua"].includes(locale) ? locale : "en"
  ) as keyof typeof WELCOME_MESSAGES;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Add welcome message on first open
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (!hasInteracted) {
      setHasInteracted(true);
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: WELCOME_MESSAGES[lang],
        },
      ]);
    }
  }, [hasInteracted, lang]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
      };

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const chatHistory = [...messages, userMessage]
          .filter((m) => m.id !== "welcome" || m.role === "assistant")
          .map(({ role, content }) => ({ role, content }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatHistory }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to get response");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id ? { ...m, content: fullContent } : m,
            ),
          );
        }
      } catch (error) {
        const errorText =
          error instanceof Error ? error.message : "Something went wrong";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content:
                    errorText === "Too many messages. Please try again later."
                      ? lang === "ru"
                        ? "Слишком много сообщений. Попробуйте позже."
                        : lang === "ua"
                          ? "Забагато повідомлень. Спробуйте пізніше."
                          : lang === "sk"
                            ? "Príliš veľa správ. Skúste neskôr."
                            : "Too many messages. Please try again later."
                      : lang === "ru"
                        ? "Извините, произошла ошибка. Попробуйте ещё раз."
                        : lang === "ua"
                          ? "Вибачте, сталася помилка. Спробуйте ще раз."
                          : lang === "sk"
                            ? "Prepáčte, vyskytla sa chyba. Skúste znova."
                            : "Sorry, something went wrong. Please try again.",
                }
              : m,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, lang],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleSuggestion = (question: string) => {
    sendMessage(question);
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <>
      {/* reCAPTCHA Notice */}
      {!isOpen && (
        <div className={styles.recaptchaNotice}>Protected by reCAPTCHA</div>
      )}
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className={styles.bubble}
            onClick={handleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open chat"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>AK</div>
                <div>
                  <div className={styles.headerName}>
                    Anastasiia&apos;s Assistant
                  </div>
                  <div className={styles.headerStatus}>
                    <span className={styles.onlineDot} />
                    Online
                  </div>
                </div>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${
                    msg.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage
                  }`}
                >
                  <div className={styles.messageBubble}>
                    {msg.content || (
                      <span className={styles.typing}>
                        <span />
                        <span />
                        <span />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggested Questions */}
              {showSuggestions && (
                <div className={styles.suggestions}>
                  {SUGGESTED_QUESTIONS[lang].map((q) => (
                    <button
                      key={q}
                      className={styles.suggestionBtn}
                      onClick={() => handleSuggestion(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className={styles.inputArea} onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  lang === "ru"
                    ? "Напишите сообщение..."
                    : lang === "ua"
                      ? "Напишіть повідомлення..."
                      : lang === "sk"
                        ? "Napíšte správu..."
                        : "Type a message..."
                }
                rows={1}
                disabled={isLoading}
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>

            {/* Powered by */}
            <div className={styles.poweredBy}>
              Powered by AI · Responses may vary
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
