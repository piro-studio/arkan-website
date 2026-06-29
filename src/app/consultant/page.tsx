"use client";

export default function ConsultantPage() {
  function openWidget() {
    // ارسال رویداد سفارشی برای باز کردن ChatWidget
    window.dispatchEvent(new CustomEvent("open-chat-widget"));
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6"
    >
      <div className="max-w-md text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 shadow-lg"
          style={{ background: "#143A32" }}
        >
          آ
        </div>
        <h1 className="text-xl font-bold text-[#143A32] mb-3">
          مشاور هوشمند آرکان
        </h1>
        <p className="text-gray-500 text-sm leading-7 mb-8">
          برای گفت‌وگو با مشاور هوشمند آرکان، از دکمه پایین چپ صفحه استفاده کنید.
        </p>
        <button
          onClick={openWidget}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
          style={{ background: "#143A32" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          شروع گفت‌وگو
        </button>
        <p className="text-[11px] text-gray-400 mt-6">
          پاسخ‌ها جنبه اطلاعاتی دارند و جایگزین مشاوره تخصصی نیستند
        </p>
      </div>
    </div>
  );
}
