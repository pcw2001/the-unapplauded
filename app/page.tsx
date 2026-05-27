"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateExhibit } from "@/lib/exhibit-generator";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("写点什么吧，哪怕很小的事。");
      return;
    }

    if (input.length > 200) {
      setError("200字就够了，小事不需要长篇大论。");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const exhibit = generateExhibit(input.trim());
      sessionStorage.setItem("current-exhibit", JSON.stringify(exhibit));
      router.push("/preview");
    } catch {
      setError("展品生成遇到了一点问题，请再试一次。");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-lg sm:max-w-2xl w-full text-center space-y-6 sm:space-y-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground tracking-tight">
            The Unapplauded
          </h1>
          <p className="text-secondary text-base sm:text-lg">
            一个存放小事的地方
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <p className="text-foreground/80 text-sm sm:text-base">
            今天有什么事，值得被保存？
          </p>

          <div className="relative">
            <label htmlFor="achievement-input" className="sr-only">
              写下今天的一件小事
            </label>
            <textarea
              id="achievement-input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="在这里写..."
              maxLength={200}
              rows={4}
              aria-describedby={error ? "input-error" : undefined}
              className="w-full p-3 sm:p-4 bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 text-foreground placeholder-secondary text-sm sm:text-base"
              disabled={isGenerating}
            />
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-secondary" aria-live="polite" aria-atomic="true">
              {input.length}/200
            </div>
          </div>

          {error && (
            <p id="input-error" role="alert" className="text-xs sm:text-sm text-secondary/80 italic">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isGenerating || !input.trim()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm sm:text-base"
          >
            {isGenerating ? "正在准备展品..." : "生成展品"}
          </button>
        </div>

        <div className="pt-6 sm:pt-8">
          <Link
            href="/museum"
            className="text-secondary hover:text-foreground transition-colors duration-200 text-xs sm:text-sm"
          >
            进入博物馆 →
          </Link>
        </div>
      </div>
    </main>
  );
}
