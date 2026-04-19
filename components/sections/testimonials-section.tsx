"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

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

const SWIPE_THRESHOLD = 60;

export function TestimonialsSection() {
  const [platform, setPlatform] = useState<"avito" | "yandex">("avito");
  const [page, setPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const swipeStartXRef = useRef<number | null>(null);
  const swipePointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setVisibleCount(2);
        return;
      }

      setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const reviews = useMemo(
    () => (platform === "avito" ? avitoReviews : yandexReviews),
    [platform]
  );

  const totalPages = Math.max(1, reviews.length - visibleCount + 1);
  const currentPage = Math.min(page, totalPages - 1);
  const visibleReviews = reviews.slice(currentPage, currentPage + visibleCount);

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
    setIsDragging(false);
  };

  const handleSwipeStart = (clientX: number, pointerId?: number) => {
    swipeStartXRef.current = clientX;
    swipePointerIdRef.current = pointerId ?? null;
    setDragOffset(0);
    setIsDragging(true);
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
    setIsDragging(false);
    swipeStartXRef.current = null;
    swipePointerIdRef.current = null;
  };

  return (
    <section className="bg-[#f3f3f3] py-8 md:py-12 lg:py-14 xl:py-[72px]">
      <div className="mx-auto max-w-[1280px] px-3 min-[360px]:px-4 md:px-6 xl:px-0">
        <div className="text-center">
          <div className="inline-flex items-start gap-3 min-[360px]:gap-4">
            <h2 className="text-[25px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black sm:text-[25px] md:text-[44px] lg:text-[42px] xl:text-[45px]">
              Что говорят клиенты после ремонта
            </h2>

            <Image
              src="/images/icons/thumbs-up-review.svg"
              alt=""
              width={40}
              height={40}
              className="mt-[4px] hidden h-[28px] w-[28px] shrink-0 xl:block xl:h-[40px] xl:w-[40px]"
              aria-hidden="true"
            />
          </div>

          <p className="mx-auto mt-4 max-w-[900px] text-[16px] leading-[1.36] text-black min-[360px]:text-[17px] min-[390px]:text-[18px] sm:mt-5 sm:text-[18px] md:mt-6 md:text-[19px] lg:text-[18px] xl:mt-[22px] xl:text-[20px] xl:leading-[1.3]">
            Реальные отзывы о сроках, смете, процессе работ и результате.
          </p>

          <div className="mt-5 flex justify-center sm:mt-6 md:mt-8 xl:mt-[34px]">
            <div className="flex w-full max-w-[460px] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4 xl:gap-[15px]">
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

        <div className="mt-8 xl:mt-[48px]">
          <div className="hidden items-center gap-[18px] xl:flex">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="inline-flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full bg-white text-[44px] leading-none text-[#b18b52] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Предыдущие отзывы"
            >
              ‹
            </button>

            <ReviewsTrack
              visibleReviews={visibleReviews}
              dragOffset={dragOffset}
              isDragging={isDragging}
              onPointerDown={handleSwipeStart}
              onPointerMove={handleSwipeMove}
              onPointerEnd={handleSwipeEnd}
              swipePointerIdRef={swipePointerIdRef}
              className="grid flex-1 grid-cols-3 gap-[25px] touch-pan-y select-none"
              cardClassName="min-h-[452px] rounded-[28px] border border-[#dddddd] bg-[#f7f7f7] px-[28px] pb-[28px] pt-[28px]"
            />

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="inline-flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full bg-white text-[44px] leading-none text-[#b18b52] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Следующие отзывы"
            >
              ›
            </button>
          </div>

          <ReviewsTrack
            visibleReviews={visibleReviews}
            dragOffset={dragOffset}
            isDragging={isDragging}
            onPointerDown={handleSwipeStart}
            onPointerMove={handleSwipeMove}
            onPointerEnd={handleSwipeEnd}
            swipePointerIdRef={swipePointerIdRef}
            className="grid gap-4 touch-pan-y select-none md:grid-cols-2 md:gap-5 xl:hidden"
            cardClassName="min-h-[300px] rounded-[24px] border border-[#dddddd] bg-[#f7f7f7] px-4 pb-4 pt-4 min-[360px]:px-5 min-[360px]:pb-5 min-[360px]:pt-5 sm:min-h-[320px] sm:px-6 sm:pb-6 sm:pt-6 md:min-h-[360px]"
            compact
          />

          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-5 md:mt-6 xl:hidden">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white text-[26px] leading-none text-[#b18b52] shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition disabled:cursor-not-allowed disabled:opacity-45 min-[360px]:h-[50px] min-[360px]:w-[50px]"
              aria-label="Предыдущие отзывы"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white text-[26px] leading-none text-[#b18b52] shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition disabled:cursor-not-allowed disabled:opacity-45 min-[360px]:h-[50px] min-[360px]:w-[50px]"
              aria-label="Следующие отзывы"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3 md:mt-8 xl:mt-[34px] xl:gap-[14px]">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              className={`h-[12px] w-[12px] rounded-full transition ${
                index === currentPage ? "bg-[#be995a]" : "bg-[#d6d6d6]"
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsTrack({
  visibleReviews,
  dragOffset,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
  swipePointerIdRef,
  className,
  cardClassName,
  compact = false,
}: {
  visibleReviews: ReviewItem[];
  dragOffset: number;
  isDragging: boolean;
  onPointerDown: (clientX: number, pointerId?: number) => void;
  onPointerMove: (clientX: number) => void;
  onPointerEnd: () => void;
  swipePointerIdRef: React.MutableRefObject<number | null>;
  className: string;
  cardClassName: string;
  compact?: boolean;
}) {
  return (
    <div
      className={className}
      style={{
        transform: `translateX(${dragOffset}px)`,
        transition: isDragging ? "none" : "transform 0.28s ease",
      }}
      onPointerDown={(event) => {
        onPointerDown(event.clientX, event.pointerId);
        if (typeof event.currentTarget.setPointerCapture === "function") {
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            // Safari on iPhone can reject pointer capture for touch input.
          }
        }
      }}
      onPointerMove={(event) => {
        if (swipePointerIdRef.current !== event.pointerId) {
          return;
        }

        onPointerMove(event.clientX);
      }}
      onPointerUp={(event) => {
        if (
          swipePointerIdRef.current === event.pointerId &&
          typeof event.currentTarget.releasePointerCapture === "function"
        ) {
          try {
            event.currentTarget.releasePointerCapture(event.pointerId);
          } catch {
            // Ignore unsupported or already-released pointer capture states.
          }
        }

        onPointerEnd();
      }}
      onPointerCancel={onPointerEnd}
      onPointerLeave={(event) => {
        if (swipePointerIdRef.current === null) {
          return;
        }

        if (swipePointerIdRef.current === event.pointerId) {
          onPointerEnd();
        }
      }}
    >
      {visibleReviews.map((review) => (
        <article key={review.id} className={cardClassName}>
          <ReviewCard review={review} compact={compact} />
        </article>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  compact = false,
}: {
  review: ReviewItem;
  compact?: boolean;
}) {
  return (
    <>
      <div className="flex items-start gap-[10px] min-[360px]:gap-3">
        <span
          className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full text-[18px] font-bold text-white min-[360px]:h-[45px] min-[360px]:w-[45px] min-[360px]:text-[20px]"
          style={{ backgroundColor: review.initialBg }}
        >
          {review.initial}
        </span>

        <div className="min-w-0 pt-[4px]">
          <div
            className={`font-semibold leading-[1.18] text-black ${
              compact ? "text-[16px] min-[360px]:text-[17px] md:text-[18px]" : "text-[17px]"
            }`}
          >
            {review.author}
          </div>
          <div
            className={`mt-[6px] leading-[1.2] text-[#333333] ${
              compact ? "text-[14px] min-[360px]:text-[15px] md:text-[16px]" : "text-[16px]"
            }`}
          >
            {review.subtitle}
          </div>
        </div>
      </div>

      <div
        className={`mt-4 leading-none tracking-[3px] text-[#e1bf10] min-[360px]:mt-5 ${
          compact ? "text-[24px] md:text-[26px]" : "text-[28px]"
        }`}
      >
        ★★★★★
      </div>

      <p
        className={`mt-4 text-black min-[360px]:mt-5 ${
          compact
            ? "text-[15px] leading-[1.5] min-[360px]:text-[16px] md:text-[17px]"
            : "text-[16px] leading-[1.48]"
        }`}
      >
        {review.text}
      </p>
    </>
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
      className={`inline-flex min-h-[50px] w-full items-center justify-center gap-[7px] rounded-full border px-5 py-3 text-[16px] font-semibold transition sm:w-auto sm:px-6 ${
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
