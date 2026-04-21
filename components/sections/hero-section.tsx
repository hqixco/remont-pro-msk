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
  compact?: boolean;
};

export function HeroSection({ priceBadge }: HeroSectionProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  return (
    <>
      <section className="bg-[#f5f2ef]">
        <div className="hidden min-[1281px]:block">
          <section className="relative overflow-hidden bg-[#f5f2ef] bg-[url('/images/hero-interior.jpg')] bg-cover bg-right">
            <div className="relative mx-auto h-[756px] max-w-[1920px]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,242,239,0.98)_0%,rgba(245,242,239,0.96)_34%,rgba(245,242,239,0.88)_48%,rgba(245,242,239,0.55)_58%,rgba(245,242,239,0.14)_68%,rgba(245,242,239,0)_76%)]" />

              <div className="relative z-10 mx-auto flex h-full max-w-[1180px] flex-col px-6 pt-[24px] lg:px-0">
                <div className="pointer-events-none absolute bottom-[130px] right-0 z-20">
                  <HeroPriceBadge
                    line1={priceBadge.line1}
                    line2={priceBadge.line2}
                    line3={priceBadge.line3}
                  />
                </div>

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
                    <span className="font-extrabold">
                      Ремонт квартир в Москве
                    </span>
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
                    <DesktopMetricPill text="7+ лет на рынке" />
                    <DesktopMetricPill text="800+ объектов" />
                    <DesktopMetricPill text="рейтинг 4.9" />
                    <DesktopMetricPill text="гарантия до 5 лет" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="relative overflow-hidden min-[1281px]:hidden"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(245,242,239,0.98) 0%, rgba(245,242,239,0.96) 56%, rgba(245,242,239,0.82) 68%, rgba(245,242,239,0.3) 82%, rgba(245,242,239,0.08) 100%), url('/images/hero-interior.jpg')",
            backgroundPosition: "right bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="mx-auto max-w-[1180px] px-3 pb-8 pt-4 min-[360px]:px-4 md:px-6 md:pb-10 lg:pb-12 lg:pt-5">
            <header className="flex flex-col items-center gap-3 text-center md:gap-4 md:text-left">
              <div className="flex w-full flex-col gap-3 rounded-[20px] md:rounded-[24px]">
                <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
                  <div className="flex min-w-0 items-center justify-center gap-3 md:justify-start md:gap-4">
                    <div className="relative h-[52px] w-[52px] shrink-0 min-[390px]:h-[56px] min-[390px]:w-[56px] md:h-[58px] md:w-[58px]">
                      <Image
                        src="/images/logo-remont-pro.png"
                        alt="Ремонт PRO"
                        fill
                        priority
                        className="object-contain"
                        sizes="58px"
                      />
                    </div>

                    <div className="min-w-0 text-left">
                      <div className="text-[18px] font-extrabold leading-[1.05] text-black min-[390px]:text-[20px]">
                        Ремонт PRO
                      </div>
                      <div className="mt-1 text-[13px] leading-[1.2] text-black min-[390px]:text-[14px]">
                        Ремонт под ключ в Москве
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 md:items-end">
                    <div className="text-center md:text-right">
                      <div className="text-[21px] font-extrabold leading-[1.02] text-black min-[390px]:text-[22px] md:text-[24px]">
                        +7 (495) 120-45-67
                      </div>
                      <div className="mt-1 text-[13px] leading-[1.2] text-black min-[390px]:text-[14px]">
                        Ежедневно с 9:00 до 21:00
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="inline-flex h-auto w-fit appearance-none items-center justify-center self-center rounded-none border-0 bg-none px-0 text-center text-[14px] font-semibold leading-[1.2] text-[#c19756] underline decoration-[1px] underline-offset-[4px] shadow-none outline-none transition hover:opacity-80 min-[390px]:text-[15px] md:self-start md:justify-start md:text-[16px] md:text-left"
                      style={{ WebkitAppearance: "none" }}
                    >
                      Бесплатная консультация
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <div className="mt-6 grid gap-6 md:mt-8 md:gap-8 lg:mt-7">
              <div className="min-w-0">
                <div className="max-w-[840px] lg:mx-auto lg:max-w-[920px]">
                  <h1 className="max-w-[820px] text-[25px] font-extrabold leading-[0.98] tracking-[-0.03em] text-black sm:text-[25px] sm:leading-[0.99] md:text-[58px] lg:text-[52px]">
                    Ремонт квартир в Москве
                    <br />
                    <span className="font-light">без скрытых доплат после</span>
                    <br />
                    <span className="font-light">старта работ</span>
                  </h1>

                  <p className="mt-4 max-w-[760px] text-[16px] leading-[1.35] tracking-[-0.01em] text-black min-[360px]:text-[17px] min-[390px]:text-[18px] sm:mt-5 sm:text-[20px] md:mt-6 md:max-w-[820px] md:text-[22px] lg:max-w-[700px] lg:text-[20px]">
                    Фиксируем смету и сроки в договоре. Подготовим 3 варианта
                    расчёта под ваш бюджет за 24 часа. Оплата по этапам после
                    приёмки выполненных работ.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-7 md:mt-8 md:grid md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setIsEstimateOpen(true)}
                      className="inline-flex h-[56px] w-full items-center justify-center rounded-full bg-[#c19756] px-5 text-center text-[16px] font-bold leading-none !text-white transition hover:opacity-95 min-[390px]:h-[60px] min-[390px]:px-6 min-[390px]:text-[17px] sm:h-[64px] md:text-[18px]"
                    >
                      Получить смету за 24 часа
                    </button>

                    <a
                      href="#projects"
                      className="inline-flex h-[56px] w-full items-center justify-center rounded-full border border-[#c19756] bg-white/20 px-5 text-center text-[16px] font-bold leading-tight text-black backdrop-blur-[1px] transition hover:bg-white/25 min-[390px]:h-[60px] min-[390px]:px-6 min-[390px]:text-[17px] sm:h-[64px] md:text-[18px]"
                    >
                      Посмотреть реальные сметы и кейсы
                    </a>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 md:mt-8 md:grid-cols-2">
                    <AdaptiveMetricPill text="7+ лет на рынке" />
                    <AdaptiveMetricPill text="800+ объектов" />
                    <AdaptiveMetricPill text="рейтинг 4.9" />
                    <AdaptiveMetricPill text="гарантия до 5 лет" />
                  </div>

                  <div className="mt-5 flex min-h-[120px] items-end justify-end rounded-[24px] pr-3 min-[360px]:min-h-[128px] min-[390px]:min-h-[136px] min-[414px]:min-h-[144px] sm:mt-6 sm:min-h-[160px] sm:pr-4 md:mt-8 md:min-h-[188px] md:pr-4 lg:min-h-[208px] lg:pr-5">
                    <div className="z-10">
                      <HeroPriceBadge
                        line1={priceBadge.line1}
                        line2={priceBadge.line2}
                        line3={priceBadge.line3}
                        compact
                      />
                    </div>
                  </div>
                </div>
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

function HeroPriceBadge({
  line1,
  line2,
  line3,
  compact = false,
}: HeroPriceBadgeProps) {
  if (!compact) {
    return (
      <div className="pointer-events-none">
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

  return (
    <div className="pointer-events-none">
      <div className="relative flex h-[108px] w-[108px] items-center justify-center min-[360px]:h-[116px] min-[360px]:w-[116px] min-[390px]:h-[124px] min-[390px]:w-[124px] min-[414px]:h-[132px] min-[414px]:w-[132px] sm:h-[148px] sm:w-[148px] md:h-[172px] md:w-[172px]">
        <Image
          src="/images/price-poligon.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
          sizes="(min-width: 768px) 172px, 132px"
        />

        <div className="relative px-3 text-center text-black min-[390px]:px-4">
          <div className="text-[14px] font-normal leading-[1.05] tracking-[-0.02em] min-[360px]:text-[15px] min-[390px]:text-[16px] sm:text-[18px] md:text-[21px]">
            {line1}
          </div>
          <div className="mt-1 text-[14px] font-normal leading-[1.05] tracking-[-0.02em] min-[360px]:text-[15px] min-[390px]:mt-2 min-[390px]:text-[16px] sm:text-[18px] md:text-[21px]">
            {line2}
          </div>
          <div className="mt-1 text-[14px] font-normal leading-[1.05] tracking-[-0.02em] min-[360px]:text-[15px] min-[390px]:mt-2 min-[390px]:text-[16px] sm:text-[18px] md:text-[21px]">
            {line3}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopMetricPill({ text }: { text: string }) {
  return (
    <div className="inline-flex h-[48px] items-center gap-[10px] rounded-full bg-white px-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
      <span className="text-[18px] leading-none text-[#f2b300]">★</span>
      <span className="text-[18px] font-medium leading-none text-black">
        {text}
      </span>
    </div>
  );
}

function AdaptiveMetricPill({ text }: { text: string }) {
  return (
    <div className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-center shadow-[0_10px_24px_rgba(0,0,0,0.06)] sm:min-h-[52px] md:px-5">
      <span className="text-[16px] leading-none text-[#f2b300] sm:text-[17px] md:text-[18px]">
        ★
      </span>
      <span className="text-left text-[14px] font-medium leading-[1.1] text-black min-[390px]:text-[15px] sm:text-[16px] md:text-[17px]">
        {text}
      </span>
    </div>
  );
}
