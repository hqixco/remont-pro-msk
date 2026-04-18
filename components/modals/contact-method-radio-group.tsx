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
    <div>
      <div className="text-[16px] font-medium leading-[1.2] text-[#4d4d4d]">
        Удобный способ связи:
      </div>

      <div className="mt-[14px] grid grid-cols-2 gap-[16px]">
        <RadioCard
          label="Связаться в MAX"
          icon={
            <span className="inline-flex h-[34px] items-center justify-center">
              <Image
                src="/images/icons/max-contact.png"
                alt=""
                width={34}
                height={34}
                className="h-[34px] w-auto"
              />
            </span>
          }
          checked={value === "max"}
          onClick={() => onChange("max")}
        />

        <RadioCard
          label="Связаться по телефону"
          icon={
            <span className="inline-flex h-[34px] items-center justify-center">
              <Image
                src="/images/icons/phone-contact.svg"
                alt=""
                width={34}
                height={34}
                className="h-[34px] w-auto"
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
      className={`flex h-[64px] items-center justify-between rounded-[18px] border px-[16px] text-left transition ${
        checked
          ? "border-[#c79a58] bg-[#f8f2e9]"
          : "border-[#d8d8d8] bg-white"
      }`}
    >
      <span className="flex items-center gap-[12px]">
        {icon}
        <span className="text-[14px] font-medium leading-[1.2] text-[#2f2f2f]">
          {label}
        </span>
      </span>

      <span
        className={`inline-flex h-[24px] w-[24px] items-center justify-center rounded-full border ${
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
