"use client";

import { InquiryForm } from "@/components/InquiryForm";
import { Band, PageHeader, Reveal } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { SITE, whatsappLink } from "@/lib/site";

export function ContactView() {
  const { t } = useLang();
  const c = t.contact;
  const f = c.form;

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="tint-3" next="paper" />

      <Band tone="paper" prev="tint-3" next="dark">
        <div className="container-k grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <Reveal className="md:col-span-5">
            <p className="t-caption text-ink-soft">WhatsApp</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-[family-name:var(--font-serif)] text-3xl underline-offset-8 hover:underline"
            >
              {SITE.whatsappDisplay}
            </a>
          </Reveal>
          <Reveal className="md:col-span-7" delay={100}>
            <InquiryForm
              title={c.formTitle}
              fields={[
                { name: "name", label: f.name, error: f.errorName, autoComplete: "name" },
                { name: "message", label: f.message, error: f.errorMessage, multiline: true },
              ]}
              submit={f.submit}
              sent={f.sent}
              waIntro={f.waIntro}
              requiredLabel={f.required}
            />
          </Reveal>
        </div>
      </Band>
    </>
  );
}
