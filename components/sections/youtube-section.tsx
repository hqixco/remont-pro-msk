import Image from "next/image";

const youtubeItems = [
  "Показываем\nреальные ремонты\nи делимся честным\nопытом",
  "Рассказываем о\nрешениях,\nматериалах и\nнюансах, о которых\nне пишут в блогах",
  "Отвечаем на\nвопросы и помогаем\nизбежать ошибок",
  "Новые видео\nкаждую неделю",
];

export function YouTubeSection() {
  return (
    <section className="bg-[#f3f3f3] py-8 md:py-12 lg:py-14 xl:py-[72px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 px-3 min-[360px]:px-4 md:gap-8 md:px-6 lg:gap-8 xl:grid-cols-[420px_1fr] xl:gap-[56px] xl:px-0">
        <div className="pt-1 md:pt-2 xl:pt-[18px]">
          <div className="flex flex-wrap items-center gap-3 min-[360px]:gap-4 xl:gap-[18px]">
              <h2 className="text-[25px] font-extrabold leading-[1.06] tracking-[-0.03em] text-black sm:text-[25px] md:text-[44px] lg:text-[42px] xl:text-[45px]">
              Мы на YouTube
            </h2>

            <Image
              src="/images/youtube-icon.png"
              alt=""
              width={52}
              height={52}
              className="h-[34px] w-[34px] shrink-0 object-contain min-[360px]:h-[38px] min-[360px]:w-[38px] md:h-[42px] md:w-[42px] xl:h-[52px] xl:w-[52px]"
              aria-hidden="true"
            />
          </div>

          <p className="mt-4 max-w-[360px] text-[16px] leading-[1.35] text-[#222222] min-[360px]:text-[17px] min-[390px]:text-[18px] sm:mt-5 sm:text-[19px] md:text-[20px] xl:mt-[26px] xl:text-[20px]">
            Следующим сюжетом может стать Ваша квартира
          </p>

          <div className="mt-5 xl:hidden">
            <div className="overflow-hidden rounded-[22px] bg-black shadow-[0_16px_40px_rgba(0,0,0,0.10)] min-[360px]:rounded-[24px] md:rounded-[26px]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/youtube-screen.png"
                  alt="YouTube-канал Ремонт PRO"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 min-[390px]:gap-4 md:mt-6 md:gap-4 lg:grid-cols-2 xl:mt-[26px] xl:gap-[16px]">
            {youtubeItems.map((item) => (
              <div
                key={item}
                className="rounded-[2px] bg-white px-4 py-4 shadow-[0_12px_32px_rgba(0,0,0,0.05)] min-[360px]:px-5 min-[360px]:py-5 md:px-5 md:py-5 xl:min-h-[122px] xl:px-[22px] xl:py-[18px]"
              >
                <p className="whitespace-normal text-[15px] font-normal leading-[1.36] text-[#1f1f1f] min-[360px]:text-[16px] sm:text-[17px] md:text-[16px] xl:whitespace-pre-line xl:text-[16px] xl:leading-[1.38]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden pt-[6px] xl:block">
          <div className="overflow-hidden rounded-[30px] bg-black shadow-[0_16px_40px_rgba(0,0,0,0.10)]">
            <div className="relative h-[455px] w-full">
              <Image
                src="/images/youtube-screen.png"
                alt="YouTube-канал Ремонт PRO"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
