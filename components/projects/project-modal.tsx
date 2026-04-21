"use client";

import { SuccessGameModal } from "@/components/modals/success-game-modal";
import { useModalPresence } from "@/components/modals/use-modal-presence";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type ProjectModalProject = {
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  price: string;
  duration: string;
  format: string;
  scope: string;
  result: string;
  about: string;
  workItems: string[];
  ownerLine: string;
  gallery: string[];
};

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModalProject | null;
  onPrevProject: () => void;
  onNextProject: () => void;
};

const facts = [
  {
    title: "Сдали в срок",
    value: "45 дней",
    iconSrc: "/images/projects/icon-duration.svg",
  },
  {
    title: "Смета соблюдена",
    value: "1 250 000 ₽",
    iconSrc: "/images/projects/icon-price.svg",
  },
  {
    title: "Гарантия",
    value: "5 лет",
    iconSrc: "/trust-guarantee.svg",
  },
  {
    title: "Без доплат",
    value: "по договору",
    iconSrc: "/trust-check.svg",
  },
];

export function ProjectModal({
  isOpen,
  onClose,
  project,
  onPrevProject,
  onNextProject,
}: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { shouldRender, isVisible } = useModalPresence(isOpen);
  const totalSlides =
    project?.gallery.length && project.gallery.length > 0 ? project.gallery.length : 1;
  const canSubmitEstimate = useMemo(
    () => phone.replace(/\D/g, "").length >= 10,
    [phone]
  );

  useEffect(() => {
    if (!shouldRender) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isGalleryOpen) {
          setIsGalleryOpen(false);
        } else {
          onClose();
        }
      }

      if (event.key === "ArrowLeft") {
        if (isGalleryOpen) {
          setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
        } else {
          onPrevProject();
        }
      }

      if (event.key === "ArrowRight") {
        if (isGalleryOpen) {
          setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        } else {
          onNextProject();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [shouldRender, onClose, onPrevProject, onNextProject, isGalleryOpen, totalSlides]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setCurrentSlide(0);
      setIsGalleryOpen(false);
      setPhone("");
      setSubmitted(false);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [project, isOpen]);

  const handleSuccessClose = () => {
    setSubmitted(false);
    setPhone("");
    onClose();
  };

  if (!shouldRender || !project) return null;

  if (submitted) {
    return <SuccessGameModal isOpen={isOpen} onClose={handleSuccessClose} />;
  }

  const thumbs = project.gallery.filter(Boolean);
  const fallbackImage = project.image || null;
  const galleryImages = thumbs.length > 0 ? thumbs : fallbackImage ? [fallbackImage] : [];
  const activeImage = galleryImages[currentSlide] ?? galleryImages[0] ?? null;
  const displayedFacts = [
    { ...facts[0], value: project.duration },
    { ...facts[1], value: project.price },
    facts[2],
    facts[3],
  ];

  const goPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleEstimateSubmit = () => {
    if (!canSubmitEstimate) return;

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto bg-black/45 backdrop-blur-[2px]">
      <button
        aria-label="Закрыть модальное окно"
        className={`fixed inset-0 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <button
        type="button"
        aria-label="Предыдущий кейс"
        onClick={onPrevProject}
        className="absolute left-4 top-1/2 z-[110] hidden h-[68px] w-[68px] -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[42px] leading-none text-[#3d3d3d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-white min-[1300px]:left-[28px] min-[1300px]:inline-flex"
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Следующий кейс"
        onClick={onNextProject}
        className="absolute right-4 top-1/2 z-[110] hidden h-[68px] w-[68px] -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[42px] leading-none text-[#3d3d3d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-white min-[1300px]:right-[28px] min-[1300px]:inline-flex"
      >
        ›
      </button>

      <div className="relative flex min-h-full items-start justify-center px-3 py-3 min-[360px]:px-4 min-[360px]:py-4 min-[1300px]:items-center min-[1300px]:px-6 min-[1300px]:py-6">
        <div
          className={`relative w-full max-w-[1390px] overflow-x-hidden rounded-[24px] bg-[#f7f7f7] shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-[opacity,transform] duration-200 sm:rounded-[26px] min-[1300px]:w-[1390px] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
          }`}
        >
          <button
            aria-label="Закрыть"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ececec] text-[24px] leading-none text-[#4a4a4a] transition hover:bg-[#e4e4e4] sm:right-5 sm:top-5 sm:h-11 sm:w-11 sm:text-[26px] min-[1300px]:right-[26px] min-[1300px]:top-[22px] min-[1300px]:h-[52px] min-[1300px]:w-[52px] min-[1300px]:text-[28px]"
          >
            ×
          </button>

          <div className="grid gap-6 px-4 pb-5 pt-14 sm:px-5 sm:pb-6 sm:pt-16 md:gap-7 md:px-6 md:pb-7 min-[1300px]:grid-cols-[706px_1fr] min-[1300px]:gap-[44px] min-[1300px]:px-[40px] min-[1300px]:pb-[26px] min-[1300px]:pt-[38px]">
            <div className="min-w-0">
              <div className="relative h-[220px] overflow-hidden rounded-[22px] bg-white sm:h-[280px] md:h-[340px] min-[1300px]:h-[362px] min-[1300px]:rounded-[28px]">
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(true)}
                  className="group absolute inset-0 z-[1] block"
                  aria-label="Открыть галерею проекта"
                >
                  {activeImage ? (
                    <Image
                      src={activeImage}
                      alt={project.imageAlt || project.title || "Изображение проекта"}
                      fill
                      className="object-cover transition duration-200 group-hover:scale-[1.02]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/18" />
                  <div className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-[22px] text-[#3c3c3c] opacity-0 shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition group-hover:opacity-100 sm:right-4 sm:top-4">
                    ⌕
                  </div>
                </button>

                {galleryImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[28px] text-[#3c3c3c] shadow-[0_6px_18px_rgba(0,0,0,0.12)] sm:left-4 sm:h-11 sm:w-11 sm:text-[30px] min-[1300px]:left-[18px] min-[1300px]:h-[52px] min-[1300px]:w-[52px] min-[1300px]:text-[34px]"
                      onClick={goPrevSlide}
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[28px] text-[#3c3c3c] shadow-[0_6px_18px_rgba(0,0,0,0.12)] sm:right-4 sm:h-11 sm:w-11 sm:text-[30px] min-[1300px]:right-[18px] min-[1300px]:h-[52px] min-[1300px]:w-[52px] min-[1300px]:text-[34px]"
                      onClick={goNextSlide}
                    >
                      ›
                    </button>
                  </>
                ) : null}

                <div className="absolute bottom-3 left-3 rounded-[14px] bg-black/55 px-3 py-2 text-[13px] font-semibold text-white sm:bottom-4 sm:left-4 sm:text-[14px] min-[1300px]:bottom-[16px] min-[1300px]:left-[18px] min-[1300px]:px-[14px] min-[1300px]:py-[8px] min-[1300px]:text-[16px]">
                  {galleryImages.length > 0 ? currentSlide + 1 : 0} / {galleryImages.length}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 min-[1300px]:mt-[18px] min-[1300px]:flex min-[1300px]:flex-wrap min-[1300px]:gap-[12px]">
                {galleryImages.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`relative h-[74px] min-w-0 overflow-hidden rounded-[16px] border bg-white sm:h-[84px] min-[1300px]:h-[92px] min-[1300px]:w-[130px] min-[1300px]:shrink-0 min-[1300px]:rounded-[18px] ${
                      index === currentSlide
                        ? "border-[2px] border-[#c59b5b]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Миниатюра ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-5 min-[1300px]:mt-[24px]">
                <h3 className="text-[22px] font-extrabold leading-[1.15] text-[#343434] min-[1300px]:text-[24px]">
                  О проекте
                </h3>

                <p className="mt-3 max-w-[650px] text-[15px] leading-[1.45] text-[#555555] sm:text-[17px] min-[1300px]:mt-[14px] min-[1300px]:text-[18px]">
                  {project.about}
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 min-[1300px]:mt-[24px] min-[1300px]:grid-cols-4 min-[1300px]:gap-[12px]">
                  {displayedFacts.map((fact) => (
                    <div
                      key={fact.title}
                      className="flex min-h-[72px] min-w-0 items-start gap-3 rounded-[18px] border border-[#dddddd] bg-white px-4 py-4 min-[1300px]:min-h-[74px] min-[1300px]:px-[18px] min-[1300px]:py-[16px]"
                    >
                      <span className="mt-[2px] flex min-w-[24px] items-center justify-center">
                        <Image
                          src={fact.iconSrc}
                          alt=""
                          width={26}
                          height={26}
                          className="h-[24px] w-[24px] object-contain min-[1300px]:h-[26px] min-[1300px]:w-[26px]"
                          aria-hidden="true"
                        />
                      </span>

                      <div className="min-w-0">
                        <div className="text-[15px] font-bold leading-[1.15] text-[#3a3a3a] min-[1300px]:text-[16px]">
                          {fact.title}
                        </div>
                        <div className="mt-1.5 break-words text-[14px] leading-[1.2] text-[#666666] min-[1300px]:mt-[6px] min-[1300px]:text-[15px]">
                          {fact.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-w-0 pt-0 min-[1300px]:pt-[6px]">
              <h2 className="break-words text-[22px] font-extrabold leading-[1.1] text-[#3a3a3a] sm:text-[24px] min-[1300px]:text-[25px]">
                {project.title}
              </h2>

              <p className="mt-2 break-words text-[16px] leading-[1.25] text-[#646464] sm:text-[17px] min-[1300px]:mt-[10px] min-[1300px]:text-[18px]">
                {project.location}
              </p>

              <div className="mt-5 border-t border-[#dddddd] min-[1300px]:mt-[26px]">
                <TopInfoRow
                  iconSrc="/images/projects/icon-price.svg"
                  label="Стоимость:"
                  value={project.price}
                />
                <TopInfoRow
                  iconSrc="/images/projects/icon-duration.svg"
                  label="Срок:"
                  value={project.duration}
                />
                <TopInfoRow
                  iconSrc="/images/projects/icon-format.svg"
                  label="Формат:"
                  value={project.format}
                />
              </div>

              <div className="mt-5 min-[1300px]:mt-[24px]">
                <h3 className="text-[18px] font-extrabold leading-[1.15] text-[#343434] min-[1300px]:text-[20px]">
                  Что сделали:
                </h3>

                <ul className="mt-4 space-y-4 min-[1300px]:mt-[22px] min-[1300px]:space-y-[18px]">
                  {project.workItems.map((item) => (
                    <li
                      key={item}
                      className="flex min-w-0 items-start gap-3 min-[1300px]:gap-[16px]"
                    >
                      <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#be995a] text-[13px] font-bold text-white min-[1300px]:h-[24px] min-[1300px]:w-[24px] min-[1300px]:text-[15px]">
                        ✓
                      </span>
                      <span className="min-w-0 break-words text-[15px] leading-[1.35] text-[#585858] min-[1300px]:text-[16px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-[20px] bg-[#efebe6] px-5 py-5 min-[1300px]:mt-[34px] min-[1300px]:px-[28px] min-[1300px]:py-[24px]">
                <div className="flex min-w-0 items-start gap-4 min-[1300px]:gap-[16px]">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#be995a] text-[16px] font-bold text-white min-[1300px]:h-[34px] min-[1300px]:w-[34px] min-[1300px]:text-[20px]">
                    ✓
                  </span>

                  <div className="min-w-0">
                    <div className="break-words text-[16px] font-extrabold leading-[1.25] text-[#3c3c3c] sm:text-[17px] min-[1300px]:text-[18px] min-[1300px]:leading-[1.2]">
                      {project.result}
                    </div>
                    <div className="mt-2 break-words text-[15px] leading-[1.3] text-[#6a6a6a] min-[1300px]:mt-[10px] min-[1300px]:text-[17px] min-[1300px]:leading-[1.25]">
                      — {project.ownerLine}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d9d9d9] bg-[#f7f7f7] px-4 py-5 sm:px-5 sm:py-6 md:px-6 min-[1300px]:px-[40px] min-[1300px]:py-[26px]">
            <div className="grid gap-5 min-[1300px]:grid-cols-[1fr_760px] min-[1300px]:items-start min-[1300px]:gap-[26px]">
              <div className="min-w-0 pt-0 min-[1300px]:pt-[4px]">
                <div className="text-[20px] font-extrabold leading-[1.15] text-[#3a3a3a] min-[1300px]:text-[24px]">
                  Хотите похожий результат?
                </div>
                <div className="mt-3 max-w-[360px] text-[15px] leading-[1.35] text-[#666666] sm:text-[17px] min-[1300px]:mt-[12px] min-[1300px]:text-[18px]">
                  Получите точный расчёт стоимости и сроков для вашего объекта
                </div>
              </div>

              <div className="min-w-0">
                <div className="grid grid-cols-1 gap-3 min-[1300px]:grid-cols-[1fr_392px] min-[1300px]:gap-[18px]">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="h-[56px] w-full min-w-0 rounded-full border border-[#d9d9d9] bg-white px-5 text-[16px] text-[#444444] outline-none placeholder:text-[#8e8e8e] transition-colors focus:border-[#be995a] sm:h-[60px] sm:px-6 sm:text-[17px] min-[1300px]:h-[66px] min-[1300px]:px-[26px] min-[1300px]:text-[20px]"
                  />

                  <button
                    type="button"
                    onClick={handleEstimateSubmit}
                    disabled={!canSubmitEstimate}
                    className="h-[56px] w-full rounded-full bg-[#be995a] px-5 text-[15px] font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:bg-[#d6cec2] sm:h-[60px] sm:text-[16px] min-[1300px]:h-[66px] min-[1300px]:px-[28px] min-[1300px]:text-[18px]"
                  >
                    Получить расчёт за 24 часа
                  </button>
                </div>

                {submitted ? (
                  <div className="mt-3 rounded-[20px] bg-white px-5 py-5 text-left shadow-[0_12px_28px_rgba(0,0,0,0.06)] min-[1300px]:px-6 min-[1300px]:py-6">
                    <div className="text-[18px] font-extrabold leading-[1.2] text-[#3a3a3a] min-[1300px]:text-[20px]">
                      Заявка отправлена
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.4] text-[#666666] sm:text-[15px] min-[1300px]:text-[16px]">
                      Мы свяжемся с вами в ближайшее время и подготовим расчет по этому проекту.
                    </div>
                  </div>
                ) : null}

                <div className="mt-3 text-left text-[13px] leading-[1.35] text-[#666666] sm:text-[14px] min-[1300px]:mt-[14px] min-[1300px]:text-[16px] min-[1300px]:leading-[1.25]">
                  Нажимая кнопку, вы соглашаетесь с
                  <a
                    href="/policy"
                    className="ml-1 text-[#be995a] underline-offset-2 hover:underline"
                  >
                    политикой конфиденциальности
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isGalleryOpen ? (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/90 px-3 py-3 sm:px-6 sm:py-6">
          <button
            type="button"
            aria-label="Закрыть просмотр фото"
            onClick={() => setIsGalleryOpen(false)}
            className="absolute inset-0"
          />

          <div className="relative z-[1] w-full max-w-[1320px]">
            <button
              type="button"
              aria-label="Закрыть просмотр"
              onClick={() => setIsGalleryOpen(false)}
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-[24px] leading-none text-[#3d3d3d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-white sm:right-4 sm:top-4"
            >
              ×
            </button>

            {galleryImages.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Предыдущее фото"
                  onClick={goPrevSlide}
                  className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[30px] leading-none text-[#3d3d3d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-white sm:left-4 sm:h-[54px] sm:w-[54px] sm:text-[36px]"
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Следующее фото"
                  onClick={goNextSlide}
                  className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[30px] leading-none text-[#3d3d3d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-white sm:right-4 sm:h-[54px] sm:w-[54px] sm:text-[36px]"
                >
                  ›
                </button>
              </>
            ) : null}

            <div className="overflow-hidden rounded-[24px] bg-[#111111] px-4 pb-4 pt-14 sm:px-6 sm:pb-6 sm:pt-16">
              <div className="relative h-[48vh] min-h-[320px] overflow-hidden rounded-[20px] bg-black sm:h-[60vh]">
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={project.imageAlt || project.title || "Изображение проекта"}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-[16px] font-medium text-white/70">
                    Фото проекта не загружено
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {galleryImages.map((src, index) => (
                  <button
                    key={`lightbox-${src}-${index}`}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`relative h-[72px] w-[72px] overflow-hidden rounded-[16px] border bg-white/10 sm:h-[88px] sm:w-[88px] ${
                      index === currentSlide
                        ? "border-[2px] border-[#c59b5b]"
                        : "border-white/10"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Фото ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TopInfoRow({
  iconSrc,
  label,
  value,
}: {
  iconSrc?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2 border-b border-[#dddddd] py-4 sm:flex-row sm:items-center sm:justify-between min-[1300px]:py-[18px]">
      <div className="flex min-w-0 items-center gap-3 min-[1300px]:gap-[14px]">
        <span className="flex min-w-[24px] items-center justify-center">
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt=""
              width={22}
              height={22}
              className="h-[20px] w-[20px] object-contain min-[1300px]:h-[22px] min-[1300px]:w-[22px]"
              aria-hidden="true"
            />
          ) : null}
        </span>
        <span className="text-[16px] font-extrabold text-[#3d3d3d] min-[1300px]:text-[18px]">
          {label}
        </span>
      </div>

      <span className="break-words pl-8 text-[15px] text-[#4f4f4f] sm:pl-0 min-[1300px]:text-[17px]">
        {value}
      </span>
    </div>
  );
}
