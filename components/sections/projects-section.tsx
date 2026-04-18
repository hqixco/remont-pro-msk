"use client";

import Image from "next/image";
import { useState } from "react";

import {
  ProjectModal,
  type ProjectModalProject,
} from "@/components/projects/project-modal";

const projectItems: ProjectModalProject[] = [
  {
    title: "2-комнатная квартира, 68 м²",
    location: "Новостройка, Москва",
    image: "/images/projects/project-1.webp",
    imageAlt: "2-комнатная квартира, 68 м²",
    price: "1 250 000 ₽",
    duration: "45 дней",
    format: "капитальный ремонт",
    scope:
      "электрика, выравнивание стен, санузел, напольные покрытия, чистовая отделка",
    result: "Сдали в срок. Смета соблюдена.",
    about:
      "В этой 2-комнатной квартире мы выполнили капитальный ремонт под ключ. Основная задача — создать светлый, современный интерьер с удобной планировкой и качественными материалами.",
    workItems: [
      "электрика, выравнивание стен",
      "санузел под ключ",
      "напольные покрытия",
      "чистовая отделка",
    ],
    ownerLine: "Анна и Сергей, владельцы квартиры",
  },
  {
    title: "3-комнатная квартира, 92 м²",
    location: "Москва, ЖК бизнес-класса",
    image: "/images/projects/project-2.webp",
    imageAlt: "3-комнатная квартира, 92 м²",
    price: "1 780 000 ₽",
    duration: "60 дней",
    format: "ремонт для семьи",
    scope:
      "перепланировка, электрика, освещение, санузлы, кухня, чистовая отделка",
    result: "Фиксированная смета по договору.",
    about:
      "Для этой 3-комнатной квартиры мы собрали спокойный семейный интерьер, переработали сценарии освещения и сделали удобную планировку для ежедневной жизни без лишнего визуального шума.",
    workItems: [
      "перепланировка и подготовка стен",
      "электрика и освещение",
      "санузлы и кухня",
      "чистовая отделка",
    ],
    ownerLine: "Ирина и Алексей, владельцы квартиры",
  },
  {
    title: "Дом / коттедж, 150 м²",
    location: "Московская область",
    image: "/images/projects/project-3.jpeg",
    imageAlt: "Дом / коттедж, 150 м²",
    price: "2 950 000 ₽",
    duration: "75 дней",
    format: "капитальный ремонт",
    scope: "инженерные работы, отделка, санузлы, полы, стены, освещение",
    result: "Работы принимались по этапам.",
    about:
      "В коттедже мы выполнили капитальный ремонт с инженерной частью, полной отделкой и обновлением ключевых помещений. Отдельное внимание уделили срокам и поэтапной сдаче работ.",
    workItems: [
      "инженерные работы",
      "санузлы и отделка",
      "полы и стены",
      "освещение и чистовая сборка",
    ],
    ownerLine: "Олег и Марина, владельцы дома",
  },
];

export function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedProject =
    selectedIndex === null ? null : projectItems[selectedIndex];

  const openProject = (index: number) => {
    setSelectedIndex(index);
  };

  const showPrevProject = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? projectItems.length - 1 : prev - 1;
    });
  };

  const showNextProject = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev === projectItems.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
      <section id="projects" className="bg-[#f3f3f3] py-[72px]">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-0">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="text-[45px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black">
              Реальные объекты с ценами,
              <br />
              сроками и составом работ
            </h2>

            <p className="mx-auto mt-[26px] max-w-[760px] text-[20px] leading-[1.32] text-black">
              Показываем не только фото, но и понятные цифры:
              <br />
              площадь, бюджет, сроки и что вошло в ремонт.
            </p>
          </div>

          <div className="mt-[54px] grid grid-cols-3 gap-[34px]">
            {projectItems.map((item, index) => (
              <article
                key={item.title}
                className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white px-[18px] pb-[22px] pt-[18px]"
              >
                <div className="relative h-[200px] w-full overflow-hidden rounded-[28px]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex h-full flex-1 flex-col px-[16px] pt-[18px]">
                  <h3 className="text-[20px] font-bold leading-[1.2] text-[#3d3d3d]">
                    {item.title}
                  </h3>

                  <p className="mt-[6px] text-[16px] leading-[1.2] text-[#666666]">
                    {item.location}
                  </p>

                  <div className="mt-[18px] space-y-[12px]">
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

                  <div className="mt-[18px]">
                    <div className="text-[16px] font-bold leading-[1.2] text-[#2f2f2f]">
                      Что сделали:
                    </div>

                    <p className="mt-[6px] text-[16px] leading-[1.35] text-[#555555]">
                      {item.scope}
                    </p>
                  </div>

                  <div className="mt-[18px] flex items-start gap-[10px]">
                    <span className="mt-[4px] inline-flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#be995a] text-[12px] font-bold text-white">
                      ✓
                    </span>

                    <p className="mb-[15px] max-w-[240px] text-[16px] leading-[1.22] text-[#5a5a5a]">
                      {item.result}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openProject(index)}
                    className="mt-auto inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[#be995a] text-[16px] font-bold !text-white transition hover:opacity-95"
                  >
                    Смотреть кейс
                  </button>
                </div>
              </article>
            ))}
          </div>
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
    <div className="flex items-center gap-[10px] text-[17px] leading-[1.2] text-[#555555]">
      <span className="flex h-[18px] w-[18px] items-center justify-center">
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
      <span className="font-bold text-[#3b3b3b]">{label}</span>
      <span>{value}</span>
    </div>
  );
}
