import Image from "next/image";

const youtubeItems = [
  "Показываем\nреальные ремонты\nи делимся честным\nопытом",
  "Рассказываем о\nрешениях,\nматериалах и\nнюансах, о которых\nне пишут в блогах",
  "Отвечаем на\nвопросы и помогаем\nизбежать ошибок",
  "Новые видео\nкаждую неделю",
];

export function YouTubeSection() {
  return (
    <section className="bg-[#f3f3f3] py-[72px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[420px_1fr] gap-[56px] px-6 lg:px-0">
        <div className="pt-[18px]">
          <div className="flex items-center gap-[18px]">
            <h2 className="text-[45px] font-extrabold leading-[1.04] tracking-[-0.03em] text-black">
              Мы на YouTube
            </h2>

            <Image
              src="/images/youtube-icon.png"
              alt=""
              width={52}
              height={52}
              className="h-[52px] w-[52px] object-contain"
              aria-hidden="true"
            />
          </div>

          <p className="mt-[26px] max-w-[360px] text-[20px] leading-[1.35] text-[#222222]">
            Следующим сюжетом может стать Ваша квартира
          </p>

          <div className="mt-[26px] grid grid-cols-2 gap-[16px]">
            {youtubeItems.map((item) => (
              <div
                key={item}
                className="min-h-[122px] rounded-[2px] bg-white px-[22px] py-[18px] shadow-[0_12px_32px_rgba(0,0,0,0.05)]"
              >
                <p className="whitespace-pre-line text-[16px] font-normal leading-[1.38] text-[#1f1f1f]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-[6px]">
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
