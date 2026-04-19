"use client";

import { SuccessGameModal } from "@/components/modals/success-game-modal";
import Image from "next/image";
import { useMemo, useState } from "react";

const objectOptions = [
  { value: "", label: "Выберите тип объекта" },
  { value: "apartment", label: "Квартира" },
  { value: "new-building", label: "Новостройка" },
  { value: "house", label: "Дом / коттедж" },
  { value: "commercial", label: "Коммерческое помещение" },
];

export function QuickEstimateWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [objectType, setObjectType] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"details" | "phone">("details");
  const [submitted, setSubmitted] = useState(false);

  const canContinue = useMemo(
    () => objectType.trim().length > 0 && area.trim().length > 0,
    [area, objectType]
  );

  const canSubmit = useMemo(
    () => phone.replace(/\D/g, "").length >= 10,
    [phone]
  );

  function handleCloseWidget() {
    setStep("details");
    setPhone("");
    setIsOpen(false);
  }

  function handleOpenWidget() {
    setIsOpen(true);
  }

  function handleAction() {
    if (step === "details") {
      if (!canContinue) {
        return;
      }

      setStep("phone");
      return;
    }

    if (!canSubmit) {
      return;
    }

    setSubmitted(true);
  }

  function handleSuccessClose() {
    setSubmitted(false);
    setIsOpen(false);
    setStep("details");
    setObjectType("");
    setArea("");
    setPhone("");
  }

  return (
    <>
      <div className="pointer-events-none fixed bottom-3 right-3 z-[120] w-[calc(100vw-24px)] max-w-[368px] min-[360px]:bottom-4 min-[360px]:right-4 min-[360px]:w-[calc(100vw-32px)] sm:bottom-5 sm:right-5 sm:max-w-[380px]">
        {isOpen ? (
          <div className="pointer-events-auto w-full overflow-hidden rounded-[24px] border border-[#e7dfd4] bg-[#fffdf9] shadow-[0_24px_60px_rgba(0,0,0,0.14)] sm:rounded-[26px]">
              <div className="flex items-start gap-3 border-b border-[#efe7dd] px-4 py-4 sm:gap-4 sm:px-5 sm:py-5">
                <div className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#caa15f] sm:h-[56px] sm:w-[56px]">
                  <Image
                    src="/images/icons/calculator.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 sm:h-7 sm:w-7"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[17px] font-extrabold leading-[1.15] text-[#222222] sm:text-[18px]">
                    Быстрый расчёт
                    <br />
                    за 1 минуту
                  </div>
                  <div className="mt-2 text-[13px] leading-[1.35] text-[#555555] sm:text-[14px]">
                    Узнайте стоимость ремонта
                    <br />
                    под ваш объект
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseWidget}
                  className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[24px] leading-none text-[#8a8a8a] transition hover:bg-[#f5eee4] hover:text-[#5f5f5f]"
                  aria-label="Закрыть виджет"
                  >
                    ×
                  </button>
              </div>

              <div className="px-4 py-4 sm:px-5 sm:py-5">
                {step === "details" ? (
                  <>
                    <label className="block">
                      <span className="text-[14px] font-semibold leading-[1.25] text-[#222222] sm:text-[15px]">
                        Что планируете ремонтировать?
                      </span>
                      <select
                        value={objectType}
                        onChange={(event) => setObjectType(event.target.value)}
                        className="mt-3 h-[52px] w-full rounded-full border border-[#ddd6cb] bg-white px-4 text-[15px] text-[#444444] outline-none transition focus:border-[#caa15f] sm:h-[54px] sm:text-[16px]"
                      >
                        {objectOptions.map((option) => (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="mt-4 block">
                      <span className="text-[14px] font-semibold leading-[1.25] text-[#222222] sm:text-[15px]">
                        Площадь объекта, м²
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={area}
                        onChange={(event) => setArea(event.target.value)}
                        placeholder="Например: 60"
                        className="mt-3 h-[52px] w-full rounded-full border border-[#ddd6cb] bg-white px-4 text-[15px] text-[#444444] outline-none transition placeholder:text-[#9c9c9c] focus:border-[#caa15f] sm:h-[54px] sm:text-[16px]"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="rounded-[18px] bg-[#f7f1e8] px-4 py-3 text-[13px] leading-[1.35] text-[#6a5a45] sm:text-[14px]">
                      Данные по объекту сохранены. Оставьте телефон, и мы
                      отправим расчёт.
                    </div>

                    <label className="mt-4 block">
                      <span className="text-[14px] font-semibold leading-[1.25] text-[#222222] sm:text-[15px]">
                        Ваш телефон
                      </span>
                      <input
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="mt-3 h-[52px] w-full rounded-full border border-[#ddd6cb] bg-white px-4 text-[15px] text-[#444444] outline-none transition placeholder:text-[#9c9c9c] focus:border-[#caa15f] sm:h-[54px] sm:text-[16px]"
                      />
                    </label>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleAction}
                  disabled={step === "details" ? !canContinue : !canSubmit}
                  className="mt-5 inline-flex h-[54px] w-full items-center justify-center rounded-full bg-[#caa15f] px-6 text-[17px] font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:bg-[#d8d1c7] sm:h-[56px] sm:text-[18px]"
                >
                  {step === "details" ? "Получить расчёт" : "Отправить заявку"}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-center text-[13px] leading-[1.2] text-[#7a7a7a] sm:text-[14px]">
                  <span className="text-[15px] text-[#b88d53] sm:text-[16px]">
                    🛡
                  </span>
                  <span>Ваши данные защищены</span>
                </div>
              </div>
          </div>
        ) : (
          <div className="pointer-events-auto ml-auto w-fit max-w-full">
            <div className="widget-pulse relative flex items-center justify-end gap-3">

              <div className="flex h-[52px] max-w-[220px] items-center rounded-full bg-white px-4 text-[13px] font-medium leading-[1.2] text-[#1f1f1f] shadow-[0_14px_34px_rgba(0,0,0,0.12)] min-[360px]:h-[56px] min-[360px]:max-w-[250px] min-[360px]:px-5 min-[360px]:text-[14px] sm:h-[60px] sm:max-w-[290px] sm:px-6 sm:text-[15px]">
                Расчитайте смету прямо сейчас за 1 минуту
              </div>

              <button
                type="button"
                onClick={handleOpenWidget}
                className="inline-flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#caa15f] shadow-[0_16px_34px_rgba(0,0,0,0.18)] transition hover:opacity-95 sm:h-[68px] sm:w-[68px]"
                aria-label="Открыть быстрый расчёт"
              >
                <Image
                  src="/images/icons/calculator.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="h-[30px] w-[30px] sm:h-[32px] sm:w-[32px]"
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {submitted ? (
        <SuccessGameModal isOpen={submitted} onClose={handleSuccessClose} />
      ) : null}

      <style jsx global>{`
        .widget-pulse {
          animation: widgetPulse 2.8s ease-in-out infinite;
          transform-origin: 100% 100%;
        }

        @keyframes widgetPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.035);
          }
        }
      `}</style>
    </>
  );
}
