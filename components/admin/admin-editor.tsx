"use client";

import { SectionForm } from "@/components/admin/section-form";
import { SectionNav } from "@/components/admin/section-nav";
import type { EditableSectionKey, SiteContent } from "@/types/site-content";
import { useEffect, useRef, useState, useTransition } from "react";

const sectionTitles: Record<EditableSectionKey, string> = {
  hero: "Первый экран",
  benefits: "Преимущества",
  leadMagnet: "После заявки",
  quiz: "Квиз",
  projects: "Кейсы",
  testimonials: "Отзывы",
  contacts: "Контакты",
  footer: "Подвал",
};

const sectionKeys = Object.keys(sectionTitles) as EditableSectionKey[];

function getProjectCardValidationErrors(content: SiteContent) {
  return content.projects.items
    .map((item, index) => {
      const missingFields: string[] = [];

      if (!item.gallery[0]?.trim()) missingFields.push("хотя бы 1 фото");
      if (!item.title.trim()) missingFields.push("заголовок");
      if (!item.location.trim()) missingFields.push("локация");
      if (!item.price.trim()) missingFields.push("цена");
      if (!item.duration.trim()) missingFields.push("срок");
      if (!item.format.trim()) missingFields.push("формат");
      if (!item.scope.trim()) missingFields.push("что сделали");
      if (!item.result.trim()) missingFields.push("результат");

      if (missingFields.length === 0) {
        return null;
      }

      return `Кейс ${index + 1}: заполните ${missingFields.join(", ")}.`;
    })
    .filter((value): value is string => value !== null);
}

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

export function AdminEditor({
  initialContent,
  hasPersistentStorage,
}: {
  initialContent: SiteContent;
  hasPersistentStorage: boolean;
}) {
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState<EditableSectionKey>("hero");
  const [status, setStatus] = useState("");
  const [lastSavedSerialized, setLastSavedSerialized] = useState(
    JSON.stringify(initialContent),
  );
  const [isPending, startTransition] = useTransition();
  const lastSavedRef = useRef(JSON.stringify(initialContent));
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const serializedContent = JSON.stringify(content);

    if (serializedContent === lastSavedRef.current) {
      return;
    }

    setStatus("Есть несохранённые изменения. Автосохранение...");

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      startTransition(async () => {
        const validationErrors = getProjectCardValidationErrors(content);

        if (validationErrors.length > 0) {
          setStatus(validationErrors[0]);
          return;
        }

        try {
          const nextContent = await saveContent(content);
          const serializedNext = JSON.stringify(nextContent);
          lastSavedRef.current = serializedNext;
          setLastSavedSerialized(serializedNext);
          setContent(nextContent);
          setStatus("Изменения сохранены автоматически.");
        } catch (error) {
          setStatus(
            error instanceof Error ? error.message : "Ошибка автосохранения.",
          );
        }
      });
    }, 900);

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [content, startTransition]);

  const isSaved = JSON.stringify(content) === lastSavedSerialized;

  const handleSave = () =>
    startTransition(async () => {
      const validationErrors = getProjectCardValidationErrors(content);

      if (validationErrors.length > 0) {
        setStatus(validationErrors[0]);
        return;
      }

      try {
        const nextContent = await saveContent(content);
        const serializedNext = JSON.stringify(nextContent);
        lastSavedRef.current = serializedNext;
        setLastSavedSerialized(serializedNext);
        setContent(nextContent);
        setStatus("Контент сохранён.");
      } catch (error) {
        setStatus(
          error instanceof Error ? error.message : "Ошибка сохранения.",
        );
      }
    });

  return (
    <main className="min-h-screen bg-[#111111] px-6 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Админ-панель
              </h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  startTransition(async () => {
                    try {
                      const nextContent = await resetContent();
                      const serializedNext = JSON.stringify(nextContent);
                      lastSavedRef.current = serializedNext;
                      setLastSavedSerialized(serializedNext);
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
                onClick={handleSave}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#ab8453] px-5 text-sm font-medium text-white"
              >
                Сохранить все
              </button>
            </div>
          </div>

          {isPending || status ? (
            <p className="mt-4 text-sm text-zinc-400">
              {isPending ? "Сохранение..." : status}
            </p>
          ) : null}

          {!hasPersistentStorage ? (
            <p className="mt-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Постоянная база данных не настроена: `DATABASE_URL` отсутствует. Сейчас изменения
              сохраняются только до перезапуска приложения.
            </p>
          ) : null}
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

      <div className="pointer-events-none fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || isSaved}
          className={`pointer-events-auto inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(0,0,0,0.35)] transition ${
            isSaved
              ? "bg-zinc-600"
              : "bg-[#ab8453] hover:opacity-95"
          } disabled:cursor-default disabled:hover:opacity-100`}
        >
          {isPending ? "Сохранение..." : isSaved ? "Сохранено" : "Сохранить все"}
        </button>
      </div>
    </main>
  );
}
