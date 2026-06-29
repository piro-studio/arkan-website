"use client";

import { useState, useEffect, useRef } from "react";

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

const WELCOME = "سلام! من دستیار هوشمند آرکان هستم. وضعیت کسب‌وکارتان را برایم توضیح دهید — می‌توانم کمک کنم چالش اصلی را پیدا کنیم.";

const SUGGESTIONS = [
  "فروشم متوقف شده",
  "نمی‌دانم چرا رشد نمی‌کنم",
  "می‌خواهم وارد بازار جدیدی بشوم",
  "ساختار سازمانی‌ام مشکل دارد",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
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
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages, isTyping]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat-widget", handler);
    return () => window.removeEventListener("open-chat-widget", handler);
  }, []);

  useEffect(() => {
    const userCount = messages.filter((m) => m.role === "user").length;
    if (userCount >= 3) setShowCTA(true);
  }, [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setSuggestionsVisible(false);
    const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: text };
          return updated;
        });
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "متأسفم، مشکلی پیش آمد. لطفاً دوباره تلاش کنید." },
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
    <div dir="rtl" className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">

      {/* پنجره چت */}
      {open && (
        <div
          className="flex flex-col bg-[#FAFAF8] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ width: 360, height: 480 }}
        >
          {/* هدر */}
          <div
            className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
            style={{ background: "#143A32" }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                آ
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#1D9E75] border-2 border-[#143A32]" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-bold leading-none">دستیار هوشمند آرکان</p>
              <p className="text-white/60 text-[11px] mt-0.5">آنلاین</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="بستن"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* پیام‌ها */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-6"
                    style={
                      msg.role === "user"
                        ? { background: "#143A32", color: "#fff", borderBottomRightRadius: 4 }
                        : { background: "#fff", color: "#1a1a1a", border: "1px solid #e5e7eb", borderBottomLeftRadius: 4 }
                    }
                  >
                    {msg.content}
                  </div>
                </div>

                {i === 0 && suggestionsVisible && (
                  <div className="flex flex-wrap gap-1.5 mt-2 justify-end">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-[#143A32]/25 text-[#143A32] hover:bg-[#143A32] hover:text-white transition-colors duration-200"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-end">
                <div className="px-3 py-2 rounded-xl bg-white border border-gray-200" style={{ borderBottomLeftRadius: 4 }}>
                  <span className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        style={{ animation: "chatBounce 1.2s infinite", animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* CTA */}
          {showCTA && (
            <div className="flex-shrink-0 px-3 pb-2">
              <a
                href="/#consultation"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "#1D9E75" }}
              >
                درخواست مشاوره رایگان ←
              </a>
            </div>
          )}

          {/* input */}
          <div className="flex-shrink-0 px-3 pb-3 pt-1">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
              <input
                ref={inputRef}
                type="text"
                dir="rtl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="پیام بنویسید..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-white transition-opacity disabled:opacity-40"
                style={{ background: "#143A32" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* دکمه باز کردن */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex flex-col items-center gap-1 transition-transform duration-200 hover:scale-105"
        aria-label="باز کردن مشاور هوشمند"
      >
        <div className="relative">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "#143A32" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span
            className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: "#1D9E75" }}
          />
        </div>
        <span className="text-[10px] font-semibold text-[#143A32] bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
          مشاور هوشمند
        </span>
      </button>

      <style jsx>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
