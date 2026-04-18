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
    <section id="contact" className="bg-[#f3f3f3] py-[72px]">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-0">
        <div className="text-center">
          <h2 className="text-[45px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black">
            Обсудим ваш ремонт
            <br />
            и подготовим расчёт
          </h2>

          <p className="mx-auto mt-[26px] max-w-[860px] text-[20px] leading-[1.32] text-black">
            Оставьте заявку удобным способом — рассчитаем стоимость,
            <br />
            сроки и предложим подходящий формат ремонта под ваш объект.
          </p>
        </div>

        <div className="mt-[52px] grid grid-cols-[520px_1fr] items-start gap-[52px]">
          <div>
            <h3 className="text-[28px] font-extrabold leading-[1.18] text-black">
              Что вы получите после обращения:
            </h3>

            <div className="mt-[28px] flex max-w-[520px] flex-wrap gap-[14px]">
              {benefitItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex h-[42px] items-center gap-[10px] rounded-full bg-[#ececec] px-[18px]"
                >
                  <span className="text-[20px] leading-none text-[#72c414]">
                    ✓
                  </span>
                  <span className="text-[16px] font-medium leading-[1.05] text-black">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-[32px] space-y-[18px]">
              {contacts.map((item) => (
                <div key={item.label} className="flex items-start gap-[12px]">
                  {item.iconType === "image" ? (
                    <Image
                      src={item.icon}
                      alt=""
                      width={22}
                      height={22}
                      className="mt-[2px] h-[22px] w-[22px] shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="mt-[2px] text-[22px] leading-none"
                      style={{ color: item.iconColor }}
                    >
                      {item.icon}
                    </span>
                  )}

                  <div className="text-[18px] leading-[1.35] text-black">
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

          <div className="overflow-hidden rounded-[28px]">
            <iframe
              title="Карта офиса Ремонт PRO"
              src="https://yandex.ru/map-widget/v1/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%2C%20%D0%B4.%2015%2C%20%D0%B2%D1%85%D0%BE%D0%B4%20%D1%81%20%D1%82%D0%BE%D1%80%D1%86%D0%B0&z=16"
              className="h-[535px] w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
