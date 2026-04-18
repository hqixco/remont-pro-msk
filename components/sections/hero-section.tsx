"use client";

import { ConsultationModal } from "@/components/modals/consultation-modal";
import { EstimateModal } from "@/components/modals/estimate-modal";
import type { HeroPriceBadge } from "@/types/site-content";
import Image from "next/image";
import { useState } from "react";

type HeroSectionProps = {
  priceBadge: HeroPriceBadge;
};

type HeroPriceBadgeProps = {
  line1: string;
  line2: string;
  line3: string;
};

export function HeroSection({ priceBadge }: HeroSectionProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#f5f2ef] bg-[url('/images/hero-interior.jpg')] bg-cover bg-right">
        <div className="relative mx-auto h-[756px] max-w-[1920px]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,242,239,0.98)_0%,rgba(245,242,239,0.96)_34%,rgba(245,242,239,0.88)_48%,rgba(245,242,239,0.55)_58%,rgba(245,242,239,0.14)_68%,rgba(245,242,239,0)_76%)]" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1180px] flex-col px-6 pt-[24px] lg:px-0">
            <HeroPriceBadge
              line1={priceBadge.line1}
              line2={priceBadge.line2}
              line3={priceBadge.line3}
            />

            <header className="flex items-start justify-between">
              <div className="flex items-start gap-[18px]">
                <div className="relative h-[58px] w-[58px] shrink-0">
                  <Image
                    src="/images/logo-remont-pro.png"
                    alt="Ремонт PRO"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                <div className="pt-[2px]">
                  <div className="text-[20px] font-extrabold leading-[1.1] text-black">
                    Ремонт PRO
                  </div>
                  <div className="mt-[6px] text-[14px] leading-[1.2] text-black">
                    Ремонт под ключ в Москве
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-[36px]">
                <div className="pt-[2px] text-right">
                  <div className="text-[22px] font-extrabold leading-[1.05] text-black">
                    +7 (495) 120-45-67
                  </div>
                  <div className="mt-[8px] text-[14px] leading-[1.2] text-black">
                    Ежедневно с 9:00 до 21:00
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="inline-flex h-[48px] items-center justify-center rounded-full bg-[#c19756] px-[28px] text-[16px] font-bold leading-none !text-white transition hover:opacity-95"
                >
                  Бесплатная консультация
                </button>
              </div>
            </header>

            <div className="mt-[86px] w-full max-w-[840px]">
              <h1 className="max-w-[820px] text-[60px] leading-[1.08] tracking-[-0.03em] text-black">
                <span className="font-extrabold">Ремонт квартир в Москве</span>
                <br />
                <span className="font-light">
                  без скрытых доплат после
                </span>
                <br />
                <span className="font-light">старта работ</span>
              </h1>

              <p className="mt-[28px] max-w-[760px] text-[24px] leading-[1.28] tracking-[-0.01em] text-black">
                Фиксируем смету и сроки в договоре. Подготовим 3 варианта
                расчёта под ваш бюджет за 24 часа. Оплата по этапам после
                приёмки выполненных работ.
              </p>

              <div className="mt-[44px] flex items-center gap-[18px]">
                <button
                  type="button"
                  onClick={() => setIsEstimateOpen(true)}
                  className="inline-flex h-[88px] min-w-[326px] items-center justify-center rounded-full bg-[#c19756] px-[34px] text-center text-[18px] font-bold leading-none !text-white transition hover:opacity-95"
                >
                  Получить смету за 24 часа
                </button>

                <a
                  href="#projects"
                  className="inline-flex h-[88px] min-w-[418px] items-center justify-center rounded-full border border-[#c19756] bg-white/15 px-[34px] text-center text-[18px] font-bold leading-none text-black backdrop-blur-[1px] transition hover:bg-white/25"
                >
                  Посмотреть реальные сметы и кейсы
                </a>
              </div>

              <div className="absolute bottom-[50px] left-6 flex flex-wrap gap-[14px] lg:left-0">
                <MetricPill text="7+ лет на рынке" />
                <MetricPill text="800+ объектов" />
                <MetricPill text="рейтинг 4.9" />
                <MetricPill text="гарантия до 5 лет" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <EstimateModal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
      />
    </>
  );
}

function HeroPriceBadge({ line1, line2, line3 }: HeroPriceBadgeProps) {
  return (
    <div className="pointer-events-none absolute bottom-[130px] right-0 z-20">
      <div className="relative flex h-[220px] w-[220px] items-center justify-center">
        <Image
          src="/images/price-poligon.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />

        <div className="relative text-center text-black">
          <div className="text-[25px] font-normal leading-[1] tracking-[-0.02em]">
            {line1}
          </div>
          <div className="mt-[18px] text-[25px] font-normal leading-[1] tracking-[-0.03em]">
            {line2}
          </div>
          <div className="mt-[18px] text-[25px] font-normal leading-[1] tracking-[-0.02em]">
            {line3}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricPill({ text }: { text: string }) {
  return (
    <div className="inline-flex h-[48px] items-center gap-[10px] rounded-full bg-white px-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
      <span className="text-[18px] leading-none text-[#f2b300]">★</span>
      <span className="text-[18px] font-medium leading-none text-black">
        {text}
      </span>
    </div>
  );
}
