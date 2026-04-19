"use client";

import { useModalPresence } from "@/components/modals/use-modal-presence";
import Image from "next/image";
import { useEffect } from "react";

type SuccessGameModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SuccessGameModal({
  isOpen,
  onClose,
}: SuccessGameModalProps) {
  const { shouldRender, isVisible } = useModalPresence(isOpen);

  useEffect(() => {
    if (!shouldRender) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[140]">
      <button
        type="button"
        aria-label="Закрыть окно"
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute left-1/2 top-1/2 w-[calc(100vw-24px)] max-w-[602px] -translate-x-1/2 rounded-[24px] bg-white px-4 pb-6 pt-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-[opacity,transform] duration-200 min-[360px]:w-[calc(100vw-32px)] sm:px-6 sm:pb-7 sm:pt-6 md:px-8 md:pb-8 md:pt-8 min-[1300px]:w-[602px] min-[1300px]:rounded-[28px] min-[1300px]:px-[46px] min-[1300px]:pb-[44px] min-[1300px]:pt-[42px] ${
          isVisible
            ? "-translate-y-1/2 opacity-100"
            : "translate-y-[calc(-50%+10px)] opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[26px] leading-none text-[#4c4c4c] transition hover:bg-[#f4f0ea] hover:opacity-80 sm:right-5 sm:top-5 min-[1300px]:right-[26px] min-[1300px]:top-[22px] min-[1300px]:text-[32px]"
        >
          ×
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative h-[56px] w-[56px] sm:h-[60px] sm:w-[60px] min-[1300px]:h-[64px] min-[1300px]:w-[64px]">
            <Image
              src="/images/icons/success.svg"
              alt="Успешная отправка"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="mt-5 text-[22px] font-extrabold leading-[1.12] text-[#2f2f2f] sm:text-[24px] min-[1300px]:mt-[24px] min-[1300px]:text-[25px]">
            Заявка отправлена
          </h2>

          <p className="mt-4 max-w-[430px] text-[15px] leading-[1.45] text-[#4f4f4f] sm:text-[17px] min-[1300px]:mt-[18px] min-[1300px]:text-[18px]">
            Мы свяжемся с Вами в ближайшие минуты
          </p>
        </div>
      </div>
    </div>
  );
}
