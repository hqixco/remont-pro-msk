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
    <section className="bg-[#f3f3f3] py-[64px]">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-0">
        <div className="mx-auto max-w-[860px] text-center">
          <div className="inline-flex items-end justify-center gap-[10px]">
            <h2 className="text-center text-[45px] font-extrabold leading-[1.06] tracking-[-0.02em] text-black">
              Защищаем Вас от главных
              <br />
              рисков ремонта
            </h2>
          </div>

          <p className="mx-auto mt-[22px] max-w-[920px] text-[20px] font-normal leading-[1.3] text-[#111111]">
            Прозрачно фиксируем стоимость, сроки и порядок оплаты, чтобы
            <br />
            вы не столкнулись с доплатами, затяжкой работ и хаосом на объекте.
          </p>
        </div>

        <div className="mt-[42px] grid grid-cols-3 gap-x-[38px] gap-y-[34px]">
          {benefitItems.map((item) => (
            <article
              key={item.title}
              className="min-h-[158px] bg-white px-[34px] pb-[22px] pt-[24px]"
            >
              <div className="flex items-start gap-[14px]">
                <div className="relative mt-[2px] h-[34px] w-[34px] shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.iconAlt}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="max-w-[260px] whitespace-pre-line text-[20px] font-bold leading-[1.18] text-black">
                  {item.title}
                </h3>
              </div>

              <p className="mt-[18px] max-w-[300px] whitespace-pre-line text-[18px] font-normal leading-[1.28] text-[#111111]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
