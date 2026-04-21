"use client";

import { ProjectModal } from "@/components/projects/project-modal";
import type { ProjectsContent } from "@/types/site-content";
import Image from "next/image";
import { useState } from "react";

export function ProjectsSection({ content }: { content: ProjectsContent }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const selectedProject =
    selectedIndex === null ? null : content.items[selectedIndex] ?? null;
  const visibleItems = content.items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < content.items.length;

  const openProject = (index: number) => {
    setSelectedIndex(index);
  };

  const showPrevProject = () => {
    setSelectedIndex((prev) => {
      if (content.items.length === 0) return null;
      if (prev === null) return 0;
      return prev === 0 ? content.items.length - 1 : prev - 1;
    });
  };

  const showNextProject = () => {
    setSelectedIndex((prev) => {
      if (content.items.length === 0) return null;
      if (prev === null) return 0;
      return prev === content.items.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
      <section
        id="projects"
        className="bg-[#f3f3f3] py-8 md:py-12 lg:py-14 xl:py-[72px]"
      >
        <div className="mx-auto max-w-[1180px] px-3 min-[360px]:px-4 md:px-6 xl:px-0">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="text-[25px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black sm:text-[25px] md:text-[44px] lg:text-[42px] xl:text-[45px]">
              {content.title}
            </h2>

            <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.36] text-black min-[360px]:text-[17px] min-[390px]:text-[18px] sm:mt-5 sm:text-[18px] md:mt-6 md:text-[19px] lg:text-[18px] xl:mt-[26px] xl:text-[20px] xl:leading-[1.32]">
              {content.description}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-6 xl:mt-[54px] xl:grid-cols-3 xl:gap-[34px]">
            {visibleItems.map((item, index) => {
              const mainImage = item.gallery[0] || item.image || null;
              const actualIndex = index;

              return (
                <article
                  key={`${item.title}-${actualIndex}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => openProject(actualIndex)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject(actualIndex);
                    }
                  }}
                  className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] bg-white px-4 pb-4 pt-4 text-left outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#be995a] focus-visible:ring-offset-2 min-[360px]:px-5 min-[360px]:pb-5 min-[360px]:pt-5 md:px-5 md:pb-5 md:pt-5 lg:px-6 lg:pb-6 lg:pt-6 xl:px-[18px] xl:pb-[22px] xl:pt-[18px]"
                >
                  <div className="relative h-[180px] w-full overflow-hidden rounded-[22px] min-[360px]:h-[190px] sm:h-[220px] md:h-[210px] lg:h-[220px] xl:h-[200px] xl:rounded-[28px]">
                    {mainImage ? (
                      <Image
                        src={mainImage}
                        alt={item.imageAlt || item.title || "Изображение проекта"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#ece7e0] text-center text-[14px] font-medium text-[#8b7c68]">
                        Фото кейса не загружено
                      </div>
                    )}
                  </div>

                  <div className="flex h-full min-w-0 flex-1 flex-col pt-4 min-[360px]:pt-5 xl:px-[16px] xl:pt-[18px]">
                    <h3 className="text-[19px] font-bold leading-[1.18] text-[#3d3d3d] min-[360px]:text-[20px] sm:text-[22px] md:text-[21px] lg:text-[22px] xl:text-[20px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[15px] leading-[1.25] text-[#666666] min-[360px]:text-[16px] sm:text-[17px] md:text-[16px] lg:text-[17px] xl:mt-[6px] xl:text-[16px]">
                      {item.location}
                    </p>

                    <div className="mt-4 space-y-3 min-[360px]:mt-5 xl:mt-[18px] xl:space-y-[12px]">
                      <InfoRow
                        iconSrc="/images/projects/icon-price.svg"
                        label="Стоимость:"
                        value={item.price}
                      />
                      <InfoRow
                        iconSrc="/images/projects/icon-duration.svg"
                        label="Срок:"
                        value={item.duration}
                      />
                      <InfoRow
                        iconSrc="/images/projects/icon-format.svg"
                        label="Формат:"
                        value={item.format}
                      />
                    </div>

                    <div className="mt-4 min-[360px]:mt-5 xl:mt-[18px]">
                      <div className="text-[16px] font-bold leading-[1.2] text-[#2f2f2f] min-[360px]:text-[17px] xl:text-[16px]">
                        Что сделали:
                      </div>

                      <p className="mt-2 text-[15px] leading-[1.38] text-[#555555] min-[360px]:text-[16px] sm:text-[17px] md:text-[16px] xl:mt-[6px] xl:text-[16px] xl:leading-[1.35]">
                        {item.scope}
                      </p>
                    </div>

                    <div className="mt-4 flex min-w-0 items-start justify-start gap-[10px] min-[360px]:mt-5 xl:mt-[18px]">
                      <span className="mt-[3px] inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#be995a] text-[12px] font-bold text-white">
                        ✓
                      </span>

                      <p className="text-[15px] leading-[1.3] text-[#5a5a5a] min-[360px]:text-[16px] sm:text-[17px] md:text-[16px] xl:mb-[15px] xl:max-w-[240px] xl:text-[16px] xl:leading-[1.22]">
                        {item.result}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openProject(actualIndex);
                      }}
                      className="mt-5 inline-flex h-[54px] w-full items-center justify-center rounded-full bg-[#be995a] px-5 text-[16px] font-bold text-white transition hover:opacity-95 min-[360px]:h-[56px] sm:h-[58px] md:h-[60px] lg:h-[62px] xl:mt-auto xl:h-[52px] xl:px-0 xl:text-[16px]"
                    >
                      Смотреть кейс
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {hasMoreItems ? (
            <div className="mt-6 flex justify-center sm:mt-8 xl:mt-10">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((current) =>
                    Math.min(current + 3, content.items.length)
                  )
                }
                className="inline-flex h-[54px] items-center justify-center rounded-full border border-black bg-transparent px-7 text-[16px] font-bold text-black transition hover:bg-[#f1f1f1] min-[360px]:h-[56px] sm:h-[58px] sm:px-8"
              >
                Показать еще
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <ProjectModal
        isOpen={selectedProject !== null}
        project={selectedProject}
        onClose={() => setSelectedIndex(null)}
        onPrevProject={showPrevProject}
        onNextProject={showNextProject}
      />
    </>
  );
}

function InfoRow({
  iconSrc,
  label,
  value,
}: {
  iconSrc?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start justify-start gap-[10px] text-[15px] leading-[1.28] text-[#555555] min-[360px]:text-[16px] sm:text-[17px] md:text-[16px] xl:items-center xl:text-[17px] xl:leading-[1.2]">
      <span className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center xl:mt-0">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
            aria-hidden="true"
          />
        ) : null}
      </span>
      <p className="min-w-0 text-left">
        <span className="font-bold text-[#3b3b3b]">{label}</span>{" "}
        <span>{value}</span>
      </p>
    </div>
  );
}
