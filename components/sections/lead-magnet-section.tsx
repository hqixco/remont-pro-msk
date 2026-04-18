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
      <section className="bg-[#f3f3f3] pb-[36px] pt-[8px]">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-0">
          <div className="flex min-h-[96px] items-center rounded-full border border-[#d8d8d8] bg-[#f3f3f3] pl-[36px] pr-[16px]">
            <div className="mr-[10px] w-[140px] shrink-0">
              <h3 className="text-[18px] font-extrabold leading-[1.12] tracking-[-0.02em] text-black">
                После заявки
                <br />
                Вы получите:
              </h3>
            </div>

            <div className="flex items-center gap-[12px]">
              {items.map((item) => (
                <BenefitChip key={item} text={item} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsEstimateOpen(true)}
              className="ml-[10px] inline-flex h-[100px] min-w-[262px] shrink-0 items-center justify-center rounded-full bg-[#be995a] px-[34px] text-center text-[16px] font-bold leading-[1.15] text-white transition hover:opacity-95"
            >
              Получить смету за 24 часа
            </button>
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
    <div className="flex h-[64px] min-w-[152px] items-center gap-[10px] rounded-full bg-white px-[18px]">
      <span className="text-[28px] font-bold leading-none text-[#74c61b]">
        ✓
      </span>

      <span className="whitespace-pre-line text-[14px] font-medium leading-[1.05] tracking-[-0.01em] text-black">
        {text}
      </span>
    </div>
  );
}
