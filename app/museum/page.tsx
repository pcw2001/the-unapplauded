"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Exhibit } from "@/types/exhibit";
import { getExhibits, deleteExhibit } from "@/lib/storage";

const galleryAccents: Record<string, string> = {
  "厨房厅": "border-t-amber-300",
  "日常秩序厅": "border-t-sky-300",
  "休息厅": "border-t-indigo-200",
  "社交勇气厅": "border-t-rose-300",
  "自我照料厅": "border-t-emerald-300",
  "情绪管理厅": "border-t-violet-300",
};

export default function MuseumPage() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydration: load localStorage after mount to match SSR */
    setExhibits(getExhibits());
  }, []);
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const exhibitModalRef = useRef<HTMLDivElement>(null);
  const deleteModalRef = useRef<HTMLDivElement>(null);

  const closeExhibit = useCallback(() => {
    setSelectedExhibit(null);
  }, []);

  const closeDelete = useCallback(() => {
    setDeleteConfirm(null);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (deleteConfirm) {
          closeDelete();
        } else if (selectedExhibit) {
          closeExhibit();
        }
        return;
      }

      if (e.key === "Tab") {
        const activeModal = deleteConfirm
          ? deleteModalRef.current
          : selectedExhibit
            ? exhibitModalRef.current
            : null;
        if (!activeModal) return;

        const focusable = activeModal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [selectedExhibit, deleteConfirm, closeExhibit, closeDelete]);

  useEffect(() => {
    if (selectedExhibit || deleteConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedExhibit, deleteConfirm]);

  useEffect(() => {
    if (selectedExhibit && exhibitModalRef.current) {
      const firstFocusable = exhibitModalRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [selectedExhibit]);

  useEffect(() => {
    if (deleteConfirm && deleteModalRef.current) {
      const firstFocusable = deleteModalRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [deleteConfirm]);

  const handleDelete = (id: string) => {
    deleteExhibit(id);
    setExhibits(getExhibits());
    setSelectedExhibit(null);
    setDeleteConfirm(null);
  };

  return (
    <main className="flex-1 px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-2">
            我的博物馆
          </h1>
          <p className="text-secondary text-sm sm:text-base">
            共 {exhibits.length} 件展品
          </p>
        </div>

        {exhibits.length === 0 ? (
          <div className="text-center py-16 sm:py-20 space-y-6">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-2 border-border rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 border-2 border-border rounded-lg transform -rotate-2"></div>
              <div className="absolute inset-0 bg-card border border-border rounded-lg flex items-center justify-center">
                <div className="w-12 h-8 border-b-2 border-secondary/30"></div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-serif text-foreground">
                博物馆还没有展品
              </h2>
              <p className="text-secondary max-w-md mx-auto">
                这里还是空的。
              </p>
            </div>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors duration-200"
            >
              写下第一件小事
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {exhibits.map((exhibit, index) => (
              <div
                key={exhibit.id}
                onClick={() => setSelectedExhibit(exhibit)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedExhibit(exhibit);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`展品：${exhibit.title}`}
                className={`bg-card border border-border border-t-2 rounded-lg p-4 sm:p-5 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in ${galleryAccents[exhibit.gallery] || "border-t-border"}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="font-mono text-xs sm:text-sm text-secondary">
                    #{String(exhibit.exhibitNumber).padStart(3, "0")}
                  </p>
                  <p className="text-xs text-secondary">{exhibit.date}</p>
                </div>
                <h3 className="text-base sm:text-lg font-serif text-foreground mb-2 line-clamp-2">
                  {exhibit.title}
                </h3>
                <p className="text-xs text-secondary mb-3 inline-block px-2 py-0.5 bg-secondary/10 rounded">
                  {exhibit.gallery}
                </p>
                <p className="text-xs sm:text-sm text-foreground/70 line-clamp-3 italic">
                  {exhibit.curatorNote}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/"
            className="text-secondary hover:text-foreground transition-colors duration-200 text-sm"
          >
            ← 回到大厅
          </Link>
        </div>
      </div>

      {selectedExhibit && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-0 sm:p-4 z-50 animate-fade-in"
          onClick={closeExhibit}
          role="dialog"
          aria-modal="true"
          aria-label={`展品：${selectedExhibit.title}`}
        >
          <div
            ref={exhibitModalRef}
            className="bg-card border-0 sm:border border-border sm:rounded-lg w-full h-full sm:max-w-lg sm:max-h-[90vh] sm:h-auto overflow-y-auto p-5 sm:p-6 md:p-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div>
                <p className="font-mono text-xs sm:text-sm text-secondary">
                  #{String(selectedExhibit.exhibitNumber).padStart(3, "0")}
                </p>
                <p className="text-xs sm:text-sm text-secondary">
                  {selectedExhibit.gallery}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirm(selectedExhibit.id);
                  }}
                  className="text-secondary hover:text-red-500 transition-colors duration-200 text-xs sm:text-sm"
                  aria-label="删除此展品"
                >
                  删除
                </button>
                <button
                  onClick={closeExhibit}
                  className="text-secondary hover:text-foreground transition-colors duration-200 text-lg sm:text-xl p-1"
                  aria-label="关闭"
                >
                  ✕
                </button>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-4 sm:mb-6">
              {selectedExhibit.title}
            </h3>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <p className="text-xs text-secondary uppercase tracking-wider mb-1">
                  材质
                </p>
                <p className="text-sm sm:text-base text-foreground/80 italic">
                  {selectedExhibit.materials}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs text-secondary uppercase tracking-wider mb-2">
                  展签
                </p>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {selectedExhibit.museumLabel}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs text-secondary uppercase tracking-wider mb-2">
                  策展人笔记
                </p>
                <p className="text-sm sm:text-base text-foreground/80 italic">
                  {selectedExhibit.curatorNote}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs text-secondary uppercase tracking-wider mb-2">
                  原始输入
                </p>
                <p className="text-xs sm:text-sm text-foreground/70">
                  &ldquo;{selectedExhibit.rawInput}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={closeDelete}
          role="dialog"
          aria-modal="true"
          aria-label="确认删除展品"
        >
          <div
            ref={deleteModalRef}
            className="bg-card border border-border rounded-lg max-w-xs sm:max-w-sm w-full p-5 sm:p-6 text-center space-y-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-serif text-foreground">
              确认删除？
            </h3>
            <p className="text-secondary text-sm">
              删除后无法恢复。这件展品会从博物馆里消失。
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center">
              <button
                onClick={closeDelete}
                className="px-4 sm:px-6 py-2 border border-border rounded-lg hover:bg-card transition-colors duration-200 text-sm"
              >
                取消
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 sm:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
