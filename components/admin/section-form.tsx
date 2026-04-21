"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import type {
  BenefitItem,
  EditableSectionKey,
  ProjectItem,
  QuizQuestion,
  SiteContent,
  TestimonialItem,
} from "@/types/site-content";
import type { ChangeEvent, ReactNode } from "react";
import { useId, useState } from "react";

type SectionFormProps = {
  activeSection: EditableSectionKey;
  content: SiteContent;
  onChange: (content: SiteContent) => void;
};

function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white p-6 text-zinc-950">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border border-zinc-200 px-4 outline-none transition-colors focus:border-[#ab8453]"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition-colors focus:border-[#ab8453]"
      />
    </label>
  );
}

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <textarea
        rows={Math.max(4, items.length + 1)}
        value={items.join("\n")}
        onChange={(event) => onChange(event.target.value.split("\n"))}
        className="rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition-colors focus:border-[#ab8453]"
      />
      <span className="text-xs text-zinc-500">Один пункт на строку.</span>
    </label>
  );
}

function BenefitEditor({
  items,
  onChange,
}: {
  items: BenefitItem[];
  onChange: (items: BenefitItem[]) => void;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="grid gap-3 rounded-2xl bg-zinc-50 p-4"
        >
          <Field
            label={`Преимущество ${index + 1}: заголовок`}
            value={item.title}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], title: value };
              onChange(next);
            }}
          />
          <TextareaField
            label={`Преимущество ${index + 1}: описание`}
            value={item.description}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], description: value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

async function uploadFiles(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json()) as { urls?: string[]; error?: string };

  if (!response.ok || !payload.urls) {
    throw new Error(payload.error ?? "Не удалось загрузить изображения.");
  }

  return payload.urls;
}

function SortableGalleryTile({
  image,
  index,
  onRemove,
  dragOverlay = false,
}: {
  image: string;
  index: number;
  onRemove: () => void;
  dragOverlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: image,
      animateLayoutChanges: () => true,
    });

  return (
    <div
      ref={dragOverlay ? undefined : setNodeRef}
      style={
        dragOverlay
          ? undefined
          : {
              transform: CSS.Transform.toString(transform),
              transition,
            }
      }
      className={`rounded-2xl border bg-white p-3 ${
        dragOverlay
          ? "border-[#ab8453] shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
          : isDragging
            ? "z-10 border-[#ab8453] opacity-70"
            : "border-zinc-200"
      }`}
    >
      <div
        {...(dragOverlay ? {} : attributes)}
        {...(dragOverlay ? {} : listeners)}
        className="touch-none"
      >
        <div className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
          <Image
            src={image}
            alt={`Фото ${index + 1}`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 220px"
            className="object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-sm font-bold text-white transition hover:bg-black/80"
            aria-label={`Удалить фото ${index + 1}`}
          >
            ×
          </button>

          {index === 0 ? (
            <div className="absolute left-2 top-2 rounded-full bg-[#ab8453] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Главное
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-xl bg-black/65 px-3 py-2 text-[11px] leading-[1.35] text-white opacity-0 transition group-hover:opacity-100">
            <div className="break-all">{image}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryEditor({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const inputId = useId();
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      setStatus("Загрузка...");
      const uploadedUrls = await uploadFiles(files);
      onChange([...images, ...uploadedUrls]);
      setStatus("Фото загружены.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Ошибка загрузки.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveImage(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveImage(null);

    if (!over || active.id === over.id) return;

    const oldIndex = images.indexOf(String(active.id));
    const newIndex = images.indexOf(String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    onChange(arrayMove(images, oldIndex, newIndex));
  };

  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <span className="text-sm font-medium text-zinc-700">Галерея</span>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          disabled={isUploading}
          onChange={(event) => {
            void handleUpload(event);
          }}
          className="sr-only"
        />
        {status ? <span className="text-xs text-zinc-500">{status}</span> : null}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveImage(null)}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {images.map((image, index) => (
              <SortableGalleryTile
                key={image}
                image={image}
                index={index}
                onRemove={() => onChange(images.filter((current) => current !== image))}
              />
            ))}

            <label
              htmlFor={inputId}
              className={`cursor-pointer rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-3 transition hover:border-[#ab8453] hover:bg-white ${
                isUploading ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <div className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-white/70 text-center">
                <span className="text-4xl font-light leading-none text-[#ab8453]">+</span>
                <span className="mt-3 text-sm font-medium text-zinc-700">
                  {isUploading ? "Загрузка..." : "Добавить фото"}
                </span>
              </div>
            </label>
          </div>
        </SortableContext>

        <DragOverlay adjustScale={false}>
          {activeImage ? (
            <SortableGalleryTile
              image={activeImage}
              index={Math.max(0, images.indexOf(activeImage))}
              onRemove={() => {}}
              dragOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="h-px flex-1 bg-zinc-200" />
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
        Следующий кейс
      </span>
      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  );
}

function createEmptyProject(): ProjectItem {
  return {
    title: "",
    location: "",
    image: "",
    imageAlt: "",
    price: "",
    duration: "",
    format: "",
    scope: "",
    result: "",
    about: "",
    workItems: [],
    ownerLine: "",
    gallery: [],
  };
}

function getProjectCardMissingFields(item: ProjectItem) {
  const missingFields: string[] = [];

  if (!item.gallery[0]?.trim()) missingFields.push("1 фото");
  if (!item.title.trim()) missingFields.push("заголовок");
  if (!item.location.trim()) missingFields.push("локация");
  if (!item.price.trim()) missingFields.push("цена");
  if (!item.duration.trim()) missingFields.push("срок");
  if (!item.format.trim()) missingFields.push("формат");
  if (!item.scope.trim()) missingFields.push("что сделали");
  if (!item.result.trim()) missingFields.push("результат");

  return missingFields;
}

function CasesEditor({
  items,
  onChange,
}: {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}) {
  const updateItem = (index: number, patch: Partial<ProjectItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;

    const next = [...items];
    const [movedItem] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, movedItem);
    onChange(next);
  };

  return (
    <div className="grid gap-4">
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-5 text-sm text-zinc-500">
          Кейсов пока нет. Добавьте первый кейс.
        </div>
      ) : null}

      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="grid gap-4">
          {(() => {
            const missingFields = getProjectCardMissingFields(item);

            if (missingFields.length === 0) {
              return null;
            }

            return (
              <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Для карточки кейса заполните: {missingFields.join(", ")}.
                Поля для попапа можно оставить пустыми.
              </div>
            );
          })()}

          <div className="grid gap-4 rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-zinc-50 px-4 py-3">
              <div>
                <div className="text-sm font-semibold text-zinc-800">Кейс {index + 1}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {item.title || "Без названия"}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => moveItem(index, index - 1)}
                  disabled={index === 0}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-sm font-medium text-zinc-700 disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, index + 1)}
                  disabled={index === items.length - 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-sm font-medium text-zinc-700 disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange(items.filter((_, currentIndex) => currentIndex !== index))
                  }
                  className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-200 px-4 text-sm font-medium text-zinc-700"
                >
                  Удалить кейс
                </button>
              </div>
            </div>

            <Field
              label="Заголовок"
              value={item.title}
              onChange={(value) => updateItem(index, { title: value })}
            />
            <Field
              label="Локация"
              value={item.location}
              onChange={(value) => updateItem(index, { location: value })}
            />
            <Field
              label="Alt для главного фото"
              value={item.imageAlt}
              onChange={(value) => updateItem(index, { imageAlt: value })}
            />

            <div className="grid gap-3 md:grid-cols-3">
              <Field
                label="Цена"
                value={item.price}
                onChange={(value) => updateItem(index, { price: value })}
              />
              <Field
                label="Срок"
                value={item.duration}
                onChange={(value) => updateItem(index, { duration: value })}
              />
              <Field
                label="Формат"
                value={item.format}
                onChange={(value) => updateItem(index, { format: value })}
              />
            </div>

            <GalleryEditor
              images={item.gallery}
              onChange={(gallery) =>
                updateItem(index, {
                  gallery,
                  image: gallery[0] ?? item.image,
                })
              }
            />

            <TextareaField
              label="Что сделали в карточке"
              value={item.scope}
              onChange={(value) => updateItem(index, { scope: value })}
            />
            <TextareaField
              label="Результат"
              value={item.result}
              onChange={(value) => updateItem(index, { result: value })}
            />
            <TextareaField
              label="Текст «О проекте» в попапе"
              value={item.about}
              rows={5}
              onChange={(value) => updateItem(index, { about: value })}
            />
            <ListEditor
              label="Пункты «Что сделали» в попапе"
              items={item.workItems}
              onChange={(value) => updateItem(index, { workItems: value })}
            />
            <Field
              label="Подпись владельца"
              value={item.ownerLine}
              onChange={(value) => updateItem(index, { ownerLine: value })}
            />
          </div>

          {index < items.length - 1 ? <SectionDivider /> : null}
        </div>
      ))}

      <div className="flex flex-wrap justify-start gap-3">
        <button
          type="button"
          onClick={() => onChange([...items, createEmptyProject()])}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#ab8453] px-5 text-sm font-medium text-white"
        >
          Добавить кейс
        </button>
        <button
          type="button"
          onClick={() => {
            if (items.length === 0) {
              onChange([createEmptyProject()]);
              return;
            }

            const lastItem = items[items.length - 1];
            onChange([
              ...items,
              {
                ...lastItem,
                gallery: [...lastItem.gallery],
                workItems: [...lastItem.workItems],
              },
            ]);
          }}
          className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-medium text-zinc-700"
        >
          Дублировать последний
        </button>
      </div>
    </div>
  );
}

function TestimonialsEditor({
  items,
  onChange,
}: {
  items: TestimonialItem[];
  onChange: (items: TestimonialItem[]) => void;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="grid gap-3 rounded-2xl bg-zinc-50 p-4"
        >
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_100px]">
            <Field
              label="Имя"
              value={item.name}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], name: value };
                onChange(next);
              }}
            />
            <Field
              label="Объект"
              value={item.object}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], object: value };
                onChange(next);
              }}
            />
            <Field
              label="Инициал"
              value={item.initial}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], initial: value };
                onChange(next);
              }}
            />
          </div>
          <TextareaField
            label="Отзыв"
            value={item.quote}
            rows={5}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], quote: value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function QuizQuestionsEditor({
  items,
  onChange,
}: {
  items: QuizQuestion[];
  onChange: (items: QuizQuestion[]) => void;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={item.id} className="grid gap-3 rounded-2xl bg-zinc-50 p-4">
          <Field
            label={`Вопрос ${index + 1}: id`}
            value={item.id}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], id: value };
              onChange(next);
            }}
          />
          <Field
            label="Заголовок вопроса"
            value={item.title}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], title: value };
              onChange(next);
            }}
          />
          <ListEditor
            label="Опции"
            items={item.options}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], options: value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function SectionForm({
  activeSection,
  content,
  onChange,
}: SectionFormProps) {
  const updateContent = (nextContent: SiteContent) => onChange(nextContent);

  if (activeSection === "hero") {
    return (
      <Card title="Первый экран">
        <Field
          label="Бейдж"
          value={content.hero.badge}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, badge: value } })
          }
        />
        <Field
          label="Заголовок"
          value={content.hero.title}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, title: value } })
          }
        />
        <TextareaField
          label="Описание"
          value={content.hero.description}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, description: value } })
          }
        />
        <ListEditor
          label="Повторяющееся предложение"
          items={content.hero.repeatedOffer}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, repeatedOffer: value } })
          }
        />
        <div className="grid gap-3 rounded-2xl bg-zinc-50 p-4 md:grid-cols-3">
          <Field
            label="Строка бейджа цены 1"
            value={content.hero.priceBadge.line1}
            onChange={(value) =>
              updateContent({
                ...content,
                hero: {
                  ...content.hero,
                  priceBadge: { ...content.hero.priceBadge, line1: value },
                },
              })
            }
          />
          <Field
            label="Строка бейджа цены 2"
            value={content.hero.priceBadge.line2}
            onChange={(value) =>
              updateContent({
                ...content,
                hero: {
                  ...content.hero,
                  priceBadge: { ...content.hero.priceBadge, line2: value },
                },
              })
            }
          />
          <Field
            label="Строка бейджа цены 3"
            value={content.hero.priceBadge.line3}
            onChange={(value) =>
              updateContent({
                ...content,
                hero: {
                  ...content.hero,
                  priceBadge: { ...content.hero.priceBadge, line3: value },
                },
              })
            }
          />
        </div>
      </Card>
    );
  }

  if (activeSection === "benefits") {
    return (
      <Card title="Преимущества">
        <Field
          label="Заголовок"
          value={content.benefits.title}
          onChange={(value) =>
            updateContent({ ...content, benefits: { ...content.benefits, title: value } })
          }
        />
        <TextareaField
          label="Описание"
          value={content.benefits.description}
          onChange={(value) =>
            updateContent({
              ...content,
              benefits: { ...content.benefits, description: value },
            })
          }
        />
        <BenefitEditor
          items={content.benefits.items}
          onChange={(value) =>
            updateContent({ ...content, benefits: { ...content.benefits, items: value } })
          }
        />
      </Card>
    );
  }

  if (activeSection === "leadMagnet") {
    return (
      <Card title="После заявки">
        <Field
          label="Заголовок"
          value={content.leadMagnet.title}
          onChange={(value) =>
            updateContent({
              ...content,
              leadMagnet: { ...content.leadMagnet, title: value },
            })
          }
        />
        <TextareaField
          label="Описание"
          value={content.leadMagnet.description}
          onChange={(value) =>
            updateContent({
              ...content,
              leadMagnet: { ...content.leadMagnet, description: value },
            })
          }
        />
        <ListEditor
          label="Пункты"
          items={content.leadMagnet.items}
          onChange={(value) =>
            updateContent({
              ...content,
              leadMagnet: { ...content.leadMagnet, items: value },
            })
          }
        />
      </Card>
    );
  }

  if (activeSection === "quiz") {
    return (
      <Card title="Квиз">
        <Field
          label="Заголовок"
          value={content.quiz.title}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, title: value } })
          }
        />
        <TextareaField
          label="Описание"
          value={content.quiz.description}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, description: value } })
          }
        />
        <ListEditor
          label="Преимущества"
          items={content.quiz.benefits}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, benefits: value } })
          }
        />
        <QuizQuestionsEditor
          items={content.quiz.questions}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, questions: value } })
          }
        />
      </Card>
    );
  }

  if (activeSection === "projects") {
    return (
      <div className="grid gap-6">
        <Card title="Кейсы">
          <Field
            label="Заголовок секции"
            value={content.projects.title}
            onChange={(value) =>
              updateContent({
                ...content,
                projects: { ...content.projects, title: value },
              })
            }
          />
          <TextareaField
            label="Описание секции"
            value={content.projects.description}
            onChange={(value) =>
              updateContent({
                ...content,
                projects: { ...content.projects, description: value },
              })
            }
          />
        </Card>

        <Card title="Карточки кейсов">
          <CasesEditor
            items={content.projects.items}
            onChange={(value) =>
              updateContent({
                ...content,
                projects: { ...content.projects, items: value },
              })
            }
          />
        </Card>
      </div>
    );
  }

  if (activeSection === "testimonials") {
    return (
      <Card title="Отзывы">
        <Field
          label="Заголовок"
          value={content.testimonials.title}
          onChange={(value) =>
            updateContent({
              ...content,
              testimonials: { ...content.testimonials, title: value },
            })
          }
        />
        <TextareaField
          label="Описание"
          value={content.testimonials.description}
          onChange={(value) =>
            updateContent({
              ...content,
              testimonials: { ...content.testimonials, description: value },
            })
          }
        />
        <TestimonialsEditor
          items={content.testimonials.items}
          onChange={(value) =>
            updateContent({
              ...content,
              testimonials: { ...content.testimonials, items: value },
            })
          }
        />
      </Card>
    );
  }

  if (activeSection === "contacts") {
    return (
      <Card title="Контакты">
        <Field
          label="Заголовок секции"
          value={content.contacts.title}
          onChange={(value) =>
            updateContent({ ...content, contacts: { ...content.contacts, title: value } })
          }
        />
        <TextareaField
          label="Описание секции"
          value={content.contacts.description}
          onChange={(value) =>
            updateContent({
              ...content,
              contacts: { ...content.contacts, description: value },
            })
          }
        />
        <ListEditor
          label="Пункты секции"
          items={content.contacts.items}
          onChange={(value) =>
            updateContent({ ...content, contacts: { ...content.contacts, items: value } })
          }
        />
        <div className="grid gap-3 rounded-2xl bg-zinc-50 p-4 md:grid-cols-2">
          <Field
            label="Телефон"
            value={content.contact.phone}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, phone: value } })
            }
          />
          <Field
            label="График"
            value={content.contact.schedule}
            onChange={(value) =>
              updateContent({
                ...content,
                contact: { ...content.contact, schedule: value },
              })
            }
          />
          <Field
            label="Подпись WhatsApp"
            value={content.contact.whatsappLabel}
            onChange={(value) =>
              updateContent({
                ...content,
                contact: { ...content.contact, whatsappLabel: value },
              })
            }
          />
          <Field
            label="Подпись Telegram"
            value={content.contact.telegramLabel}
            onChange={(value) =>
              updateContent({
                ...content,
                contact: { ...content.contact, telegramLabel: value },
              })
            }
          />
          <Field
            label="Подпись MAX"
            value={content.contact.maxLabel}
            onChange={(value) =>
              updateContent({
                ...content,
                contact: { ...content.contact, maxLabel: value },
              })
            }
          />
          <Field
            label="Email"
            value={content.contact.email}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, email: value } })
            }
          />
          <TextareaField
            label="Офис"
            value={content.contact.office}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, office: value } })
            }
          />
        </div>
      </Card>
    );
  }

  return (
    <Card title="Подвал">
      <Field
        label="Подзаголовок"
        value={content.footer.subtitle}
        onChange={(value) =>
          updateContent({ ...content, footer: { ...content.footer, subtitle: value } })
        }
      />
      <Field
        label="Текст ссылки на политику"
        value={content.footer.policyLabel}
        onChange={(value) =>
          updateContent({ ...content, footer: { ...content.footer, policyLabel: value } })
        }
      />
      <Field
        label="Ссылка на политику"
        value={content.footer.policyHref}
        onChange={(value) =>
          updateContent({ ...content, footer: { ...content.footer, policyHref: value } })
        }
      />
    </Card>
  );
}

