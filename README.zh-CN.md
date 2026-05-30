# The Unapplauded

> 一个安静的个人博物馆，把日常的小事变成展品。

[English](README.md) | 简体中文

**[在线演示](https://the-unapplauded.vercel.app)**

---

## 项目简介

The Unapplauded 是一个完全运行在浏览器中的个人博物馆。写下一件今天发生的小事——给自己煮了一碗面、终于回了那条消息、收拾了桌子——它会被变成一件博物馆展品，放进你的私人收藏。

所有数据保存在浏览器 localStorage 中，无需服务器、无需登录、不会上传。

## 功能特性

- 写下一件今天的小事（200 字以内）
- 自动生成博物馆展品（标题、展厅、材质、展签、策展人笔记）
- 支持 MiMo AI 生成（可选），无 API key 时自动使用本地模板
- 预览展品，不满意可以换一种呈现
- 保存到个人博物馆墙
- 点击展品查看完整详情
- 删除展品（有确认提示）
- 6 个展厅根据关键词自动分类
- 支持 PWA 安装，可离线访问
- 动态 OpenGraph 分享图片

## 展厅分类

输入内容会根据关键词自动归入不同展厅：

| 展厅 | 气质 | 触发词示例 |
|------|------|-----------|
| 厨房厅 | 烟火气、锅碗、深夜 | 做饭、煮、面条、下厨 |
| 日常秩序厅 | 灰尘、物件、归位 | 整理、打扫、收拾、拖地 |
| 休息厅 | 安静、无所事事、下午 | 休息、睡、放松、午休 |
| 社交勇气厅 | 紧张、笨拙、真实 | 打电话、约、见、回消息 |
| 自我照料厅 | 牙刷、温水、毛巾 | 洗澡、吃饭、喝水、散步 |
| 情绪管理厅 | 经过、不评判、安静 | 哭、难过、接受、深呼吸 |

未匹配时默认归入「日常秩序厅」。

## 技术栈

- **框架：** Next.js 16 (App Router)
- **UI：** React 19 + Tailwind CSS v4
- **语言：** TypeScript
- **AI：** MiMo（Xiaomi Token Plan，OpenAI 兼容接口，可选）
- **存储：** 浏览器 localStorage
- **部署：** Vercel
- **PWA：** Web App Manifest + Service Worker

## 本地运行

```bash
git clone https://github.com/pangchuanwang/the-unapplauded.git
cd the-unapplauded
npm install
npm run dev
```

打开 http://localhost:3000。

不设置 MiMo 环境变量时，应用会使用本地模板生成展品，完全可正常运行。

## AI 生成配置（可选）

复制 `.env.example` 为 `.env.local`，填入你的 API key：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```
MIMO_API_KEY=your-api-key-here
MIMO_BASE_URL=https://token-plan-cn.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro
```

**重要：** 不要使用 `NEXT_PUBLIC_` 前缀。API key 只在服务端使用，不会暴露给浏览器。

### 行为说明

- 有 API key 时：调用 MiMo AI 生成展品文案
- 无 API key 时：使用本地随机模板生成（默认行为）
- API 调用失败时：自动回退到本地模板，并显示提示"这次先用本地展签生成。"

## 部署

项目使用 Next.js App Router，可直接部署到 Vercel：

```bash
npm i -g vercel
vercel login
vercel --prod
```

或将 GitHub 仓库连接到 [vercel.com](https://vercel.com)，每次 push 自动部署。

## 项目结构

```
app/
  layout.tsx              — 根布局（字体、全局样式、footer）
  manifest.ts             — PWA manifest
  page.tsx                — 首页（输入小事）
  preview/page.tsx        — 展品预览
  museum/page.tsx         — 博物馆墙 + 详情弹窗 + 删除确认
  opengraph-image.tsx     — 动态 OG 分享图片
  api/generate-exhibit/
    route.ts              — MiMo AI 展品生成 API
components/
  service-worker-register.tsx
lib/
  storage.ts              — localStorage 读写
  galleries.ts            — 展厅分类和关键词匹配
  templates.ts            — 展品文案模板池
  exhibit-generator.ts    — 展品生成（本地随机模板）
types/
  exhibit.ts              — 类型定义
```

## 项目亮点

- **优雅的 AI 降级**：无 API key 时本地模板仍能生成高质量展品文案
- **无障碍弹窗**：焦点捕获、Escape 关闭、ARIA 角色、键盘导航
- **PWA 离线支持**：Service Worker 缓存应用外壳，已保存展品始终可用
- **零数据采集**：所有数据留在浏览器，无分析、无追踪、无服务端
- **策展式分类**：6 个主题展厅，基于关键词匹配的智能分类
- **动态社交分享**：Edge 运行时生成 OpenGraph 图片，链接预览更丰富

## 后续计划

- v0.7: MiMo AI 集成，生成更个性化的展品文案
- v1.0: 云端同步 + 应用打包
- 未来: 导出功能、深色模式、跨设备同步

## 已知限制

- 数据仅存在于当前浏览器，清除缓存会丢失所有展品
- 不支持导出或编辑已保存的展品
- 不同设备、不同浏览器之间的数据不互通

## 作者

庞川旺 / Chuanwang Pang
GitHub: [github.com/pangchuanwang](https://github.com/pangchuanwang)

## License

MIT
