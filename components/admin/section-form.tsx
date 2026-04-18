"use client";

import type {
  BenefitItem,
  EditableSectionKey,
  ProjectItem,
  QuizQuestion,
  SiteContent,
  TestimonialItem,
} from "@/types/site-content";

type SectionFormProps = {
  activeSection: EditableSectionKey;
  content: SiteContent;
  onChange: (content: SiteContent) => void;
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white p-6 text-zinc-950">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border border-zinc-200 px-4 outline-none transition-colors focus:border-[#ab8453]"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition-colors focus:border-[#ab8453]"
      />
    </label>
  );
}

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <textarea
        rows={Math.max(4, items.length + 1)}
        value={items.join("\n")}
        onChange={(event) => onChange(event.target.value.split("\n"))}
        className="rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition-colors focus:border-[#ab8453]"
      />
      <span className="text-xs text-zinc-500">Один пункт на строку.</span>
    </label>
  );
}

function BenefitEditor({
  items,
  onChange,
}: {
  items: BenefitItem[];
  onChange: (items: BenefitItem[]) => void;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="grid gap-3 rounded-2xl bg-zinc-50 p-4">
          <Field
            label={`Benefit ${index + 1}: заголовок`}
            value={item.title}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], title: value };
              onChange(next);
            }}
          />
          <TextareaField
            label={`Benefit ${index + 1}: описание`}
            value={item.description}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], description: value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ProjectsEditor({
  items,
  onChange,
}: {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="grid gap-3 rounded-2xl bg-zinc-50 p-4">
          <Field
            label={`Project ${index + 1}: заголовок`}
            value={item.title}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], title: value };
              onChange(next);
            }}
          />
          <Field
            label="Локация"
            value={item.location}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], location: value };
              onChange(next);
            }}
          />
          <div className="grid gap-3 md:grid-cols-3">
            <Field
              label="Цена"
              value={item.price}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], price: value };
                onChange(next);
              }}
            />
            <Field
              label="Срок"
              value={item.duration}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], duration: value };
                onChange(next);
              }}
            />
            <Field
              label="Формат"
              value={item.format}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], format: value };
                onChange(next);
              }}
            />
          </div>
          <TextareaField
            label="Что сделали"
            value={item.scope}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], scope: value };
              onChange(next);
            }}
          />
          <TextareaField
            label="Результат"
            value={item.result}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], result: value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function TestimonialsEditor({
  items,
  onChange,
}: {
  items: TestimonialItem[];
  onChange: (items: TestimonialItem[]) => void;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={`${item.name}-${index}`} className="grid gap-3 rounded-2xl bg-zinc-50 p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_100px]">
            <Field
              label="Имя"
              value={item.name}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], name: value };
                onChange(next);
              }}
            />
            <Field
              label="Объект"
              value={item.object}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], object: value };
                onChange(next);
              }}
            />
            <Field
              label="Инициал"
              value={item.initial}
              onChange={(value) => {
                const next = [...items];
                next[index] = { ...next[index], initial: value };
                onChange(next);
              }}
            />
          </div>
          <TextareaField
            label="Отзыв"
            value={item.quote}
            rows={5}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], quote: value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function QuizQuestionsEditor({
  items,
  onChange,
}: {
  items: QuizQuestion[];
  onChange: (items: QuizQuestion[]) => void;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={item.id} className="grid gap-3 rounded-2xl bg-zinc-50 p-4">
          <Field
            label={`Question ${index + 1}: id`}
            value={item.id}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], id: value };
              onChange(next);
            }}
          />
          <Field
            label="Заголовок вопроса"
            value={item.title}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], title: value };
              onChange(next);
            }}
          />
          <ListEditor
            label="Опции"
            items={item.options}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], options: value };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function SectionForm({ activeSection, content, onChange }: SectionFormProps) {
  const updateContent = (nextContent: SiteContent) => onChange(nextContent);

  if (activeSection === "hero") {
    return (
      <Card title="Hero">
        <Field
          label="Badge"
          value={content.hero.badge}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, badge: value } })
          }
        />
        <Field
          label="Title"
          value={content.hero.title}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, title: value } })
          }
        />
        <TextareaField
          label="Description"
          value={content.hero.description}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, description: value } })
          }
        />
        <ListEditor
          label="Repeated Offer"
          items={content.hero.repeatedOffer}
          onChange={(value) =>
            updateContent({ ...content, hero: { ...content.hero, repeatedOffer: value } })
          }
        />
        <div className="grid gap-3 rounded-2xl bg-zinc-50 p-4 md:grid-cols-3">
          <Field
            label="Price badge line 1"
            value={content.hero.priceBadge.line1}
            onChange={(value) =>
              updateContent({
                ...content,
                hero: {
                  ...content.hero,
                  priceBadge: { ...content.hero.priceBadge, line1: value },
                },
              })
            }
          />
          <Field
            label="Price badge line 2"
            value={content.hero.priceBadge.line2}
            onChange={(value) =>
              updateContent({
                ...content,
                hero: {
                  ...content.hero,
                  priceBadge: { ...content.hero.priceBadge, line2: value },
                },
              })
            }
          />
          <Field
            label="Price badge line 3"
            value={content.hero.priceBadge.line3}
            onChange={(value) =>
              updateContent({
                ...content,
                hero: {
                  ...content.hero,
                  priceBadge: { ...content.hero.priceBadge, line3: value },
                },
              })
            }
          />
        </div>
      </Card>
    );
  }

  if (activeSection === "benefits") {
    return (
      <Card title="Benefits">
        <Field
          label="Title"
          value={content.benefits.title}
          onChange={(value) =>
            updateContent({ ...content, benefits: { ...content.benefits, title: value } })
          }
        />
        <TextareaField
          label="Description"
          value={content.benefits.description}
          onChange={(value) =>
            updateContent({
              ...content,
              benefits: { ...content.benefits, description: value },
            })
          }
        />
        <BenefitEditor
          items={content.benefits.items}
          onChange={(value) =>
            updateContent({ ...content, benefits: { ...content.benefits, items: value } })
          }
        />
      </Card>
    );
  }

  if (activeSection === "leadMagnet") {
    return (
      <Card title="Lead Magnet">
        <Field
          label="Title"
          value={content.leadMagnet.title}
          onChange={(value) =>
            updateContent({
              ...content,
              leadMagnet: { ...content.leadMagnet, title: value },
            })
          }
        />
        <TextareaField
          label="Description"
          value={content.leadMagnet.description}
          onChange={(value) =>
            updateContent({
              ...content,
              leadMagnet: { ...content.leadMagnet, description: value },
            })
          }
        />
        <ListEditor
          label="Items"
          items={content.leadMagnet.items}
          onChange={(value) =>
            updateContent({
              ...content,
              leadMagnet: { ...content.leadMagnet, items: value },
            })
          }
        />
      </Card>
    );
  }

  if (activeSection === "quiz") {
    return (
      <Card title="Quiz">
        <Field
          label="Title"
          value={content.quiz.title}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, title: value } })
          }
        />
        <TextareaField
          label="Description"
          value={content.quiz.description}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, description: value } })
          }
        />
        <ListEditor
          label="Benefits"
          items={content.quiz.benefits}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, benefits: value } })
          }
        />
        <QuizQuestionsEditor
          items={content.quiz.questions}
          onChange={(value) =>
            updateContent({ ...content, quiz: { ...content.quiz, questions: value } })
          }
        />
      </Card>
    );
  }

  if (activeSection === "projects") {
    return (
      <Card title="Projects">
        <Field
          label="Title"
          value={content.projects.title}
          onChange={(value) =>
            updateContent({ ...content, projects: { ...content.projects, title: value } })
          }
        />
        <TextareaField
          label="Description"
          value={content.projects.description}
          onChange={(value) =>
            updateContent({
              ...content,
              projects: { ...content.projects, description: value },
            })
          }
        />
        <ProjectsEditor
          items={content.projects.items}
          onChange={(value) =>
            updateContent({ ...content, projects: { ...content.projects, items: value } })
          }
        />
      </Card>
    );
  }

  if (activeSection === "testimonials") {
    return (
      <Card title="Testimonials">
        <Field
          label="Title"
          value={content.testimonials.title}
          onChange={(value) =>
            updateContent({
              ...content,
              testimonials: { ...content.testimonials, title: value },
            })
          }
        />
        <TextareaField
          label="Description"
          value={content.testimonials.description}
          onChange={(value) =>
            updateContent({
              ...content,
              testimonials: { ...content.testimonials, description: value },
            })
          }
        />
        <TestimonialsEditor
          items={content.testimonials.items}
          onChange={(value) =>
            updateContent({
              ...content,
              testimonials: { ...content.testimonials, items: value },
            })
          }
        />
      </Card>
    );
  }

  if (activeSection === "contacts") {
    return (
      <Card title="Contacts">
        <Field
          label="Section title"
          value={content.contacts.title}
          onChange={(value) =>
            updateContent({ ...content, contacts: { ...content.contacts, title: value } })
          }
        />
        <TextareaField
          label="Section description"
          value={content.contacts.description}
          onChange={(value) =>
            updateContent({
              ...content,
              contacts: { ...content.contacts, description: value },
            })
          }
        />
        <ListEditor
          label="Section bullets"
          items={content.contacts.items}
          onChange={(value) =>
            updateContent({ ...content, contacts: { ...content.contacts, items: value } })
          }
        />
        <div className="grid gap-3 rounded-2xl bg-zinc-50 p-4 md:grid-cols-2">
          <Field
            label="Телефон"
            value={content.contact.phone}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, phone: value } })
            }
          />
          <Field
            label="График"
            value={content.contact.schedule}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, schedule: value } })
            }
          />
          <Field
            label="WhatsApp label"
            value={content.contact.whatsappLabel}
            onChange={(value) =>
              updateContent({
                ...content,
                contact: { ...content.contact, whatsappLabel: value },
              })
            }
          />
          <Field
            label="Telegram label"
            value={content.contact.telegramLabel}
            onChange={(value) =>
              updateContent({
                ...content,
                contact: { ...content.contact, telegramLabel: value },
              })
            }
          />
          <Field
            label="MAX label"
            value={content.contact.maxLabel}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, maxLabel: value } })
            }
          />
          <Field
            label="Email"
            value={content.contact.email}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, email: value } })
            }
          />
          <TextareaField
            label="Офис"
            value={content.contact.office}
            onChange={(value) =>
              updateContent({ ...content, contact: { ...content.contact, office: value } })
            }
          />
        </div>
      </Card>
    );
  }

  return (
    <Card title="Footer">
      <Field
        label="Subtitle"
        value={content.footer.subtitle}
        onChange={(value) =>
          updateContent({ ...content, footer: { ...content.footer, subtitle: value } })
        }
      />
      <Field
        label="Policy label"
        value={content.footer.policyLabel}
        onChange={(value) =>
          updateContent({ ...content, footer: { ...content.footer, policyLabel: value } })
        }
      />
      <Field
        label="Policy href"
        value={content.footer.policyHref}
        onChange={(value) =>
          updateContent({ ...content, footer: { ...content.footer, policyHref: value } })
        }
      />
    </Card>
  );
}
