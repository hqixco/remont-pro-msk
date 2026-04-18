"use client";

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
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[140]">
      <button
        type="button"
        aria-label="Закрыть окно"
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
      />

      <div className="absolute left-1/2 top-1/2 w-[602px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-white px-[46px] pb-[44px] pt-[42px] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-[26px] top-[22px] text-[32px] leading-none text-[#4c4c4c] transition hover:opacity-70"
        >
          ×
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative h-[64px] w-[64px]">
            <Image
              src="/images/icons/success.svg"
              alt="Успешная отправка"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="mt-[24px] text-[25px] font-extrabold leading-[1.12] text-[#2f2f2f]">
            Заявка отправлена
          </h2>

          <p className="mt-[18px] max-w-[430px] text-[18px] leading-[1.45] text-[#4f4f4f]">
            Мы свяжемся с Вами в ближайшие минуты
          </p>
        </div>
      </div>
    </div>
  );
}
