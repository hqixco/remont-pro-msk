import Image from "next/image";

const benefitItems = [
  {
    title: "Стоимость фиксируется\nдо старта",
    description:
      "Согласовываем смету заранее\nи не меняем её без вашего\nподтверждения.",
    icon: "/images/trust/icon-cost.svg",
    iconAlt: "Стоимость фиксируется до старта",
  },
  {
    title: "Сроки понятны заранее",
    description:
      "До начала ремонта вы получаете\nкалендарный план с этапами работ.",
    icon: "/images/trust/icon-calendar.svg",
    iconAlt: "Сроки понятны заранее",
  },
  {
    title: "Оплата не вперёд,\nа по этапам",
    description:
      "Платите за фактически\nвыполненные и принятые\nработы.",
    icon: "/images/trust/icon-payment.svg",
    iconAlt: "Оплата по этапам",
  },
  {
    title: "Один ответственный\nза объект",
    description:
      "У вас есть прораб, который ведёт\nобъект и всегда на связи.",
    icon: "/images/trust/icon-manager.svg",
    iconAlt: "Один ответственный за объект",
  },
  {
    title: "Контроль без лишних\nпоездок",
    description:
      "Получаете фото- и видеоотчёты\nпо ходу ремонта.",
    icon: "/images/trust/icon-control.svg",
    iconAlt: "Контроль без лишних поездок",
  },
  {
    title: "Гарантии прописаны\nв договоре",
    description:
      "Все ключевые условия\nзакрепляются документально.",
    icon: "/images/trust/icon-guarantee.svg",
    iconAlt: "Гарантии прописаны в договоре",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-[#f3f3f3] pb-10 pt-8 min-[360px]:pb-12 min-[360px]:pt-10 md:pb-14 md:pt-12 lg:pb-16 lg:pt-14 xl:py-[64px]">
      <div className="mx-auto max-w-[1180px] px-3 min-[360px]:px-4 md:px-6 xl:px-0">
        <div className="mx-auto max-w-[860px] text-center">
          <div className="inline-flex items-end justify-center gap-[10px]">
            <h2 className="text-center text-[25px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black sm:text-[25px] md:text-[44px] lg:text-[42px] xl:text-[45px]">
              Защищаем Вас от главных
              <br />
              рисков ремонта
            </h2>
          </div>

          <p className="mx-auto mt-4 max-w-[760px] text-[16px] font-normal leading-[1.36] text-[#111111] min-[360px]:text-[17px] min-[390px]:text-[18px] sm:mt-5 sm:max-w-[700px] md:mt-6 md:max-w-[760px] md:text-[19px] lg:max-w-[820px] lg:text-[18px] xl:mt-[22px] xl:max-w-[920px] xl:text-[20px] xl:leading-[1.3]">
            Прозрачно фиксируем стоимость, сроки и порядок оплаты, чтобы
            <br className="hidden xl:block" />
            вы не столкнулись с доплатами, затяжкой работ и хаосом на объекте.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 min-[360px]:gap-4 sm:mt-8 sm:gap-5 md:mt-10 md:grid-cols-2 md:gap-x-5 md:gap-y-5 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6 xl:mt-[42px] xl:grid-cols-3 xl:gap-x-[38px] xl:gap-y-[34px]">
          {benefitItems.map((item) => (
            <article
              key={item.title}
              className="bg-white px-4 pb-4 pt-4 text-left min-[360px]:px-5 min-[360px]:pb-5 min-[360px]:pt-5 sm:px-6 sm:pb-6 sm:pt-6 md:min-h-[180px] md:px-5 md:pb-5 md:pt-5 lg:min-h-[190px] lg:px-6 xl:min-h-[158px] xl:px-[34px] xl:pb-[22px] xl:pt-[24px]"
            >
              <div className="flex items-start justify-start gap-3 min-[360px]:gap-4">
                <div className="relative mt-[2px] h-[34px] w-[34px] shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.iconAlt}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="max-w-full whitespace-pre-line text-left text-[17px] font-bold leading-[1.18] text-black min-[360px]:text-[18px] sm:text-[19px] md:text-[18px] lg:text-[19px] xl:max-w-[260px] xl:text-[20px]">
                  {item.title}
                </h3>
              </div>

              <p className="mt-3 max-w-full whitespace-pre-line text-left text-[15px] font-normal leading-[1.34] text-[#111111] min-[360px]:mt-4 min-[360px]:text-[16px] sm:text-[17px] md:text-[16px] lg:text-[17px] xl:mt-[18px] xl:max-w-[300px] xl:text-[18px] xl:leading-[1.28]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
