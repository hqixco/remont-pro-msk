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

  return (
    <section id="quiz" className="px-6 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-[32px] bg-[linear-gradient(90deg,_#0d2c2c_0%,_#103334_100%)] p-8 text-white sm:p-10 lg:grid-cols-[1fr_560px]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/55">
            Квиз
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-balance">
            {content.title}
          </h2>
          <p className="max-w-xl text-lg leading-8 text-white/85">
            {content.description}
          </p>
          <ul className="grid gap-4">
            {content.benefits.map((item) => (
              <li key={item} className="flex items-start gap-4 text-lg leading-7">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-quiz-bg">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] bg-[#f7f6f4] p-6 text-zinc-950 sm:p-8">
          {submitted ? (
            <div className="space-y-4 rounded-[24px] bg-white p-6">
              <h3 className="text-2xl font-semibold">
                Спасибо! Заявка отправлена
              </h3>
              <p className="text-sm leading-7 text-zinc-600 sm:text-base">
                Мы свяжемся с вами в ближайшее время и отправим расчет.
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
              <div className="flex items-center justify-between text-sm text-zinc-600">
                <span>
                  Вопрос {step + 1} из {totalSteps}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {isFinalStep ? (
                <div className="mt-8 space-y-5">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {content.final.title}
                  </h3>
                  <p className="text-sm leading-7 text-zinc-600 sm:text-base">
                    {content.final.description}
                  </p>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Ваш телефон</span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={content.final.phonePlaceholder}
                      className="h-12 rounded-2xl border border-[#dcc9b5] bg-white px-4 outline-none transition-colors focus:border-accent"
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
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {currentQuestion.title}
                  </h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {currentQuestion.options.map((option) => {
                      const active = answers[currentQuestion.id] === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setAnswers((current) => ({
                              ...current,
                              [currentQuestion.id]: option,
                            }))
                          }
                          className={`min-h-24 rounded-[20px] border px-4 py-4 text-center text-sm leading-6 transition-all ${
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

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#dcc9b5] px-5 text-sm font-semibold text-zinc-700 disabled:opacity-40"
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-zinc-300"
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
