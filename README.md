# The Unapplauded

一个存放小事的地方。

The Unapplauded 是一个安静的个人博物馆，把日常的小事变成展品。

## 开始

```bash
npm install
npm run dev
```

打开 http://localhost:3000。

## 当前功能

- 写下一件今天发生的小事（200 字以内）
- 系统把它变成博物馆展品（标题、展厅、材质、展签、策展人笔记）
- 预览展品，不满意可以换一种呈现
- 保存到个人博物馆墙
- 点击展品查看完整详情
- 删除展品（有确认提示）
- 所有数据保存在浏览器 localStorage，无需登录

## 展厅分类

输入内容会根据关键词自动归入不同展厅：

| 展厅 | 触发词示例 |
|------|-----------|
| 厨房厅 | 做饭、煮、面条、下厨 |
| 日常秩序厅 | 整理、打扫、收拾、拖地 |
| 休息厅 | 休息、睡、放松、午休 |
| 社交勇气厅 | 打电话、约、见、回消息 |
| 自我照料厅 | 洗澡、吃饭、喝水、散步 |
| 情绪管理厅 | 哭、难过、接受、深呼吸 |

未匹配时默认归入「日常秩序厅」。

## 技术栈

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- localStorage 本地存储

## 项目结构

```
app/
  layout.tsx          — 根布局（字体、全局样式）
  page.tsx            — 首页（输入小事）
  preview/page.tsx    — 展品预览
  museum/page.tsx     — 博物馆墙 + 详情弹窗 + 删除确认
lib/
  storage.ts          — localStorage 读写
  galleries.ts        — 展厅分类和关键词匹配
  templates.ts        — 展品文案模板池
  exhibit-generator.ts — 展品生成（随机组合模板）
types/
  exhibit.ts          — 类型定义
```

## 设计语言

- 米白背景 (#F5F0EB)
- 衬线标题（Noto Serif SC）
- 柔和的卡片和边框
- 安静的动效
- 移动端优先

## 文案风格

温暖、克制、具体、不说教。

不使用：加油、你最棒、逆袭、战胜懒惰、赋能。
偏好：安静的、具体的、有生活感的语言。

## 已知限制

- 数据仅存在当前浏览器，清除缓存会丢失所有展品
- 不支持导出展品
- 不支持编辑已保存的展品
- 展品文案基于随机模板，不使用 AI
- 无深色模式
- 无跨设备同步

## 构建

```bash
npm run build    # 生产构建
npm start        # 启动生产服务器
npm run lint     # 代码检查
```

## License

MIT
