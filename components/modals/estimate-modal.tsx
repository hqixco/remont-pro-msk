"use client";

import {
  ContactMethodRadioGroup,
  type ContactMethod,
} from "@/components/modals/contact-method-radio-group";
import { SuccessGameModal } from "@/components/modals/success-game-modal";
import {
  MODAL_ANIMATION_MS,
  useModalPresence,
} from "@/components/modals/use-modal-presence";
import { useEffect, useState } from "react";

type EstimateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EstimateModal({ isOpen, onClose }: EstimateModalProps) {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone");
  const [submitted, setSubmitted] = useState(false);
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

  useEffect(() => {
    if (isOpen) return;

    const timeoutId = window.setTimeout(() => {
      setSubmitted(false);
    }, MODAL_ANIMATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  if (!shouldRender) return null;

  if (submitted) {
    return <SuccessGameModal isOpen={isOpen} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Закрыть модальное окно"
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute left-1/2 top-1/2 max-h-[calc(100vh-24px)] w-[calc(100vw-24px)] max-w-[602px] -translate-x-1/2 overflow-y-auto rounded-[24px] bg-white px-4 pb-5 pt-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-[opacity,transform] duration-200 min-[360px]:max-h-[calc(100vh-32px)] min-[360px]:w-[calc(100vw-32px)] sm:px-6 sm:pb-6 sm:pt-6 md:px-8 md:pb-8 md:pt-8 min-[1300px]:max-h-none min-[1300px]:w-[602px] min-[1300px]:rounded-[28px] min-[1300px]:px-[46px] min-[1300px]:pb-[40px] min-[1300px]:pt-[38px] ${
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

        <h2 className="pr-8 text-center text-[22px] font-extrabold leading-[1.12] text-[#2f2f2f] sm:text-[24px] min-[1300px]:text-[25px]">
          Получить смету за 24 часа
        </h2>

        <p className="mx-auto mt-5 max-w-[470px] text-center text-[15px] leading-[1.45] text-[#4f4f4f] sm:mt-6 sm:text-[17px] md:text-[18px] min-[1300px]:mt-[24px]">
          Оставьте номер телефона — подготовим 3 варианта расчёта под ваш
          бюджет и свяжемся удобным способом
        </p>

        <div className="mt-6 min-[1300px]:mt-[34px]">
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            className="h-[56px] w-full rounded-full border border-[#d7d7d7] bg-white px-5 text-[16px] text-[#4a4a4a] outline-none placeholder:text-[#b4b4b4] sm:h-[64px] sm:px-6 sm:text-[17px] min-[1300px]:h-[74px] min-[1300px]:px-[28px] min-[1300px]:text-[18px]"
          />
        </div>

        <div className="mt-4 sm:mt-5 min-[1300px]:mt-[22px]">
          <ContactMethodRadioGroup
            value={contactMethod}
            onChange={setContactMethod}
          />
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-5 h-[56px] w-full rounded-full bg-[#c29759] px-5 text-[15px] font-bold text-white transition hover:opacity-95 sm:mt-6 sm:h-[64px] sm:text-[16px] min-[1300px]:mt-[26px] min-[1300px]:h-[78px]"
        >
          Получить смету
        </button>

        <p className="mx-auto mt-5 max-w-[420px] text-center text-[12px] leading-[1.45] text-[#8a8a8a] sm:mt-6 sm:text-[13px] min-[1300px]:mt-[26px] min-[1300px]:text-[14px]">
          Нажимая кнопку, вы соглашаетесь с политикой
          <br />
          <a href="/policy" className="text-[#c29759]">
            конфиденциальности
          </a>
        </p>
      </div>
    </div>
  );
}
