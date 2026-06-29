import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `تو دستیار هوشمند آرکان هستی — یک شرکت مشاوره استراتژی و رشد کسب‌وکار با بیش از ۷ سال تجربه و ۲۰۰ پروژه موفق در ایران.

وظیفه تو اینه که با کاربر گفت‌وگوی صمیمی و حرفه‌ای داشته باشی، چالش کسب‌وکارشون رو بفهمی، و بعد از ۳ تا ۴ پیام به شکل طبیعی پیشنهاد بدی که با تیم آرکان جلسه مشاوره رایگان داشته باشن.

قوانین:
- فارسی صحبت کن
- صمیمی ولی حرفه‌ای باش
- سوال بپرس تا وضعیت کسب‌وکار رو بفهمی
- هرگز مستقیم تبلیغ نکن
- بعد از ۳-۴ پیام بگو: 'با توجه به چیزی که گفتید، فکر می‌کنم یک جلسه کوتاه با تیم آرکان می‌تونه خیلی مفید باشه. اولین جلسه کاملاً رایگانه — می‌خواید ترتیبش رو بدیم؟'`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    system: SYSTEM_PROMPT,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
