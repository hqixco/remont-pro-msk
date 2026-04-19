import Image from "next/image";

const benefitItems = [
  "предварительную смету",
  "сроки выполнения работ",
  "3 варианта расчёта под бюджет",
  "консультацию по этапам ремонта",
];

const contacts = [
  {
    icon: "/images/icons/phone-contact.svg",
    iconType: "image",
    iconColor: "#b58d57",
    label: "Телефон:",
    value: "+7 (495) 120-45-67",
    valueClassName: "text-black",
    href: "tel:+74951204567",
  },
  {
    icon: "/images/icons/whatsapp-contact.svg",
    iconType: "image",
    iconColor: "#35b86b",
    label: "WhatsApp:",
    value: "написать менеджеру",
    valueClassName: "text-black",
    href: "#",
  },
  {
    icon: "/images/icons/telegram-contact.svg",
    iconType: "image",
    iconColor: "#38a6e8",
    label: "Telegram:",
    value: "написать в Telegram",
    valueClassName: "text-black",
    href: "#",
  },
  {
    icon: "/images/icons/max-contact.png",
    iconType: "image",
    iconColor: "#6c63ff",
    label: "MAX:",
    value: "написать в MAX",
    valueClassName: "text-black",
    href: "#",
  },
  {
    icon: "/images/icons/email-contact.svg",
    iconType: "image",
    iconColor: "#b58d57",
    label: "Email:",
    value: "info@site.ru",
    valueClassName: "text-[#ff7a59]",
    href: "mailto:info@site.ru",
  },
  {
    icon: "/images/icons/marker.svg",
    iconType: "image",
    iconColor: "#b58d57",
    label: "Офис:",
    value: "Москва, Ленинский проспект, д. 15, вход с торца",
    valueClassName: "text-black",
    href: undefined,
  },
];

export function ContactsSection() {
  return (
    <section id="contact" className="bg-[#f3f3f3] py-8 md:py-12 lg:py-14 xl:py-[72px]">
      <div className="mx-auto max-w-[1180px] px-3 min-[360px]:px-4 md:px-6 xl:px-0">
        <div className="text-center">
          <h2 className="text-[25px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black sm:text-[25px] md:text-[44px] lg:text-[42px] xl:text-[45px]">
            Обсудим ваш ремонт
            <br />
            и подготовим расчёт
          </h2>

          <p className="mx-auto mt-4 max-w-[860px] text-[16px] leading-[1.36] text-black min-[360px]:text-[17px] min-[390px]:text-[18px] sm:mt-5 sm:text-[18px] md:mt-6 md:text-[19px] lg:text-[18px] xl:mt-[26px] xl:text-[20px] xl:leading-[1.32]">
            Оставьте заявку удобным способом — рассчитаем стоимость,
            <br className="hidden xl:block" />
            сроки и предложим подходящий формат ремонта под ваш объект.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:gap-8 xl:mt-[52px] xl:grid-cols-[520px_1fr] xl:items-start xl:gap-[52px]">
          <div className="text-center xl:text-left">
            <h3 className="text-[24px] font-extrabold leading-[1.18] text-black min-[360px]:text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[28px]">
              Что вы получите после обращения:
            </h3>

              <div className="mt-5 flex flex-col items-center gap-3 min-[390px]:flex-row min-[390px]:flex-wrap min-[390px]:justify-center md:mt-6 md:gap-4 xl:mt-[28px] xl:max-w-[520px] xl:justify-start xl:gap-[14px]">
              {benefitItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex min-h-[42px] w-full items-center gap-[10px] rounded-full bg-[#ececec] px-4 py-[10px] min-[390px]:w-auto min-[390px]:px-[18px]"
                >
                  <span className="shrink-0 text-[18px] leading-none text-[#72c414] min-[360px]:text-[20px]">
                    ✓
                  </span>
                  <span className="text-left text-[15px] font-medium leading-[1.1] text-black min-[360px]:text-[16px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-4 min-[360px]:space-y-[16px] md:mt-8 md:space-y-[18px] xl:mt-[32px]">
              {contacts.map((item) => (
                <div key={item.label} className="flex min-w-0 items-start justify-start gap-[12px]">
                  {item.iconType === "image" ? (
                    <Image
                      src={item.icon}
                      alt=""
                      width={22}
                      height={22}
                      className="mt-[2px] h-[20px] w-[20px] shrink-0 min-[360px]:h-[22px] min-[360px]:w-[22px]"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="mt-[2px] shrink-0 text-[20px] leading-none min-[360px]:text-[22px]"
                      style={{ color: item.iconColor }}
                    >
                      {item.icon}
                    </span>
                  )}

                  <div className="min-w-0 text-left text-[15px] leading-[1.4] text-black min-[360px]:text-[16px] sm:text-[17px] md:text-[18px] xl:text-[18px] xl:leading-[1.35]">
                    <span className="font-extrabold">{item.label}</span>{" "}
                    {item.href ? (
                      <a href={item.href} className={item.valueClassName}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={item.valueClassName}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] min-[360px]:rounded-[26px] xl:rounded-[28px]">
            <iframe
              title="Карта офиса Ремонт PRO"
              src="https://yandex.ru/map-widget/v1/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%2C%20%D0%B4.%2015%2C%20%D0%B2%D1%85%D0%BE%D0%B4%20%D1%81%20%D1%82%D0%BE%D1%80%D1%86%D0%B0&z=16"
              className="h-[280px] w-full border-0 min-[360px]:h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] xl:h-[535px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
