import type { Metadata, Viewport } from "next";
import { Noto_Serif_SC, Inter, JetBrains_Mono } from "next/font/google";
import ServiceWorkerRegister from "@/components/service-worker-register";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#2C2C2C",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://the-unapplauded.vercel.app"),
  title: "The Unapplauded — A Museum for Ordinary Victories",
  description:
    "写下一件今天的小事，它会被变成一件博物馆展品。一个安静的个人博物馆，收藏日常的小胜利。",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Unapplauded",
  },
  applicationName: "The Unapplauded",
  openGraph: {
    title: "The Unapplauded",
    description: "A museum for ordinary victories. 写下一件今天的小事，它会被变成一件博物馆展品。",
    url: "https://the-unapplauded.vercel.app",
    siteName: "The Unapplauded",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unapplauded",
    description: "A museum for ordinary victories. 写下一件今天的小事，它会被变成一件博物馆展品。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSerifSC.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ServiceWorkerRegister />
        {children}
        <footer className="py-6 sm:py-8 text-center text-secondary/60 text-xs space-y-1">
          <p>
            The Unapplauded · v0.4
          </p>
          <p>
            A museum for ordinary victories.
          </p>
          <p>
            <a
              href="https://github.com/pcw2001/the-unapplauded"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors underline underline-offset-2"
            >
              GitHub
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
