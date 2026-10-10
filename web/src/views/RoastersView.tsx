"use client";

import { InquiryForm } from "@/components/InquiryForm";
import { Band, PageHeader, Reveal, SectionHeading } from "@/components/ui";
import { useLang } from "@/lib/i18n";

// Supplier application (brief §6.5, §4.3–4.4, Journey E §7).
export function RoastersView() {
  const { t } = useLang();
  const r = t.roasters;
  const f = r.form;

  return (
    <>
      <PageHeader eyebrow={r.eyebrow} title={r.title} lead={r.lead} tone="accent-soft" next="paper" />

      {/* What we ask for */}
      <Band tone="paper" prev="accent-soft" next="tint-2">
        <div className="container-k grid gap-10 py-16 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={r.ask.eyebrow} title={r.ask.title} />
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {r.ask.items.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 50} className="flex gap-4 bg-surface p-5 md:p-6">
                <span aria-hidden className="mt-1 size-2 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Band>

      {/* How review works */}
      <Band tone="tint-2" prev="paper" next="paper">
        <div className="container-k py-16 md:py-24">
          <Reveal>
            <SectionHeading eyebrow={r.steps.eyebrow} title={r.steps.title} />
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {r.steps.items.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 70} className="border-t border-ink/20 pt-5">
                <span aria-hidden className="font-[family-name:var(--font-serif)] text-3xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold">{s.name}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <p className="mt-10 inline-block rounded-full border border-ink/20 px-4 py-2 text-sm">
              <span aria-hidden className="mr-2 text-accent-strong">ⓘ</span>
              {r.steps.note}
            </p>
          </Reveal>
        </div>
      </Band>

      {/* Application */}
      <Band tone="paper" prev="tint-2" next="dark">
        <div className="container-k py-16 md:py-24">
          <Reveal className="mx-auto max-w-2xl">
            <InquiryForm
              title={f.title}
              fields={[
                { name: "business", label: f.business, error: f.errorBusiness, autoComplete: "organization" },
                { name: "name", label: f.name, error: f.errorName, autoComplete: "name" },
                { name: "location", label: f.location, autoComplete: "address-level2" },
                { name: "products", label: f.products, hint: f.productsHint, error: f.errorProducts, multiline: true },
              ]}
              submit={f.submit}
              sent={f.sent}
              waIntro={f.waIntro}
              requiredLabel={f.required}
              note={f.privacy}
            />
          </Reveal>
        </div>
      </Band>
    </>
  );
}
