"use client";

import { EstimateModal } from "@/components/modals/estimate-modal";
import { useState } from "react";

export function LeadMagnetSection() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  const items = [
    "предварительную\nсмету",
    "сроки\nвыполнения\nработ",
    "3 варианта\nрасчёта под\nбюджет",
    "консультацию\nпо этапам\nремонта",
  ];

  return (
    <>
      <section className="bg-[#f3f3f3] pb-6 pt-2 sm:pb-8 sm:pt-3 md:pb-10 md:pt-4 xl:pb-[36px] xl:pt-[8px]">
        <div className="mx-auto max-w-[1180px] px-3 min-[360px]:px-4 md:px-6 xl:px-0">
          <div className="rounded-[26px] border border-[#d8d8d8] bg-[#f3f3f3] px-3 py-3 min-[360px]:px-4 min-[360px]:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 min-[1300px]:flex min-[1300px]:min-h-[96px] min-[1300px]:items-center min-[1300px]:rounded-full min-[1300px]:pl-[36px] min-[1300px]:pr-[16px]">
            <div className="w-full shrink-0 min-[1300px]:mr-[10px] min-[1300px]:w-[140px]">
              <h3 className="text-center text-[25px] font-extrabold leading-[1.12] tracking-[-0.02em] text-black sm:text-[25px] md:text-[22px] min-[1300px]:text-left min-[1300px]:text-[18px]">
                <span className="min-[1300px]:hidden">
                  После заявки Вы получите:
                </span>
                <span className="hidden min-[1300px]:inline">
                  После заявки
                  <br />
                  Вы получите:
                </span>
              </h3>
            </div>

            <div className="mt-4 grid w-full grid-cols-1 gap-3 min-[390px]:grid-cols-2 min-[390px]:gap-3 md:mt-5 md:gap-4 min-[1300px]:mt-0 min-[1300px]:flex min-[1300px]:grid-cols-none min-[1300px]:items-center min-[1300px]:gap-[12px]">
              {items.map((item) => (
                <BenefitChip key={item} text={item} />
              ))}
            </div>

            <div className="mt-4 w-full md:mt-5 min-[1300px]:ml-[10px] min-[1300px]:mt-0 min-[1300px]:w-auto">
              <button
                type="button"
                onClick={() => setIsEstimateOpen(true)}
                className="inline-flex h-[58px] w-full items-center justify-center rounded-full bg-[#be995a] px-6 text-center text-[16px] font-bold leading-[1.15] text-white transition hover:opacity-95 sm:h-[62px] md:h-[68px] md:px-8 md:text-[18px] lg:h-[76px] min-[1300px]:h-[100px] min-[1300px]:min-w-[262px] min-[1300px]:shrink-0 min-[1300px]:px-[34px] min-[1300px]:text-[16px]"
              >
                Получить смету за 24 часа
              </button>
            </div>
          </div>
        </div>
      </section>

      <EstimateModal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
      />
    </>
  );
}

function BenefitChip({ text }: { text: string }) {
  return (
    <div className="flex min-h-[56px] w-full items-center gap-[10px] rounded-full bg-white px-4 py-3 min-[390px]:min-h-[60px] min-[390px]:px-5 md:px-5 min-[1300px]:min-h-[64px] min-[1300px]:w-auto min-[1300px]:min-w-[152px] min-[1300px]:px-[18px]">
      <span className="shrink-0 text-[24px] font-bold leading-none text-[#74c61b] min-[390px]:text-[26px] min-[1300px]:text-[28px]">
        ✓
      </span>

      <span className="min-w-0 flex-1 whitespace-normal text-left text-[14px] font-medium leading-[1.15] tracking-[-0.01em] text-black min-[390px]:text-[15px] min-[1300px]:flex-none min-[1300px]:whitespace-pre-line min-[1300px]:text-[14px] min-[1300px]:leading-[1.05]">
        {text}
      </span>
    </div>
  );
}
