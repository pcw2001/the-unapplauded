"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Exhibit } from "@/types/exhibit";
import { saveExhibit } from "@/lib/storage";
import { generateExhibit } from "@/lib/exhibit-generator";

export default function PreviewPage() {
  const [exhibit, setExhibit] = useState<Exhibit | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem("current-exhibit");
    return stored ? JSON.parse(stored) : null;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("exhibit-fallback") === "true";
  });
  const router = useRouter();

  useEffect(() => {
    if (!exhibit) {
      router.replace("/");
    }
  }, [exhibit, router]);

  const handleSave = () => {
    if (!exhibit) return;

    setIsSaving(true);
    try {
      saveExhibit(exhibit);
      setIsSaved(true);
      sessionStorage.removeItem("current-exhibit");
    } catch {
      alert("保存遇到了一点问题，请再试一次。");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerate = () => {
    if (!exhibit) return;

    const newExhibit = generateExhibit(exhibit.rawInput);
    setExhibit(newExhibit);
    sessionStorage.setItem("current-exhibit", JSON.stringify(newExhibit));
    setFallbackUsed(false);
    sessionStorage.removeItem("exhibit-fallback");
  };

  if (!exhibit) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-secondary text-sm">正在准备展品...</p>
      </main>
    );
  }

  if (isSaved) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-md sm:max-w-lg w-full text-center space-y-6 animate-fade-in">
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-accent/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif">已放入博物馆</h2>
            <p className="text-secondary text-sm sm:text-base">
              它会在博物馆里安静地等你。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/"
              className="px-5 sm:px-6 py-2.5 sm:py-2 border border-border rounded-lg hover:bg-card transition-colors duration-200 text-sm"
            >
              回到大厅
            </Link>
            <Link
              href="/museum"
              className="px-5 sm:px-6 py-2.5 sm:py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors duration-200 text-sm"
            >
              查看博物馆
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-xl sm:max-w-2xl w-full space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-serif text-foreground">展品预览</h2>
          <p className="text-secondary text-xs sm:text-sm mt-1">
            你的小事，变成了这个
          </p>
          {fallbackUsed && (
            <p className="text-secondary/60 text-xs mt-2">
              这次先用本地展签生成。
            </p>
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs sm:text-sm text-secondary">
                #{String(exhibit.exhibitNumber).padStart(3, "0")}
              </p>
              <p className="text-xs sm:text-sm text-secondary">
                {exhibit.gallery}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-secondary">{exhibit.date}</p>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-foreground">
            {exhibit.title}
          </h3>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <p className="text-xs text-secondary uppercase tracking-wider mb-1">
                材质
              </p>
              <p className="text-sm sm:text-base text-foreground/80 italic">
                {exhibit.materials}
              </p>
            </div>

            <div className="border-t border-border pt-3 sm:pt-4">
              <p className="text-xs text-secondary uppercase tracking-wider mb-2">
                展签
              </p>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {exhibit.museumLabel}
              </p>
            </div>

            <div className="border-t border-border pt-3 sm:pt-4">
              <p className="text-xs text-secondary uppercase tracking-wider mb-2">
                策展人笔记
              </p>
              <p className="text-sm sm:text-base text-foreground/80 italic">
                {exhibit.curatorNote}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={handleRegenerate}
            className="px-5 sm:px-6 py-2.5 sm:py-2 border border-border rounded-lg hover:bg-card transition-colors duration-200 text-sm"
          >
            换一种呈现
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 sm:px-6 py-2.5 sm:py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 disabled:opacity-50 transition-colors duration-200 text-sm"
          >
            {isSaving ? "保存中..." : "放入博物馆"}
          </button>
        </div>
      </div>
    </main>
  );
}
