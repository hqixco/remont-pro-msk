"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";

type ReviewItem = {
  id: string;
  author: string;
  subtitle: string;
  initial: string;
  initialBg: string;
  text: string;
};

const avitoReviews: ReviewItem[] = [
  {
    id: "avito-1",
    author: "Семья Кузнецовых",
    subtitle: "квартира во вторичке, 74 м²",
    initial: "C",
    initialBg: "#6f8498",
    text:
      "Понравилось, что все договорённости были понятны заранее: стоимость, этапы работ, порядок оплаты. Не было ощущения, что нас торопят или что-то навязывают. По итогу получили аккуратный, качественный ремонт и нормальную коммуникацию на всех этапах.",
  },
  {
    id: "avito-2",
    author: "Алексей К.",
    subtitle: "квартира в новостройке, 54 м²",
    initial: "A",
    initialBg: "#e0ad53",
    text:
      "Для нас критично было закончить ремонт до переезда. На старте дали понятный план работ и сроки по этапам. По ходу ремонта команда держала связь, а сам процесс шёл организованно. Объект сдали вовремя, без затяжек, и это для нас было одним из главных плюсов.",
  },
  {
    id: "avito-3",
    author: "Елена",
    subtitle: "3-комнатная квартира, 92 м²",
    initial: "E",
    initialBg: "#8a83f1",
    text:
      "Мы не могли постоянно приезжать на объект, поэтому было важно понимать, что происходит без нашего участия. Все вопросы решались быстро, прораб был на связи, регулярно отправляли фото и видео. Это сильно снизило стресс во время ремонта. В итоге весь процесс оказался гораздо спокойнее, чем мы ожидали.",
  },
  {
    id: "avito-4",
    author: "Мария Смирнова",
    subtitle: "2-комнатная квартира, 68 м²",
    initial: "M",
    initialBg: "#c98a68",
    text:
      "Перед началом ремонта больше всего переживали из-за бюджета. Здесь смету подробно расписали заранее, и по ходу работ всё было прозрачно. В итоге уложились в согласованный бюджет.",
  },
  {
    id: "avito-5",
    author: "Дмитрий",
    subtitle: "дом / коттедж, 150 м²",
    initial: "Д",
    initialBg: "#7d9c89",
    text:
      "Оценил, что работы принимались по этапам и не пришлось спорить по мелочам. Всё было структурно и спокойно.",
  },
];

const yandexReviews: ReviewItem[] = [
  {
    id: "yandex-1",
    author: "Анна Л.",
    subtitle: "квартира, 61 м²",
    initial: "A",
    initialBg: "#e0ad53",
    text:
      "Команда сработала организованно, без хаоса. Особенно понравилось, что сроки и смета обсуждались подробно ещё до начала работ.",
  },
  {
    id: "yandex-2",
    author: "Игорь",
    subtitle: "новостройка, 80 м²",
    initial: "И",
    initialBg: "#6f8498",
    text:
      "Хорошая коммуникация, фотоотчёты по этапам и понятный итог по бюджету. Было ощущение контроля над процессом.",
  },
  {
    id: "yandex-3",
    author: "Наталья",
    subtitle: "3-комнатная квартира, 96 м²",
    initial: "Н",
    initialBg: "#8a83f1",
    text:
      "Ремонт не растянулся бесконечно, как я боялась. Всё было очень структурировано и спокойно для нас как для заказчиков.",
  },
  {
    id: "yandex-4",
    author: "Павел",
    subtitle: "дом, 140 м²",
    initial: "П",
    initialBg: "#7d9c89",
    text:
      "Понравился подход без лишнего давления и с понятным договором. Работы принимали последовательно, без сюрпризов.",
  },
];

const SLIDES_VISIBLE = 3;
const SWIPE_THRESHOLD = 60;

export function TestimonialsSection() {
  const [platform, setPlatform] = useState<"avito" | "yandex">("avito");
  const [page, setPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const swipeStartXRef = useRef<number | null>(null);
  const swipePointerIdRef = useRef<number | null>(null);

  const reviews = useMemo(
    () => (platform === "avito" ? avitoReviews : yandexReviews),
    [platform]
  );

  const totalPages = Math.max(1, reviews.length - SLIDES_VISIBLE + 1);
  const visibleReviews = reviews.slice(page, page + SLIDES_VISIBLE);

  const handlePrev = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const switchPlatform = (next: "avito" | "yandex") => {
    setPlatform(next);
    setPage(0);
    setDragOffset(0);
  };

  const handleSwipeStart = (clientX: number, pointerId?: number) => {
    swipeStartXRef.current = clientX;
    swipePointerIdRef.current = pointerId ?? null;
    setDragOffset(0);
  };

  const handleSwipeMove = (clientX: number) => {
    if (swipeStartXRef.current === null) {
      return;
    }

    const deltaX = clientX - swipeStartXRef.current;
    const limitedDelta = Math.max(-140, Math.min(140, deltaX));

    setDragOffset(limitedDelta);
  };

  const handleSwipeEnd = () => {
    if (Math.abs(dragOffset) >= SWIPE_THRESHOLD) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    setDragOffset(0);
    swipeStartXRef.current = null;
    swipePointerIdRef.current = null;
  };

  return (
    <section className="bg-[#f3f3f3] py-[72px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center">
          <div className="inline-flex items-start gap-[14px]">
            <h2 className="text-[45px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black">
              Что говорят клиенты после ремонта
            </h2>

            <Image
              src="/images/icons/thumbs-up-review.svg"
              alt=""
              width={40}
              height={40}
              className="mt-[4px] h-[40px] w-[40px] shrink-0"
              aria-hidden="true"
            />
          </div>

          <p className="mx-auto mt-[22px] max-w-[900px] text-[20px] leading-[1.3] text-black">
            Реальные отзывы о сроках, смете, процессе работ и результате.
          </p>

          <div className="mt-[34px] flex justify-center">
            <div className="flex items-center gap-[15px]">
              <PlatformButton
                active={platform === "avito"}
                onClick={() => switchPlatform("avito")}
                icon={
                  <Image
                    src="/images/icons/avito-anons-68.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-[28px] w-[28px] object-contain"
                    aria-hidden="true"
                  />
                }
              >
                Авито
              </PlatformButton>

              <PlatformButton
                active={platform === "yandex"}
                onClick={() => switchPlatform("yandex")}
                icon={
                  <Image
                    src="/images/icons/yandex-maps-68.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-[28px] w-[28px] object-contain"
                    aria-hidden="true"
                  />
                }
              >
                Яндекс Карты
              </PlatformButton>
            </div>
          </div>
        </div>

        <div className="mt-[48px] flex items-center gap-[18px]">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page === 0}
            className="inline-flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full bg-white text-[44px] leading-none text-[#b18b52] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Предыдущие отзывы"
          >
            ‹
          </button>

          <div
            className="grid flex-1 grid-cols-3 gap-[25px] touch-pan-y select-none"
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition:
                swipeStartXRef.current === null
                  ? "transform 0.28s ease"
                  : "none",
            }}
            onPointerDown={(event) => {
              handleSwipeStart(event.clientX, event.pointerId);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (swipePointerIdRef.current !== event.pointerId) {
                return;
              }

              handleSwipeMove(event.clientX);
            }}
            onPointerUp={(event) => {
              if (swipePointerIdRef.current === event.pointerId) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }

              handleSwipeEnd();
            }}
            onPointerCancel={handleSwipeEnd}
            onPointerLeave={(event) => {
              if (swipePointerIdRef.current === null) {
                return;
              }

              if (swipePointerIdRef.current === event.pointerId) {
                handleSwipeEnd();
              }
            }}
          >
            {visibleReviews.map((review) => (
              <article
                key={review.id}
                className="min-h-[452px] rounded-[28px] border border-[#dddddd] bg-[#f7f7f7] px-[28px] pb-[28px] pt-[28px]"
              >
                <div className="flex items-start gap-[10px]">
                  <span
                    className="inline-flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full text-[20px] font-bold text-white"
                    style={{ backgroundColor: review.initialBg }}
                  >
                    {review.initial}
                  </span>

                  <div className="pt-[4px]">
                    <div className="text-[17px] font-semibold leading-[1.18] text-black">
                      {review.author}
                    </div>
                    <div className="mt-[6px] text-[16px] leading-[1.2] text-[#333333]">
                      {review.subtitle}
                    </div>
                  </div>
                </div>

                <div className="mt-[20px] text-[28px] leading-none tracking-[3px] text-[#e1bf10]">
                  ★★★★★
                </div>

                <p className="mt-[20px] text-[16px] leading-[1.48] text-black">
                  {review.text}
                </p>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="inline-flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full bg-white text-[44px] leading-none text-[#b18b52] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Следующие отзывы"
          >
            ›
          </button>
        </div>

        <div className="mt-[34px] flex justify-center gap-[14px]">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              className={`h-[12px] w-[12px] rounded-full transition ${
                index === page ? "bg-[#be995a]" : "bg-[#d6d6d6]"
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformButton({
  active,
  icon,
  children,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-[50px] items-center justify-center gap-[7px] rounded-full border px-[24px] text-[16px] font-semibold transition ${
        active
          ? "border-[#be995a] bg-[#be995a] text-white"
          : "border-[#be995a] bg-white text-black"
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span>{children}</span>
    </button>
  );
}
