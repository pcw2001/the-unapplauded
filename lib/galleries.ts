import { GalleryInfo } from "@/types/exhibit";

export const galleries: GalleryInfo[] = [
  {
    id: "kitchen",
    name: "厨房厅",
    keywords: ["做饭", "煮", "炒", "面条", "厨房", "烧", "煮饭", "炒菜", "煮面", "下厨"],
  },
  {
    id: "order",
    name: "日常秩序厅",
    keywords: ["整理", "收拾", "打扫", "清洁", "拖地", "擦", "洗", "叠", "归位"],
  },
  {
    id: "rest",
    name: "休息厅",
    keywords: ["休息", "睡", "放松", "躺", "午休", "早睡", "休息", "歇"],
  },
  {
    id: "social",
    name: "社交勇气厅",
    keywords: ["打电话", "约", "见", "聊天", "联系", "回消息", "主动", "开口"],
  },
  {
    id: "self-care",
    name: "自我照料厅",
    keywords: ["洗澡", "吃饭", "喝水", "早起", "刷牙", "出门", "散步", "运动"],
  },
  {
    id: "emotional",
    name: "情绪管理厅",
    keywords: ["哭", "难过", "接受", "放下", "原谅", "不生气", "平静", "深呼吸"],
  },
];

export function matchGallery(input: string): GalleryInfo {
  const lowerInput = input.toLowerCase();

  for (const gallery of galleries) {
    for (const keyword of gallery.keywords) {
      if (lowerInput.includes(keyword)) {
        return gallery;
      }
    }
  }

  return galleries[1];
}
