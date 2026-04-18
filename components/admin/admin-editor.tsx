"use client";

import { useState, useTransition } from "react";
import type { EditableSectionKey, SiteContent } from "@/types/site-content";
import { SectionNav } from "@/components/admin/section-nav";
import { SectionForm } from "@/components/admin/section-form";

const sectionTitles: Record<EditableSectionKey, string> = {
  hero: "Hero",
  benefits: "Benefits",
  leadMagnet: "Lead Magnet",
  quiz: "Quiz",
  projects: "Projects",
  testimonials: "Testimonials",
  contacts: "Contacts",
  footer: "Footer",
};

const sectionKeys = Object.keys(sectionTitles) as EditableSectionKey[];

async function saveContent(content: SiteContent) {
  const response = await fetch("/api/admin/content", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить контент");
  }

  return (await response.json()) as SiteContent;
}

async function resetContent() {
  const response = await fetch("/api/admin/content", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Не удалось сбросить контент");
  }

  return (await response.json()) as SiteContent;
}

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState<EditableSectionKey>("hero");
  const [status, setStatus] = useState<string>("Локальное хранилище активно. Изменения сохраняются до перезапуска dev server.");
  const [isPending, startTransition] = useTransition();

  return (
    <main className="min-h-screen bg-[#111111] px-6 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">/admin</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Простая панель редактирования контента
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                Одна страница с формами по секциям. Без базы данных на этом этапе:
                изменения сохраняются в локальном in-memory store.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  startTransition(async () => {
                    try {
                      const nextContent = await resetContent();
                      setContent(nextContent);
                      setStatus("Контент сброшен к seed-версии.");
                    } catch (error) {
                      setStatus(error instanceof Error ? error.message : "Ошибка сброса.");
                    }
                  })
                }
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-medium text-zinc-100"
              >
                Сбросить
              </button>
              <button
                type="button"
                onClick={() =>
                  startTransition(async () => {
                    try {
                      const nextContent = await saveContent(content);
                      setContent(nextContent);
                      setStatus("Контент сохранён.");
                    } catch (error) {
                      setStatus(error instanceof Error ? error.message : "Ошибка сохранения.");
                    }
                  })
                }
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#ab8453] px-5 text-sm font-medium text-white"
              >
                Сохранить все
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-zinc-400">{isPending ? "Сохранение..." : status}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <SectionNav
            activeSection={activeSection}
            items={sectionKeys.map((key) => ({
              key,
              label: sectionTitles[key],
            }))}
            onSelect={setActiveSection}
          />

          <SectionForm
            activeSection={activeSection}
            content={content}
            onChange={setContent}
          />
        </div>
      </div>
    </main>
  );
}
