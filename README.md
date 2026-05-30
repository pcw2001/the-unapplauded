# The Unapplauded

> A museum for ordinary victories.

English | [简体中文](README.zh-CN.md)

**[Live Demo](https://the-unapplauded.vercel.app)**

---

## Overview

The Unapplauded is a personal, browser-only museum for recording everyday victories. Write down a small thing that happened today — cooked a bowl of noodles, finally replied to that message, tidied the desk — and it becomes a museum exhibit in your private collection.

All data stays in your browser's localStorage. No server, no login, no data upload.

## Features

- Write a short everyday moment (200 characters max)
- AI-generated museum exhibit: title, gallery, materials, museum label, curator's note
- MiMo AI integration (optional) — falls back to local templates when no API key is set
- Preview the exhibit, regenerate for a different presentation
- Save to your personal museum wall
- View exhibit details in a modal
- Delete exhibits with confirmation
- 6 gallery classifications based on keyword matching
- PWA installable with offline support
- Dynamic OpenGraph image for social sharing

## Gallery Classification

Input is automatically categorized into one of 6 galleries:

| Gallery | Character | Example Triggers |
|---------|-----------|-----------------|
| Kitchen | Warm, everyday cooking | cook, noodles, kitchen |
| Daily Order | Tidying, organizing | clean, tidy, organize |
| Rest | Quiet, doing nothing | rest, sleep, relax |
| Social Courage | Nervous, real connection | call, meet, reply |
| Self-Care | Small body kindness | shower, eat, walk |
| Emotional Management | Non-judgmental presence | cry, sad, accept, breathe |

Unmatched input defaults to "Daily Order."

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS v4
- **Language:** TypeScript
- **AI:** MiMo (Xiaomi Token Plan, OpenAI-compatible, optional)
- **Storage:** Browser localStorage
- **Deployment:** Vercel
- **PWA:** Web App Manifest + Service Worker

## Getting Started

```bash
git clone https://github.com/pangchuanwang/the-unapplauded.git
cd the-unapplauded
npm install
npm run dev
```

Open http://localhost:3000.

The app works fully without any environment variables — local templates are used when MiMo API key is absent.

## AI Configuration (Optional)

Copy `.env.example` to `.env.local` and fill in your API key:

```bash
cp .env.example .env.local
```

```
MIMO_API_KEY=your-api-key-here
MIMO_BASE_URL=https://token-plan-cn.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro
```

**Important:** Do NOT use the `NEXT_PUBLIC_` prefix. The API key is server-side only.

## Deployment

Deploy to Vercel with one click, or via CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

Or connect the GitHub repo to [vercel.com](https://vercel.com) for automatic deployments on push.

## Project Structure

```
app/
  layout.tsx              — Root layout (fonts, global styles, footer)
  manifest.ts             — PWA manifest
  page.tsx                — Home page (write a moment)
  preview/page.tsx        — Exhibit preview
  museum/page.tsx         — Museum wall + detail modal + delete
  opengraph-image.tsx     — Dynamic OG share image
  api/generate-exhibit/
    route.ts              — MiMo AI exhibit generation API
components/
  service-worker-register.tsx
lib/
  storage.ts              — localStorage read/write
  galleries.ts            — Gallery classification + keyword matching
  templates.ts            — Exhibit text template pool
  exhibit-generator.ts    — Exhibit generation (local random templates)
types/
  exhibit.ts              — Type definitions
```

## Highlights

- **Graceful AI fallback**: Works perfectly without API keys; local templates produce high-quality exhibit text
- **Accessible modals**: Focus trapping, Escape key close, ARIA roles, keyboard navigation
- **PWA with offline support**: Service Worker caches the app shell; saved exhibits are always available
- **Zero data collection**: All data stays in the browser — no analytics, no tracking, no server
- **Curated gallery system**: 6 themed galleries with keyword-based classification for meaningful categorization
- **Dynamic social sharing**: Edge-runtime generated OpenGraph images for rich link previews

## Roadmap

- v0.7: AI exhibit generation with MiMo integration
- v1.0: Cloud sync + app packaging
- Future: Export functionality, dark mode, cross-device sync

## Author

Chuanwang Pang
GitHub: [github.com/pangchuanwang](https://github.com/pangchuanwang)

## License

MIT
