import type { TestimonialsContent } from "@/types/site-content";

export function ReviewsSection({
  content,
}: {
  content: TestimonialsContent;
}) {
  return (
    <section className="bg-[#f3f3f3] py-8 md:py-12 lg:py-14 xl:py-[72px]">
      <div className="mx-auto max-w-[1280px] px-3 min-[360px]:px-4 md:px-6 xl:px-0">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="text-[25px] font-extrabold leading-[1.08] tracking-[-0.02em] text-black sm:text-[25px] md:text-[44px] lg:text-[42px] xl:text-[45px]">
            {content.title}
          </h2>

          <p className="mx-auto mt-4 text-[16px] leading-[1.36] text-black min-[360px]:text-[17px] min-[390px]:text-[18px] sm:mt-5 sm:text-[18px] md:mt-6 md:text-[19px] lg:text-[18px] xl:mt-[22px] xl:text-[20px] xl:leading-[1.3]">
            {content.description}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 xl:mt-12 xl:grid-cols-4 xl:gap-6">
          {content.items.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="rounded-[24px] border border-[#dddddd] bg-[#f7f7f7] px-5 pb-5 pt-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] min-[360px]:px-6 min-[360px]:pb-6 min-[360px]:pt-6"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#be995a] text-[20px] font-bold text-white">
                  {item.initial}
                </span>

                <div className="min-w-0">
                  <div className="text-[18px] font-semibold leading-[1.2] text-black">
                    {item.name}
                  </div>
                  <div className="mt-1 text-[15px] leading-[1.35] text-[#4b4b4b]">
                    {item.object}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[22px] leading-none tracking-[3px] text-[#e1bf10]">
                ★★★★★
              </div>

              <p className="mt-4 text-[16px] leading-[1.52] text-black">
                {item.quote}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href={content.cta.href}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#be995a] px-6 py-3 text-[16px] font-semibold text-white transition hover:bg-[#aa874d]"
          >
            {content.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
