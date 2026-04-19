import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-white py-5 sm:py-6 md:py-7 xl:py-0">
      <div className="mx-auto max-w-[1180px] px-3 min-[360px]:px-4 md:px-6 xl:px-0">
        <div className="flex flex-col items-center gap-5 text-center md:gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-6 xl:text-left xl:h-[128px]">
          <div className="flex items-center justify-center gap-[14px] xl:justify-start xl:gap-[18px]">
            <div className="relative h-[52px] w-[52px] shrink-0 min-[360px]:h-[56px] min-[360px]:w-[56px] sm:h-[58px] sm:w-[58px] md:h-[62px] md:w-[62px]">
              <Image
                src="/images/logo-remont-pro.png"
                alt="Ремонт PRO"
                fill
                className="object-contain"
              />
            </div>

            <div className="min-w-0 text-left">
              <div className="text-[20px] font-extrabold leading-[1.08] text-black min-[360px]:text-[21px] sm:text-[22px] md:text-[24px]">
                Ремонт PRO
              </div>
              <div className="mt-[6px] text-[14px] leading-[1.2] text-black sm:text-[15px]">
                Ремонт под ключ в Москве
              </div>
            </div>
          </div>

          <a
            href="/policy"
            className="text-[15px] leading-[1.3] text-[#ff8f75] underline underline-offset-[5px] decoration-[1px] hover:opacity-80 sm:text-[16px] md:text-[17px]"
          >
            Политика конфиденциальности
          </a>

          <div className="text-center xl:text-right">
            <a
              href="tel:+74951204567"
              className="text-[22px] font-extrabold leading-[1.08] text-black sm:text-[24px] md:text-[26px]"
            >
              +7 (495) 120-45-67
            </a>
            <div className="mt-[8px] text-[14px] leading-[1.2] text-black sm:text-[15px]">
              Ежедневно с 9:00 до 21:00
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
