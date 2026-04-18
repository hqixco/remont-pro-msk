import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex h-[128px] max-w-[1180px] items-center justify-between px-6 lg:px-0">
        <div className="flex items-start gap-[18px]">
          <div className="relative h-[62px] w-[62px] shrink-0">
            <Image
              src="/images/logo-remont-pro.png"
              alt="Ремонт PRO"
              fill
              className="object-contain"
            />
          </div>

          <div className="pt-[4px]">
            <div className="text-[22px] font-extrabold leading-[1.08] text-black">
              Ремонт PRO
            </div>
            <div className="mt-[7px] text-[14px] leading-[1.2] text-black">
              Ремонт под ключ в Москве
            </div>
          </div>
        </div>

        <a
          href="/policy"
          className="text-[16px] leading-none text-[#ff8f75] underline underline-offset-[5px] decoration-[1px] hover:opacity-80"
        >
          Политика конфиденциальности
        </a>

        <div className="text-right">
          <div className="text-[22px] font-extrabold leading-[1.08] text-black">
            +7 (495) 120-45-67
          </div>
          <div className="mt-[8px] text-[14px] leading-[1.2] text-black">
            Ежедневно с 9:00 до 21:00
          </div>
        </div>
      </div>
    </footer>
  );
}
