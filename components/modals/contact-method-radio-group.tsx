"use client";

import Image from "next/image";

export type ContactMethod = "max" | "phone";

type ContactMethodRadioGroupProps = {
  value: ContactMethod;
  onChange: (value: ContactMethod) => void;
};

export function ContactMethodRadioGroup({
  value,
  onChange,
}: ContactMethodRadioGroupProps) {
  return (
    <div className="min-w-0">
      <div className="text-[15px] font-medium leading-[1.2] text-[#4d4d4d] sm:text-[16px]">
        Удобный способ связи:
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-[14px] sm:gap-4 min-[1300px]:grid-cols-2 min-[1300px]:gap-[16px]">
        <RadioCard
          label="Связаться в MAX"
          icon={
            <span className="inline-flex h-[30px] shrink-0 items-center justify-center sm:h-[34px]">
              <Image
                src="/images/icons/max-contact.png"
                alt=""
                width={34}
                height={34}
                className="h-[30px] w-auto sm:h-[34px]"
              />
            </span>
          }
          checked={value === "max"}
          onClick={() => onChange("max")}
        />

        <RadioCard
          label="Связаться по телефону"
          icon={
            <span className="inline-flex h-[30px] shrink-0 items-center justify-center sm:h-[34px]">
              <Image
                src="/images/icons/phone-contact.svg"
                alt=""
                width={34}
                height={34}
                className="h-[30px] w-auto sm:h-[34px]"
              />
            </span>
          }
          checked={value === "phone"}
          onClick={() => onChange("phone")}
        />
      </div>
    </div>
  );
}

function RadioCard({
  label,
  icon,
  checked,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[60px] w-full min-w-0 items-center justify-between gap-3 rounded-[360px] border px-4 py-3 text-left transition sm:min-h-[64px] min-[1300px]:h-[64px] min-[1300px]:px-[16px] ${
        checked
          ? "border-[#c79a58] bg-[#f8f2e9]"
          : "border-[#d8d8d8] bg-white"
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        {icon}
        <span className="min-w-0 break-words text-[13px] font-medium leading-[1.2] text-[#2f2f2f] sm:text-[14px]">
          {label}
        </span>
      </span>

      <span
        className={`inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border text-[12px] sm:h-[24px] sm:w-[24px] ${
          checked
            ? "border-[#c79a58] bg-[#c79a58] text-white"
            : "border-[#a9a9a9] bg-white text-transparent"
        }`}
      >
        ●
      </span>
    </button>
  );
}
