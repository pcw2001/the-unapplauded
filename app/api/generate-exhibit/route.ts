import { NextRequest, NextResponse } from "next/server";

const ALLOWED_GALLERIES = [
  "厨房厅",
  "日常秩序厅",
  "休息厅",
  "社交勇气厅",
  "自我照料厅",
  "情绪经过厅",
  "学习工作厅",
];

const SYSTEM_PROMPT = `你是 The Unapplauded 的展品策展人。

The Unapplauded 是一个私人小博物馆，用来收藏普通人每天完成的、没有被鼓掌的小事。

你的任务：
把用户输入的一件日常小成就，转写成一件博物馆展品。

写作原则：
- 中文输出，除非用户输入明显是英文。
- 温柔、克制、具体、有私人博物馆感。
- 像展签，不像心理咨询，不像鸡汤，不像效率工具。
- 不要夸大用户的成就。
- 不要评价用户人格。
- 不要说教。
- 不要催促用户继续努力。
- 不要使用"加油""成长""坚持""逆袭""变好""战胜懒惰""你太棒了"等词。
- 少用抽象词，多用具体物件、动作、空间和时间。
- 展签要短，不要长篇散文。
- 材质要混合具体物件和少量情绪质地。

只输出 JSON，不要 Markdown，不要解释。`;

function buildUserPrompt(text: string): string {
  return `用户输入的小成就是：

「${text}」

请生成一个展品对象，严格返回 JSON：

{
  "title": "展品标题，中文，8到18个字，不要加书名号",
  "gallery": "只能从以下选择之一：厨房厅、日常秩序厅、休息厅、社交勇气厅、自我照料厅、情绪经过厅、学习工作厅",
  "materials": ["3到5个材质，具体物件为主，可以混入一个抽象感受"],
  "label": "展签，60到120字，克制、具体、像博物馆说明牌",
  "curatorNote": "策展人注，12到28字，安静，不像口号"
}

分类参考：
- 做饭、吃饭、喝水、厨房相关 → 厨房厅
- 收拾、洗衣、整理、清洁 → 日常秩序厅
- 睡觉、休息、散步、晒太阳、什么都没做 → 休息厅
- 打电话、道歉、拒绝、表达、回复消息 → 社交勇气厅
- 吃药、洗澡、看病、刷牙、照顾身体 → 自我照料厅
- 难过、焦虑、没有崩溃、没有责怪自己 → 情绪经过厅
- 学习、写代码、工作、修 bug、读书 → 学习工作厅

禁止：
- 不要输出 JSON 以外的文字。
- 不要使用 Markdown。
- 不要使用"加油""成长""坚持""逆袭""变好""战胜懒惰""你很棒"。
- 不要把小事写成宏大胜利。`;
}

interface MiMoExhibit {
  title: string;
  gallery: string;
  materials: string[];
  label: string;
  curatorNote: string;
}

function isValidExhibit(data: unknown): data is MiMoExhibit {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;

  if (typeof obj.title !== "string" || obj.title.length === 0) return false;
  if (typeof obj.gallery !== "string") return false;
  if (!ALLOWED_GALLERIES.includes(obj.gallery)) return false;
  if (!Array.isArray(obj.materials)) return false;
  if (obj.materials.length < 3 || obj.materials.length > 5) return false;
  if (!obj.materials.every((m: unknown) => typeof m === "string")) return false;
  if (typeof obj.label !== "string" || obj.label.length === 0) return false;
  if (typeof obj.curatorNote !== "string" || obj.curatorNote.length === 0)
    return false;

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }
    if (text.length > 200) {
      return NextResponse.json(
        { error: "text too long" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MIMO_API_KEY;
    const baseUrl = process.env.MIMO_BASE_URL;
    const model = process.env.MIMO_MODEL || "mimo-v2.5-pro";

    if (!apiKey || !baseUrl) {
      return NextResponse.json({ source: "fallback" });
    }

    const url = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(text) },
        ],
        max_completion_tokens: 800,
        temperature: 0.8,
        top_p: 0.9,
        stream: false,
        thinking: { type: "disabled" },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ source: "fallback" });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (typeof content !== "string") {
      return NextResponse.json({ source: "fallback" });
    }

    // Try to parse JSON from the response
    let parsed: unknown;
    try {
      // Strip markdown code fences if present
      const cleaned = content
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ source: "fallback" });
    }

    if (!isValidExhibit(parsed)) {
      return NextResponse.json({ source: "fallback" });
    }

    return NextResponse.json({
      source: "ai",
      exhibit: {
        title: parsed.title,
        gallery: parsed.gallery,
        materials: parsed.materials,
        museumLabel: parsed.label,
        curatorNote: parsed.curatorNote,
      },
    });
  } catch {
    return NextResponse.json({ source: "fallback" });
  }
}
