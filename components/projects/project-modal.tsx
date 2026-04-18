"use client";

import { EstimateModal } from "@/components/modals/estimate-modal";
import Image from "next/image";
import { useEffect, useState } from "react";

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
};

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModalProject | null;
  onPrevProject: () => void;
  onNextProject: () => void;
};

const fallbackThumbs = [
  "/images/projects/project-1.webp",
  "/images/projects/project-2.webp",
  "/images/projects/project-3.jpeg",
  "/images/projects/project-1.webp",
  "/images/projects/project-2.webp",
];

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
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevProject();
      if (event.key === "ArrowRight") onNextProject();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, onPrevProject, onNextProject]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  const thumbs = [project.image, ...fallbackThumbs.slice(1)];
  const activeImage = thumbs[currentSlide] ?? project.image;
  const displayedFacts = [
    { ...facts[0], value: project.duration },
    { ...facts[1], value: project.price },
    facts[2],
    facts[3],
  ];

  const goPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? thumbs.length - 1 : prev - 1));
  };

  const goNextSlide = () => {
    setCurrentSlide((prev) => (prev === thumbs.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="Закрыть модальное окно"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <button
        type="button"
        aria-label="Предыдущий кейс"
        onClick={onPrevProject}
        className="absolute left-[28px] top-1/2 z-[110] inline-flex h-[68px] w-[68px] -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[42px] leading-none text-[#3d3d3d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-white"
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Следующий кейс"
        onClick={onNextProject}
        className="absolute right-[28px] top-1/2 z-[110] inline-flex h-[68px] w-[68px] -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[42px] leading-none text-[#3d3d3d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-white"
      >
        ›
      </button>

      <div className="absolute left-1/2 top-1/2 w-[1390px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] bg-[#f7f7f7] shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <button
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-[26px] top-[22px] z-20 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#ececec] text-[28px] leading-none text-[#4a4a4a] transition hover:bg-[#e4e4e4]"
        >
          ×
        </button>

        <div className="grid grid-cols-[706px_1fr] gap-[44px] px-[40px] pb-[26px] pt-[38px]">
          <div>
            <div className="relative h-[362px] overflow-hidden rounded-[28px] bg-white">
              <Image
                src={activeImage}
                alt={project.imageAlt}
                fill
                className="object-cover"
              />

              <button
                type="button"
                className="absolute left-[18px] top-1/2 inline-flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[34px] text-[#3c3c3c] shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                onClick={goPrevSlide}
              >
                ‹
              </button>

              <button
                type="button"
                className="absolute right-[18px] top-1/2 inline-flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[34px] text-[#3c3c3c] shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                onClick={goNextSlide}
              >
                ›
              </button>

              <div className="absolute bottom-[16px] left-[18px] rounded-[14px] bg-black/55 px-[14px] py-[8px] text-[16px] font-semibold text-white">
                {currentSlide + 1} / 12
              </div>
            </div>

            <div className="mt-[18px] flex gap-[12px]">
              {thumbs.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`relative h-[92px] w-[130px] overflow-hidden rounded-[18px] border ${
                    index === currentSlide
                      ? "border-[2px] border-[#c59b5b]"
                      : "border-transparent"
                  } bg-white`}
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

            <div className="mt-[24px]">
              <h3 className="text-[24px] font-extrabold leading-[1.15] text-[#343434]">
                О проекте
              </h3>

              <p className="mt-[14px] max-w-[650px] text-[18px] leading-[1.45] text-[#555555]">
                {project.about}
              </p>

              <div className="mt-[24px] grid grid-cols-4 gap-[12px]">
                {displayedFacts.map((fact) => (
                  <div
                    key={fact.title}
                    className="flex min-h-[88px] items-start gap-[12px] rounded-[18px] border border-[#dddddd] bg-white px-[18px] py-[16px]"
                  >
                    <span className="mt-[2px] flex min-w-[24px] items-center justify-center">
                      <Image
                        src={fact.iconSrc}
                        alt=""
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] object-contain"
                        aria-hidden="true"
                      />
                    </span>

                    <div>
                      <div className="text-[16px] font-bold leading-[1.15] text-[#3a3a3a]">
                        {fact.title}
                      </div>
                      <div className="mt-[6px] text-[15px] leading-[1.2] text-[#666666]">
                        {fact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-[6px]">
            <h2 className="text-[25px] font-extrabold leading-[1.1] text-[#3a3a3a]">
              {project.title}
            </h2>

            <p className="mt-[10px] text-[18px] leading-[1.2] text-[#646464]">
              {project.location}
            </p>

            <div className="mt-[26px] border-t border-[#dddddd]">
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

            <div className="mt-[24px]">
              <h3 className="text-[20px] font-extrabold leading-[1.15] text-[#343434]">
                Что сделали:
              </h3>

              <ul className="mt-[22px] space-y-[18px]">
                {project.workItems.map((item) => (
                  <li key={item} className="flex items-center gap-[16px]">
                    <span className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#be995a] text-[15px] font-bold text-white">
                      ✓
                    </span>
                    <span className="text-[16px] leading-[1.2] text-[#585858]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[34px] rounded-[20px] bg-[#efebe6] px-[28px] py-[24px]">
              <div className="flex items-start gap-[16px]">
                <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#be995a] text-[20px] font-bold text-white">
                  ✓
                </span>

                <div>
                  <div className="text-[18px] font-extrabold leading-[1.2] text-[#3c3c3c]">
                    {project.result}
                  </div>
                  <div className="mt-[10px] text-[17px] leading-[1.25] text-[#6a6a6a]">
                    — {project.ownerLine}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d9d9d9] bg-[#f7f7f7] px-[40px] py-[26px]">
          <div className="grid grid-cols-[1fr_760px] items-start gap-[26px]">
            <div className="pt-[4px]">
              <div className="text-[24px] font-extrabold leading-[1.15] text-[#3a3a3a]">
                Хотите похожий результат?
              </div>
              <div className="mt-[12px] max-w-[360px] text-[18px] leading-[1.35] text-[#666666]">
                Получите точный расчёт стоимости
                <br />
                и сроков для вашего объекта
              </div>
            </div>

            <div>
              <div className="grid grid-cols-[1fr_392px] gap-[18px]">
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="h-[66px] w-full rounded-full border border-[#d9d9d9] bg-white px-[26px] text-[20px] text-[#444444] outline-none placeholder:text-[#8e8e8e]"
                />

                <button
                  type="button"
                  onClick={() => setIsEstimateOpen(true)}
                  className="h-[66px] rounded-full bg-[#be995a] px-[28px] text-[18px] font-bold text-white transition hover:opacity-95"
                >
                  Получить расчёт за 24 часа
                </button>
              </div>

              <div className="mt-[14px] text-left text-[16px] leading-[1.25] text-[#666666]">
                Нажимая кнопку, вы соглашаетесь с
                <a
                  href="/policy"
                  className="ml-[4px] text-[#be995a] underline-offset-2 hover:underline"
                >
                  политикой конфиденциальности
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EstimateModal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
      />
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
    <div className="flex items-center justify-between border-b border-[#dddddd] py-[18px]">
      <div className="flex items-center gap-[14px]">
        <span className="flex min-w-[24px] items-center justify-center">
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] object-contain"
              aria-hidden="true"
            />
          ) : null}
        </span>
        <span className="text-[18px] font-extrabold text-[#3d3d3d]">
          {label}
        </span>
      </div>

      <span className="text-[17px] text-[#4f4f4f]">{value}</span>
    </div>
  );
}
