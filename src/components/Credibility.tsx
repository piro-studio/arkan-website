import Image from "next/image";
import Section, { SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import { IconQuote } from "./ui/icons";

const STATS = [
  { value: "۷+", label: "سال فعالیت", sub: "از ۱۳۹۶ تاکنون" },
  { value: "۲۰۰+", label: "پروژه‌ی موفق", sub: "در ۱۴ صنعت مختلف" },
  { value: "۱۲", label: "مشاور باتجربه", sub: "میانگین ۱۰ سال تجربه میدانی" },
];

const QUOTES = [
  {
    text: "صادقانه بگویم، اول فکر می‌کردم یک مشاور دیگر می‌آید، گزارشی می‌دهد و می‌رود. اما آرکان شش ماه کنار تیم ما نشست — جلسه به جلسه، تصمیم به تصمیم.",
    name: "امیر محمدی",
    role: "مدیرعامل — گروه صنعتی مهرآوران",
    stars: "★★★★★",
    initial: "ا",
    avatarBg: "#E1F5EE",
    avatarColor: "#085041",
  },
  {
    text: "سه سال داشتیم کار می‌کردیم ولی جلو نمی‌رفتیم. مشکل منابع نبود — مشکل این بود که نمی‌دانستیم کجا را نگاه کنیم. آرکان این را برایمان روشن کرد.",
    name: "سینا رضوی",
    role: "بنیان‌گذار — استارتاپ خدمات دیجیتال نوین",
    stars: "★★★★★",
    initial: "س",
    avatarBg: "#EEEDFE",
    avatarColor: "#3C3489",
  },
];

export default function Credibility() {
  return (
    <Section id="about" surface="bone">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* تصویر تیم */}
        <Reveal className="order-1">
          <div className="overflow-hidden rounded-card shadow-soft-md">
            <Image
              src="/images/team.jpg"
              alt="تیم مشاوران آرکان در حال بررسی استراتژی یک کسب‌وکار دور میز جلسه"
              width={1200}
              height={896}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* متن + آمار */}
        <div className="order-2">
          <SectionHeading
            eyebrow="درباره‌ی آرکان"
            title="آرکان از یک دغدغه مشترک متولد شد"
            description="سال ۱۳۹۶ — جمعی از مشاوران باتجربه که هر یک سال‌ها در موسسات مختلف و به صورت مستقل در حوزه مشاوره کسب‌وکار فعالیت کرده بودند، تصمیم مشترکی گرفتند."
          />

          <div className="mt-5 space-y-4 text-body text-slate leading-8">
            <p>آنچه همه‌شان در مسیر حرفه‌ای خود بارها دیده بودند، یک واقعیت تکرارشونده بود: کسب‌وکارهای ایرانی با وجود ظرفیت‌های بالقوه قابل توجه، اغلب بدون مسیر مشخص باقی می‌ماندند. مشاوره‌هایی که دریافت می‌کردند یا صرفاً نظری بود و فاقد پشتوانه اجرایی، یا با ارائه گزارش پایان می‌یافت.</p>
            <p>آرکان با این هدف شکل گرفت: همراهی واقعی با کسب‌وکار — نه تا تحویل گزارش، بلکه تا تحقق نتیجه.</p>
            <p className="font-medium text-pine">از همان ابتدا یک اصل راهنما داشتیم: آنچه را که درست است بگوییم، حتی اگر شنیدنش دشوار باشد.</p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="rounded-card border border-sand bg-white px-3 py-5 text-center shadow-soft">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="nums block font-heading text-[1.75rem] font-bold leading-none text-pine">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-caption text-slate">
                      {stat.label}
                    </span>
                    <span className="mt-1 block text-[0.7rem] text-slate/60 leading-tight">
                      {stat.sub}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      {/* نقل‌قول‌ها */}
      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {QUOTES.map((quote, i) => (
          <Reveal key={quote.name} delay={i * 90}>
            <figure className="flex h-full flex-col rounded-card border border-sand bg-white p-7 shadow-soft">
              <IconQuote width={32} height={32} className="text-brass/70" />
              <blockquote className="mt-4 flex-1 text-body leading-8 text-ink">
                «{quote.text}»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: quote.avatarBg, color: quote.avatarColor,
                    fontSize: 15, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {quote.initial}
                </div>
                <div>
                  <div className="text-caption font-bold text-ink">{quote.name}</div>
                  <div className="text-[0.7rem] text-slate/70">{quote.role}</div>
                  <div className="text-[0.7rem] text-brass mt-0.5 tracking-wide">{quote.stars}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
