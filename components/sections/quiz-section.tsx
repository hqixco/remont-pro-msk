"use client";

import {
  ContactMethodRadioGroup,
  type ContactMethod,
} from "@/components/modals/contact-method-radio-group";
import type { QuizContent } from "@/types/site-content";
import { useMemo, useState } from "react";

function getInitialContactMethod(methods: string[]): ContactMethod {
  return methods[0]?.toLowerCase().includes("max") ? "max" : "phone";
}

export function QuizSection({ content }: { content: QuizContent }) {
  const initialContactMethod = getInitialContactMethod(
    content.final.contactMethods
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] =
    useState<ContactMethod>(initialContactMethod);
  const [submitted, setSubmitted] = useState(false);

  const isFinalStep = step === content.questions.length;
  const totalSteps = content.questions.length + 1;
  const progress = Math.round(((step + 1) / totalSteps) * 100);
  const currentQuestion = content.questions[step];

  const canGoNext = useMemo(() => {
    if (isFinalStep) {
      return phone.trim().length >= 10;
    }

    return Boolean(answers[currentQuestion.id]);
  }, [answers, currentQuestion, isFinalStep, phone]);

  function handleNext() {
    if (!canGoNext) {
      return;
    }

    if (isFinalStep) {
      setSubmitted(true);
      return;
    }

    setStep((value) => value + 1);
  }

  function handleBack() {
    if (submitted) {
      setSubmitted(false);
      return;
    }

    setStep((value) => Math.max(0, value - 1));
  }

  function handleOptionSelect(option: string) {
    if (isFinalStep) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: option,
    }));

    setStep((value) => Math.min(content.questions.length, value + 1));
  }

  return (
    <section
      id="quiz"
      className="overflow-x-clip px-3 py-8 min-[360px]:px-4 min-[360px]:py-10 sm:px-6 sm:py-12 md:px-6 md:py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-12"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-5 overflow-hidden rounded-[28px] bg-[linear-gradient(90deg,_#0d2c2c_0%,_#103334_100%)] p-4 text-white min-[360px]:gap-6 min-[360px]:p-5 sm:p-6 md:gap-7 md:p-7 lg:gap-6 lg:p-8 xl:grid-cols-[1fr_560px] xl:gap-8 xl:rounded-[32px] xl:p-10">
        <div className="min-w-0 space-y-6 text-center xl:text-left">
          <h2 className="text-[25px] font-semibold leading-[1.08] tracking-tight text-balance sm:text-[25px] md:text-[40px] lg:text-[42px] xl:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-xl text-[16px] leading-7 text-white/85 min-[360px]:text-[17px] sm:text-[18px] md:text-[19px] lg:text-[20px] xl:mx-0 xl:text-lg xl:leading-8">
            {content.description}
          </p>
          <ul className="mx-auto grid max-w-xl gap-3 text-left min-[360px]:gap-4 md:gap-4 xl:mx-0">
            {content.benefits.map((item) => (
              <li
                key={item}
                className="flex min-w-0 items-start justify-start gap-3 text-[16px] leading-6 min-[360px]:gap-4 min-[360px]:text-[17px] sm:text-[18px] sm:leading-7 md:text-[19px] lg:text-[20px] xl:text-lg"
              >
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-quiz-bg">
                  ✓
                </span>
                <span className="min-w-0 text-left">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[24px] bg-[#f7f6f4] p-4 text-center text-zinc-950 min-[360px]:p-5 sm:p-6 md:p-7 xl:rounded-[28px] xl:p-8 xl:text-left">
          {submitted ? (
            <div className="space-y-4 rounded-[24px] bg-white p-5 min-[360px]:p-6">
              <h3 className="text-[24px] font-semibold leading-[1.15] min-[360px]:text-[26px]">
                Спасибо! Заявка отправлена
              </h3>
              <p className="text-sm leading-7 text-zinc-600 sm:text-base">
                Мы свяжемся с вами в ближайшее время и отправим расчёт.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setPhone("");
                  setAnswers({});
                  setContactMethod(initialContactMethod);
                }}
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white"
              >
                Пройти заново
              </button>
            </div>
          ) : (
            <>
              <div className="flex min-w-0 items-center justify-between gap-3 text-[13px] text-zinc-600 min-[360px]:text-sm sm:text-[15px] md:text-[16px]">
                <span className="min-w-0 text-left">
                  Вопрос {step + 1} из {totalSteps}
                </span>
                <span className="shrink-0">{progress}%</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {isFinalStep ? (
                <div className="mt-6 min-w-0 space-y-5 min-[360px]:mt-7 md:mt-8">
                  <h3 className="break-words text-[24px] font-semibold leading-[1.15] tracking-tight min-[360px]:text-[26px] sm:text-[28px]">
                    {content.final.title}
                  </h3>
                  <p className="text-sm leading-7 text-zinc-600 sm:text-base">
                    {content.final.description}
                  </p>
                  <label className="grid gap-2 text-left">
                    <span className="text-sm font-medium">Ваш телефон</span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={content.final.phonePlaceholder}
                      className="h-12 w-full rounded-[20px] border border-[#dcc9b5] bg-white px-4 outline-none transition-colors focus:border-accent"
                    />
                  </label>
                  <ContactMethodRadioGroup
                    value={contactMethod}
                    onChange={setContactMethod}
                  />
                  <p className="text-xs leading-6 text-zinc-500">
                    Нажимая кнопку, вы соглашаетесь с политикой
                    конфиденциальности
                  </p>
                </div>
              ) : (
                <div className="mt-6 min-w-0 min-[360px]:mt-7 md:mt-8">
                  <h3 className="break-words text-[24px] font-semibold leading-[1.15] tracking-tight min-[360px]:text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-2xl">
                    {currentQuestion.title}
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-3">
                    {currentQuestion.options.map((option) => {
                      const active = answers[currentQuestion.id] === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleOptionSelect(option)}
                          className={`min-h-[72px] w-full rounded-[18px] border px-4 py-4 text-center text-[15px] leading-[1.3] transition-all min-[360px]:min-h-[78px] min-[360px]:text-[16px] sm:min-h-[86px] sm:text-[17px] md:text-[18px] ${
                            active
                              ? "border-accent bg-[#f2e5d7]"
                              : "border-[#dcc9b5] bg-white hover:border-accent hover:-translate-y-0.5"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 min-[360px]:mt-7 sm:mt-8 sm:flex-row">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#dcc9b5] px-5 text-sm font-semibold text-zinc-700 disabled:opacity-40 sm:w-auto sm:min-w-[120px]"
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-zinc-300 sm:flex-1"
                >
                  {isFinalStep ? "Получить расчёт" : "Далее"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
