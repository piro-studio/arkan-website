"use client";

import { useState, useEffect, useRef } from "react";

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

const WELCOME = "سلام! من دستیار هوشمند آرکان هستم. می‌تونم در مورد چالش‌های کسب‌وکارتون باهاتون صحبت کنم. بفرمایید — الان بزرگ‌ترین دغدغه‌تون چیه؟";

const SUGGESTIONS = [
  "فروشم متوقف شده",
  "نمی‌دانم چرا رشد نمی‌کنم",
  "می‌خواهم وارد بازار جدیدی بشوم",
  "تیمم درست کار نمی‌کند",
];

export default function ConsultantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const userMsgCount = messages.filter((m) => m.role === "user").length;
    if (userMsgCount >= 3) setShowCTA(true);
  }, [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setSuggestionsVisible(false);
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("خطا در ارتباط");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantText,
          };
          return updated;
        });
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "متأسفم، مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
        },
      ]);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col h-screen bg-[#FAFAF8]"
      style={{ fontFamily: "inherit" }}
    >
      {/* هدر */}
      <header className="flex-shrink-0 flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: "#143A32" }}
        >
          آ
        </div>
        <div>
          <p className="text-sm font-bold text-[#143A32]">دستیار آرکان</p>
          <p className="text-xs text-gray-400">مشاور استراتژی و رشد کسب‌وکار</p>
        </div>
        <div className="mr-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#1D9E75]" />
          <span className="text-xs text-gray-400">آنلاین</span>
        </div>
      </header>

      {/* ناحیه پیام‌ها */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className="max-w-[75%] sm:max-w-[60%] px-4 py-3 rounded-2xl text-sm leading-7"
                style={
                  msg.role === "user"
                    ? {
                        background: "#143A32",
                        color: "#fff",
                        borderBottomRightRadius: 4,
                      }
                    : {
                        background: "#F5F4F1",
                        color: "#1a1a1a",
                        borderBottomLeftRadius: 4,
                      }
                }
              >
                {msg.content}
              </div>
            </div>

            {/* دکمه‌های پیشنهادی زیر اولین پیام دستیار */}
            {i === 0 && suggestionsVisible && (
              <div className="flex flex-wrap gap-2 mt-3 justify-end">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#143A32]/30 text-[#143A32] hover:bg-[#143A32] hover:text-white transition-colors duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* typing indicator */}
        {isTyping && (
          <div className="flex justify-end">
            <div
              className="px-4 py-3 rounded-2xl"
              style={{ background: "#F5F4F1", borderBottomLeftRadius: 4 }}
            >
              <span className="flex gap-1 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-400"
                    style={{
                      animation: "bounce 1.2s infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* CTA ثابت */}
      {showCTA && (
        <div className="flex-shrink-0 px-4 pb-2">
          <a
            href="/#consultation"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#1D9E75" }}
          >
            درخواست مشاوره رایگان ←
          </a>
        </div>
      )}

      {/* input */}
      <div className="flex-shrink-0 px-4 pb-5 pt-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
          <input
            ref={inputRef}
            type="text"
            dir="rtl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
            style={{ background: "#143A32" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* footer */}
      <div className="flex-shrink-0 pb-3 text-center">
        <p className="text-[0.65rem] text-gray-400 px-4">
          دستیار هوشمند آرکان — پاسخ‌ها جنبه اطلاعاتی دارند و جایگزین مشاوره تخصصی نیستند
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
