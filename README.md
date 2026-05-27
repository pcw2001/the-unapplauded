# The Unapplauded

> A museum for ordinary victories.

一个安静的个人博物馆，把日常的小事变成展品。

写下一件今天发生的小事——给自己煮了一碗面、终于回了那条消息、收拾了桌子——它会被变成一件博物馆展品，放进你的私人收藏。

**[在线演示](https://the-unapplauded.vercel.app)** <!-- TODO: 替换为你的实际 Vercel 地址 -->

---

## 功能

- 写下一件今天的小事（200 字以内）
- 自动生成博物馆展品（标题、展厅、材质、展签、策展人笔记）
- 预览展品，不满意可以换一种呈现
- 保存到个人博物馆墙
- 点击展品查看完整详情
- 删除展品（有确认提示）
- 所有数据保存在浏览器 localStorage，无需登录

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
- **存储：** 浏览器 localStorage
- **部署：** Vercel
- **PWA：** Web App Manifest（可安装到主屏幕）

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/pcw2001/the-unapplauded.git
cd the-unapplauded

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000。

## 部署

项目使用 Next.js App Router，所有页面静态预渲染，可直接部署到 Vercel：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

或将 GitHub 仓库连接到 [vercel.com](https://vercel.com)，每次 push 自动部署。

## PWA

The Unapplauded 支持作为 PWA 安装到主屏幕：

- **iOS Safari：** 分享按钮 → 添加到主屏幕
- **Android Chrome：** 菜单 → 安装应用
- **桌面 Chrome：** 地址栏右侧的安装图标

安装后可以像原生应用一样打开，有独立的启动画面和图标。

v0.5.1 增加了 PNG 图标回退，提升各浏览器 PWA 兼容性。

注意：应用可安装但不支持离线使用。数据仍保存在浏览器 localStorage 中，清除浏览器数据会丢失展品。

详细的安装验证步骤见 [docs/PWA_CHECKLIST.md](docs/PWA_CHECKLIST.md)。

## 数据存储

所有展品保存在浏览器的 `localStorage` 中：

- 不需要服务器
- 不需要登录
- 不会上传到任何地方
- 清除浏览器缓存会丢失数据
- 不同设备、不同浏览器之间的数据不互通

这是设计选择——这是一个完全本地的个人空间。

## 项目结构

```
app/
  layout.tsx            — 根布局（字体、全局样式、footer）
  manifest.ts           — PWA manifest
  page.tsx              — 首页（输入小事）
  preview/page.tsx      — 展品预览
  museum/page.tsx       — 博物馆墙 + 详情弹窗 + 删除确认
  opengraph-image.tsx   — 动态 OG 分享图片
lib/
  storage.ts            — localStorage 读写
  galleries.ts          — 展厅分类和关键词匹配
  templates.ts          — 展品文案模板池
  exhibit-generator.ts  — 展品生成（随机组合模板）
types/
  exhibit.ts            — 类型定义
docs/
  MANUAL_QA.md          — 手动测试指南
  PWA_CHECKLIST.md      — PWA 安装验证清单
```

## 已知限制

- 数据仅存在于当前浏览器，清除缓存会丢失所有展品
- 不支持导出展品
- 不支持编辑已保存的展品
- 展品文案基于随机模板，不使用 AI
- 无深色模式
- 无跨设备同步

## 路线图

1. **v0.4** — 公开展示版：优化首页、空状态、OG 分享、footer
2. **v0.5** — PWA 基础：manifest、图标、可安装到主屏幕
3. **v0.5.1** — PWA 兼容性：PNG 图标回退、安装验证清单
4. **v0.6** — 离线支持：Service Worker + 缓存策略
5. **v0.7** — AI 生成展品：可选的 AI 模板，让展品更个性化
6. **v1.0** — 云端同步 + 应用打包

## License

MIT
