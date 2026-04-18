"use client";

import {
  ContactMethodRadioGroup,
  type ContactMethod,
} from "@/components/modals/contact-method-radio-group";
import { SuccessGameModal } from "@/components/modals/success-game-modal";
import { useEffect, useState } from "react";

type ConsultationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone");
  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    if (isOpen) return;

    setSubmitted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  if (submitted) {
    return <SuccessGameModal isOpen={isOpen} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Закрыть модальное окно"
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
      />

      <div className="absolute left-1/2 top-1/2 w-[602px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-white px-[46px] pb-[40px] pt-[38px] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-[26px] top-[22px] text-[32px] leading-none text-[#4c4c4c] transition hover:opacity-70"
        >
          ×
        </button>

        <h2 className="text-center text-[25px] font-extrabold leading-[1.12] text-[#2f2f2f]">
          Бесплатная консультация
        </h2>

        <p className="mx-auto mt-[24px] max-w-[430px] text-center text-[18px] leading-[1.45] text-[#4f4f4f]">
          Оставьте номер телефона —
          <br />
          мы перезвоним и ответим на все вопросы
        </p>

        <div className="mt-[34px]">
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            className="h-[74px] w-full rounded-full border border-[#d7d7d7] bg-white px-[28px] text-[18px] text-[#4a4a4a] outline-none placeholder:text-[#b4b4b4]"
          />
        </div>

        <div className="mt-[22px]">
          <ContactMethodRadioGroup
            value={contactMethod}
            onChange={setContactMethod}
          />
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-[26px] h-[78px] w-full rounded-full bg-[#c29759] text-[16px] font-bold text-white transition hover:opacity-95"
        >
          Получить консультацию
        </button>

        <p className="mx-auto mt-[26px] max-w-[510px] text-center text-[14px] leading-[1.45] text-[#8a8a8a]">
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
