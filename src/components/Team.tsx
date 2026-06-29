"use client";

import { useState, useEffect } from "react";

// ─── آیکون‌های مدارک ─────────────────────────────────────────────────────────
const certLogos: Record<string, string> = {
  "IIBA":    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/IIBA_logo.svg/200px-IIBA_logo.svg.png",
  "PMI":     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/PMI_logo.svg/200px-PMI_logo.svg.png",
  "Google":  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png",
  "HubSpot": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/HubSpot_Logo.svg/200px-HubSpot_Logo.svg.png",
  "SHRM":    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/SHRM_logo.svg/200px-SHRM_logo.svg.png",
};

// ─── داده تیم ────────────────────────────────────────────────────────────────
const team = [
  {
    id: "ali",
    name: "علی رضایی",
    role: "مشاور ارشد استراتژی رشد",
    experience: "۱۴ سال تجربه",
    initials: "ع.ر",
    avatarBg: "#143A32",
    color: "teal" as const,
    skills: ["استراتژی رشد", "B2B", "توسعه بازار"],
    shortBio: "تخصص در طراحی استراتژی ورود به بازار و توسعه مدل‌های رشد پایدار برای کسب‌وکارهای B2B.",
    resume: {
      summary: "علی رضایی با بیش از ۱۴ سال تجربه در حوزه استراتژی رشد، به شرکت‌های کوچک و متوسط کمک می‌کند تا مسیر رشد پایدار خود را پیدا کنند. پیش از پیوستن به آرکان، مدیر توسعه کسب‌وکار در دو شرکت صنعتی بزرگ بوده است.",
      education: [
        { degree: "MBA — استراتژی کسب‌وکار", university: "دانشگاه تهران", year: "۱۳۸۸" },
        { degree: "کارشناسی مهندسی صنایع", university: "دانشگاه شریف", year: "۱۳۸۵" },
      ],
      experience: [
        { title: "مشاور ارشد استراتژی", company: "آرکان", period: "۱۳۹۶ — اکنون", desc: "رهبری بیش از ۶۰ پروژه مشاوره استراتژی رشد در صنایع مختلف." },
        { title: "مدیر توسعه کسب‌وکار", company: "گروه صنعتی پارس", period: "۱۳۹۱ — ۱۳۹۶", desc: "طراحی و اجرای استراتژی ورود به بازارهای جدید و افزایش ۴۰٪ درآمد." },
        { title: "تحلیلگر ارشد بازار", company: "مشاوران پیشرو", period: "۱۳۸۸ — ۱۳۹۱", desc: "تحلیل بازار و تهیه گزارش‌های استراتژیک برای مشتریان صنعتی." },
      ],
      industries: ["صنعت و تولید", "فناوری اطلاعات", "خدمات مالی", "خرده‌فروشی"],
    },
    certifications: [
      {
        title: "Certified Business Analysis Professional",
        abbr: "CBAP",
        issuer: "IIBA — International Institute of Business Analysis",
        year: "۱۳۹۲",
        validity: "معتبر تا ۱۴۰۵",
        credentialId: "CBAP-2013-7841",
        logoKey: "IIBA",
        desc: "بالاترین درجه تخصصی در حوزه تحلیل کسب‌وکار؛ نشان‌دهنده تسلط بر استانداردهای جهانی تحلیل و استراتژی.",
      },
      {
        title: "Lean Six Sigma Green Belt",
        abbr: "LSSGB",
        issuer: "PMI — Project Management Institute",
        year: "۱۳۹۵",
        validity: "معتبر تا ۱۴۰۶",
        credentialId: "LSSGB-2016-4422",
        logoKey: "PMI",
        desc: "تخصص در بهینه‌سازی فرایندها و حذف اتلاف در سازمان‌های تولیدی و خدماتی.",
      },
      {
        title: "Strategy Execution Certificate",
        abbr: "SEC",
        issuer: "Harvard Business School Online",
        year: "۱۳۹۷",
        validity: "دائمی",
        credentialId: "HBS-2018-SEC-9933",
        logoKey: "PMI",
        desc: "دوره تخصصی اجرای استراتژی از دانشگاه هاروارد با تمرکز بر تبدیل برنامه‌های استراتژیک به نتایج اندازه‌گیری‌پذیر.",
      },
    ],
  },
  {
    id: "zahra",
    name: "زهرا محمدی",
    role: "متخصص بازطراحی مدل کسب‌وکار",
    experience: "۱۱ سال تجربه",
    initials: "ز.م",
    avatarBg: "#534AB7",
    color: "purple" as const,
    skills: ["مدل کسب‌وکار", "خرده‌فروشی", "فناوری"],
    shortBio: "بیش از ۸۰ پروژه بازطراحی مدل کسب‌وکار در صنایع خرده‌فروشی، فناوری و خدمات حرفه‌ای.",
    resume: {
      summary: "زهرا محمدی یکی از شناخته‌شده‌ترین متخصصان بازطراحی مدل کسب‌وکار در ایران است. رویکرد او ترکیبی از Business Model Canvas و تحلیل داده واقعی است.",
      education: [
        { degree: "دکترا — مدیریت کسب‌وکار", university: "دانشگاه علامه طباطبایی", year: "۱۳۹۱" },
        { degree: "کارشناسی ارشد MBA", university: "دانشگاه شهید بهشتی", year: "۱۳۸۷" },
      ],
      experience: [
        { title: "متخصص ارشد مدل کسب‌وکار", company: "آرکان", period: "۱۳۹۶ — اکنون", desc: "طراحی و اجرای بیش از ۸۰ پروژه بازطراحی مدل در صنایع مختلف." },
        { title: "مشاور ارشد", company: "دیلویت ایران", period: "۱۳۹۲ — ۱۳۹۶", desc: "مشاوره تحول دیجیتال و بازطراحی مدل برای شرکت‌های بزرگ." },
        { title: "تحلیلگر کسب‌وکار", company: "اکسنچر خاورمیانه", period: "۱۳۸۸ — ۱۳۹۲", desc: "بهبود فرایندهای کسب‌وکار برای مشتریان بین‌المللی." },
      ],
      industries: ["خرده‌فروشی", "فناوری", "بیمه", "لجستیک"],
    },
    certifications: [
      {
        title: "Certified Business Model Expert",
        abbr: "CBME",
        issuer: "Business Models Inc. — BMI",
        year: "۱۳۹۴",
        validity: "دائمی",
        credentialId: "BMI-2015-CBME-3317",
        logoKey: "PMI",
        desc: "تنها مدرک بین‌المللی تخصصی در حوزه طراحی و بازطراحی مدل کسب‌وکار — صادرشده توسط موسسین روش Business Model Canvas.",
      },
      {
        title: "Design Thinking Facilitator",
        abbr: "DTF",
        issuer: "IDEO — Design School",
        year: "۱۳۹۶",
        validity: "دائمی",
        credentialId: "IDEO-2017-DTF-8821",
        logoKey: "PMI",
        desc: "تخصص در تسهیل جلسات طراحی تفکر خلاق برای تیم‌های مدیریتی و توسعه محصول.",
      },
    ],
  },
  {
    id: "mohammad",
    name: "محمد کریمی",
    role: "مشاور استراتژی برند و بازاریابی",
    experience: "۹ سال تجربه",
    initials: "م.ک",
    avatarBg: "#BA7517",
    color: "amber" as const,
    skills: ["برندینگ", "بازاریابی", "رشد اندام‌وار"],
    shortBio: "طراحی استراتژی برند و کمپین‌های بازاریابی برای برندهای ایرانی با تمرکز بر رشد اندام‌وار.",
    resume: {
      summary: "محمد کریمی تخصص ویژه‌ای در ساختن برندهای B2B ایرانی دارد. رویکرد او مبتنی بر داده است — برندسازی بدون اعداد، هنر است نه استراتژی.",
      education: [
        { degree: "کارشناسی ارشد بازاریابی", university: "دانشگاه تهران", year: "۱۳۹۲" },
        { degree: "کارشناسی مدیریت بازرگانی", university: "دانشگاه اصفهان", year: "۱۳۸۹" },
      ],
      experience: [
        { title: "مشاور برند و بازاریابی", company: "آرکان", period: "۱۳۹۸ — اکنون", desc: "طراحی استراتژی برند برای بیش از ۳۵ شرکت ایرانی در حال رشد." },
        { title: "مدیر بازاریابی", company: "استارتاپ دیجیتال نوین", period: "۱۳۹۴ — ۱۳۹۸", desc: "رشد ۳ برابری کاربران با استراتژی رشد اندام‌وار و بودجه محدود." },
        { title: "کارشناس برند", company: "آژانس خلاق ایده", period: "۱۳۹۲ — ۱۳۹۴", desc: "اجرای کمپین‌های برندسازی برای برندهای مصرفی معروف." },
      ],
      industries: ["فناوری", "FMCG", "آموزش", "سلامت"],
    },
    certifications: [
      {
        title: "Google Analytics Individual Qualification",
        abbr: "GAIQ",
        issuer: "Google — Skillshop",
        year: "۱۳۹۹",
        validity: "معتبر تا ۱۴۰۵",
        credentialId: "GAIQ-2020-MK-5541",
        logoKey: "Google",
        desc: "تخصص در تحلیل رفتار کاربران، قیف تبدیل و بهینه‌سازی کمپین‌های دیجیتال بر اساس داده.",
      },
      {
        title: "Inbound Marketing Certification",
        abbr: "IMC",
        issuer: "HubSpot Academy",
        year: "۱۴۰۰",
        validity: "معتبر تا ۱۴۰۵",
        credentialId: "HS-2021-IMC-7732",
        logoKey: "HubSpot",
        desc: "تسلط بر روش‌های بازاریابی درونگرا شامل محتوا، SEO، رسانه اجتماعی و پرورش لید.",
      },
    ],
  },
  {
    id: "sara",
    name: "سارا احمدی",
    role: "متخصص طراحی ساختار سازمانی",
    experience: "۱۲ سال تجربه",
    initials: "س.ا",
    avatarBg: "#993C1D",
    color: "coral" as const,
    skills: ["ساختار سازمانی", "فرایند", "مقیاس‌پذیری"],
    shortBio: "تجربه در طراحی فرایندها و ساختارهای سازمانی برای شرکت‌هایی در مرحله مقیاس‌پذیری.",
    resume: {
      summary: "سارا احمدی به شرکت‌هایی که در حال رشد سریع هستند و دچار آشفتگی سازمانی شده‌اند کمک می‌کند تا ساختارهای مقیاس‌پذیر طراحی کنند.",
      education: [
        { degree: "کارشناسی ارشد MBA — منابع انسانی", university: "دانشگاه شریف", year: "۱۳۹۰" },
        { degree: "کارشناسی مدیریت صنعتی", university: "دانشگاه امیرکبیر", year: "۱۳۸۷" },
      ],
      experience: [
        { title: "متخصص ساختار سازمانی", company: "آرکان", period: "۱۳۹۶ — اکنون", desc: "طراحی ساختار سازمانی برای بیش از ۴۵ شرکت در مرحله مقیاس‌پذیری." },
        { title: "مدیر منابع انسانی", company: "هولدینگ توسعه پارس", period: "۱۳۹۲ — ۱۳۹۶", desc: "بازطراحی ساختار ۱۲۰۰ نفری در طول ادغام دو شرکت." },
        { title: "کارشناس OD", company: "مشاوران مدیریت آینده", period: "۱۳۹۰ — ۱۳۹۲", desc: "توسعه سازمانی و بهبود فرایندهای HR در شرکت‌های متوسط." },
      ],
      industries: ["هولدینگ", "صنعت", "خدمات حرفه‌ای", "فناوری"],
    },
    certifications: [
      {
        title: "Senior Certified Professional",
        abbr: "SHRM-SCP",
        issuer: "SHRM — Society for Human Resource Management",
        year: "۱۳۹۳",
        validity: "معتبر تا ۱۴۰۶",
        credentialId: "SHRM-2014-SCP-6612",
        logoKey: "SHRM",
        desc: "بالاترین درجه تخصصی منابع انسانی در سطح جهانی — نشان‌دهنده تسلط بر استراتژی HR و توسعه سازمانی.",
      },
      {
        title: "Agile HR Practitioner",
        abbr: "AHP",
        issuer: "Agile HR Community",
        year: "۱۳۹۸",
        validity: "دائمی",
        credentialId: "AHR-2019-AHP-3341",
        logoKey: "PMI",
        desc: "تخصص در پیاده‌سازی روش‌های چابک در حوزه منابع انسانی و طراحی سازمان‌های انعطاف‌پذیر.",
      },
    ],
  },
];

const colorMap = {
  teal:   { ring: "ring-[#1D9E75]", badge: "bg-[#E1F5EE] text-[#085041]", skill: "bg-[#E1F5EE] text-[#0F6E56]", line: "bg-[#1D9E75]", accent: "#1D9E75", light: "#E1F5EE", dark: "#085041" },
  purple: { ring: "ring-[#7F77DD]", badge: "bg-[#EEEDFE] text-[#3C3489]", skill: "bg-[#EEEDFE] text-[#534AB7]", line: "bg-[#7F77DD]", accent: "#7F77DD", light: "#EEEDFE", dark: "#3C3489" },
  amber:  { ring: "ring-[#EF9F27]", badge: "bg-[#FAEEDA] text-[#633806]", skill: "bg-[#FAEEDA] text-[#854F0B]", line: "bg-[#EF9F27]", accent: "#EF9F27", light: "#FAEEDA", dark: "#633806" },
  coral:  { ring: "ring-[#D85A30]", badge: "bg-[#FAECE7] text-[#712B13]", skill: "bg-[#FAECE7] text-[#993C1D]", line: "bg-[#D85A30]", accent: "#D85A30", light: "#FAECE7", dark: "#712B13" },
};

type Member = typeof team[0];
type TabType = "resume" | "certs";

// ─── Modal ───────────────────────────────────────────────────────────────────
function ResumeModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const [tab, setTab] = useState<TabType>("resume");
  const c = colorMap[member.color];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,20,18,0.65)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        style={{ direction: "rtl" }}
      >
        {/* ── هدر ثابت ── */}
        <div
          className="flex-shrink-0 px-7 pt-7 pb-5 rounded-t-2xl"
          style={{ background: `linear-gradient(135deg, ${c.light} 0%, #fff 100%)` }}
        >
          {/* دکمه بستن */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-700 border border-gray-100 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          {/* اطلاعات اصلی */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`ring-4 ${c.ring} ring-offset-2 rounded-full flex-shrink-0 relative`}>
              <div
                style={{
                  width: 68, height: 68,
                  borderRadius: "50%",
                  background: member.avatarBg,
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >{member.initials}</div>
              <span className="absolute bottom-1 left-1 w-3 h-3 bg-[#1D9E75] border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#143A32] mb-0.5">{member.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>{member.experience}</span>
                <a href="#" className="flex items-center gap-1.5 text-xs text-[#0077B5] font-semibold hover:opacity-70 transition-opacity">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ── تب‌ها ── */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(["resume", "certs"] as TabType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? "bg-white text-[#143A32] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t === "resume" ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> رزومه</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> مدارک و گواهینامه‌ها <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${c.badge}`}>{member.certifications.length}</span></>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── محتوای اسکرول‌شونده ── */}
        <div className="flex-1 overflow-y-auto px-7 pb-7 pt-5">

          {/* ─ تب رزومه ─ */}
          {tab === "resume" && (
            <div className="space-y-6">
              <div>
                <SectionHead accent={c.accent}>خلاصه</SectionHead>
                <p className="text-sm text-gray-600 leading-relaxed">{member.resume.summary}</p>
              </div>
              <hr className="border-gray-100" />
              <div>
                <SectionHead accent={c.accent}>تجربه کاری</SectionHead>
                <div className="space-y-4">
                  {member.resume.experience.map((exp, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center mt-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.accent }} />
                        {i < member.resume.experience.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: c.accent, opacity: 0.2 }} />}
                      </div>
                      <div className="pb-2">
                        <div className="text-sm font-bold text-[#143A32]">{exp.title} <span className="font-normal text-gray-500">— {exp.company}</span></div>
                        <div className="text-xs text-gray-400 mb-1">{exp.period}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">{exp.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-gray-100" />
              <div>
                <SectionHead accent={c.accent}>تحصیلات</SectionHead>
                <div className="space-y-2">
                  {member.resume.education.map((edu, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: c.light }}>
                      <div>
                        <p className="text-sm font-bold" style={{ color: c.dark }}>{edu.degree}</p>
                        <p className="text-xs" style={{ color: c.dark, opacity: 0.7 }}>{edu.university}</p>
                      </div>
                      <span className="text-xs font-bold flex-shrink-0 mr-3" style={{ color: c.accent }}>{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-gray-100" />
              <div>
                <SectionHead accent={c.accent}>صنایع تخصصی</SectionHead>
                <div className="flex flex-wrap gap-2">
                  {member.resume.industries.map((ind) => (
                    <span key={ind} className={`text-xs font-semibold px-3 py-1 rounded-lg ${c.skill}`}>{ind}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─ تب مدارک ─ */}
          {tab === "certs" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400 mb-2">
                تمام مدارک زیر توسط نهادهای بین‌المللی معتبر صادر شده و قابل راستی‌آزمایی هستند.
              </p>
              {member.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                >
                  {/* ردیف بالا */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      {/* بج مدرک */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                        style={{ background: c.light, color: c.accent }}
                      >
                        {cert.abbr.split("-")[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#143A32] leading-snug mb-0.5">{cert.title}</h4>
                        <p className="text-xs text-gray-400">{cert.issuer}</p>
                      </div>
                    </div>
                    {/* نشان معتبر */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#1D9E75] bg-[#E1F5EE] px-2.5 py-1 rounded-full">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        تأیید شده
                      </span>
                      <span className="text-[10px] text-gray-400">{cert.validity}</span>
                    </div>
                  </div>

                  {/* توضیح */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{cert.desc}</p>

                  {/* فوتر: سال + شناسه */}
                  <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        <span className="font-semibold text-gray-500">سال اخذ:</span> {cert.year}
                      </span>
                      <span className="w-px h-3 bg-gray-200" />
                      <span className="text-xs text-gray-400 font-mono">{cert.credentialId}</span>
                    </div>
                    <a
                      href="#"
                      className="text-xs font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity"
                      style={{ color: c.accent }}
                    >
                      تأیید آنلاین
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── دکمه CTA ── */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <a
              href="#consultation"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
              style={{ background: "#143A32" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l1.28-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              درخواست مشاوره با {member.name}
            </a>
            <p className="text-center text-xs text-gray-400 mt-2">پاسخ ظرف ۲۴ ساعت کاری — کاملاً رایگان</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-[#143A32] mb-3 flex items-center gap-2">
      <span style={{ color: accent, fontSize: 10 }}>◆</span> {children}
    </h3>
  );
}

// ─── کامپوننت اصلی ───────────────────────────────────────────────────────────
export default function Team() {
  const [selected, setSelected] = useState<Member | null>(null);

  return (
    <>
      <section id="team" className="py-24 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-[#1D9E75] mb-3 tracking-widest uppercase">تیم آرکان</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#143A32] mb-5 leading-snug">
              با کسانی آشنا شوید که کنارتان می‌مانند
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              روی هر کارت کلیک کنید تا رزومه و مدارک بین‌المللی مشاور را ببینید.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member) => {
              const c = colorMap[member.color];
              return (
                <div
                  key={member.id}
                  onClick={() => setSelected(member)}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    رزومه و مدارک
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18-6-6 6-6"/></svg>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className={`relative ring-2 ${c.ring} ring-offset-2 rounded-full flex-shrink-0`}>
                      <div
                        style={{
                          width: 68, height: 68,
                          borderRadius: "50%",
                          background: member.avatarBg,
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="group-hover:scale-105 transition-transform duration-300"
                      >{member.initials}</div>
                      <span className="absolute bottom-0.5 left-0.5 w-3 h-3 bg-[#1D9E75] border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-[15px] font-bold text-[#143A32] mb-0.5">{member.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{member.role}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${c.badge}`}>{member.experience}</span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${c.badge} opacity-70`}>
                          {member.certifications.length} مدرک بین‌المللی
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.shortBio}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <span key={skill} className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${c.skill}`}>{skill}</span>
                    ))}
                  </div>

                  <div className={`mt-5 h-0.5 w-0 group-hover:w-full ${c.line} opacity-40 rounded-full transition-all duration-500`} />
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              و <span className="text-[#143A32] font-semibold">۸ مشاور تخصصی دیگر</span> در حوزه‌های فروش، مالی و توسعه بازار
            </p>
          </div>
        </div>
      </section>

      {selected && <ResumeModal member={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
