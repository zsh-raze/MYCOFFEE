"use client";

import Link from "next/link";
import { Band, PageHeader, Reveal, SectionHeading } from "@/components/ui";
import { useLang } from "@/lib/i18n";

// About (brief §6.1): mission, brand philosophy and trust information.
export function AboutView() {
  const { t } = useLang();
  const a = t.about;

  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} lead={a.lead} tone="tint-2" next="paper" />

      {/* Mission · Vision · Promise — brief §2.2 */}
      <Band tone="paper" prev="tint-2" next="paper">
        <div className="container-k py-16 md:py-24">
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
            {a.trio.map((x, i) => (
              <Reveal as="li" key={x.label} delay={i * 80} className="border-t-2 border-accent pt-6">
                <h2 className="t-caption text-accent-strong">{x.label}</h2>
                <p className="mt-4 font-[family-name:var(--font-serif)] text-xl leading-snug md:text-[1.375rem]">{x.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Band>

      {/* Philosophy — brief §2.1 */}
      <Band tone="paper" prev="paper" next="tint-1">
        <div className="container-k grid gap-8 pb-20 md:grid-cols-12 md:pb-28">
          <Reveal className="md:col-span-5">
            <p className="t-caption mb-3 text-ink-soft">{a.philosophy.eyebrow}</p>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em]">
              {a.philosophy.title}
            </h2>
          </Reveal>
          <Reveal className="md:col-span-7 md:pt-10" delay={100}>
            <p className="text-lg leading-relaxed md:text-xl">{a.philosophy.body}</p>
          </Reveal>
        </div>
      </Band>

      {/* How we work — brief §1, §2.4, §4.2, §5.5 */}
      <Band tone="tint-1" prev="paper" next="dark">
        <div className="container-k py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow={a.trust.eyebrow} title={a.trust.title} />
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {a.trust.items.map((x, i) => (
              <Reveal as="li" key={x.name} delay={i * 60} className="bg-surface p-6 md:p-8">
                <h3 className="t-h3">{x.name}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{x.text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12">
            <Link href="/build" className="btn btn-primary">
              {a.cta}
            </Link>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
