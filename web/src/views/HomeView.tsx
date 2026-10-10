"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { Band, Reveal, SectionHeading } from "@/components/ui";
import { IMG } from "@/data/catalog";
import { useLang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const pad = (i: number) => String(i + 1).padStart(2, "0");

// Section order follows brief §6.2: hero → ways to explore → customization explanation →
// education/trust. Each Band's prev/next must match its neighbours; the last band is in LAST_BAND.
export function HomeView() {
  const { t } = useLang();
  const h = t.home;

  return (
    <>
      <HomeHero />

      {/* Philosophy — manifesto headline with masked line rise + drawn rules */}
      <Band tone="paper" next="tint-2">
        <div className="container-k pt-20 pb-20 md:pt-28 md:pb-32">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span aria-hidden className="draw-line h-px w-10 bg-accent md:w-16" />
              <p className="t-caption text-ink-soft">{h.statement.eyebrow}</p>
              <span aria-hidden className="draw-line draw-line-right h-px w-10 bg-accent md:w-16" />
            </div>
            <h2 className="mx-auto mt-8 max-w-4xl font-[family-name:var(--font-serif)] text-[clamp(1.875rem,1.2rem+2.8vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-balance">
              <span className="mask-line">
                <span style={{ transitionDelay: "150ms" }}>{h.statement.title}</span>
              </span>
            </h2>
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-4xl md:mt-20" delay={200}>
            <span aria-hidden className="draw-line block h-px w-full bg-ink/20" />
            <div className="grid gap-8 pt-8 md:grid-cols-2 md:gap-14 md:pt-10">
              <p className="text-lg leading-relaxed">{h.statement.body}</p>
              <div className="md:border-l md:border-ink/15 md:pl-14">
                <p className="t-caption mb-3 text-accent-strong">{h.statement.asideLabel}</p>
                <p className="font-[family-name:var(--font-serif)] text-xl leading-snug">{h.statement.aside}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* Ways to explore — brief §4.1 categories as an editorial index */}
      <Band tone="tint-2" prev="paper" next="paper" id="explore" aria-labelledby="explore-title">
        <div className="container-k scroll-mt-20 py-20 md:py-28">
          <Reveal>
            <p className="t-caption mb-3 text-ink-soft">{h.explore.eyebrow}</p>
            <h2 id="explore-title" className="t-h2 max-w-3xl">
              {h.explore.title}
            </h2>
          </Reveal>
          <ul className="mt-12 border-t border-ink/15">
            {h.explore.items.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i * 60} className="border-b border-ink/15">
                <div className="grid grid-cols-[6.5rem_1fr] items-center gap-x-4 gap-y-2 py-5 sm:grid-cols-[9rem_1fr] md:grid-cols-12 md:gap-6 md:py-6">
                  <div className="relative row-span-4 aspect-[4/3] self-start overflow-hidden rounded-2xl md:order-2 md:col-span-2 md:row-span-1 md:self-center">
                    <Image src={IMG.categories[i]} alt={c.alt} fill sizes="(min-width: 768px) 16vw, 9rem" className="object-cover" />
                  </div>
                  <span aria-hidden className="text-sm text-accent-strong tabular-nums md:order-1 md:col-span-1">
                    {pad(i)}
                  </span>
                  <h3 className="t-h3 md:order-3 md:col-span-3">{c.name}</h3>
                  <p className="text-[15px] text-ink-soft md:order-4 md:col-span-4 md:text-base">{c.examples}</p>
                  <a
                    href={whatsappLink(h.explore.askMessage + c.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${h.explore.ask}: ${c.name}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent-strong underline-offset-4 hover:underline md:order-5 md:col-span-2 md:justify-self-end"
                  >
                    {h.explore.ask} <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Band>

      {/* How Build Your Coffee works — brief §5.1–5.2 */}
      <Band tone="paper" prev="tint-2" next="tint-1">
        <div className="container-k grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={h.how.eyebrow} title={h.how.title} body={h.how.body} />
            <Link href="/build" className="btn btn-primary mt-8">
              {h.how.cta}
            </Link>
            <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-3xl border border-line">
              <Image src={IMG.build} alt={h.how.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {h.how.steps.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 60} className="grid grid-cols-[2.5rem_1fr] gap-x-3 bg-surface p-5 sm:block sm:p-6 md:p-7">
                <span className="font-[family-name:var(--font-serif)] text-2xl leading-none text-accent sm:text-3xl" aria-hidden>
                  {pad(i)}
                </span>
                <div>
                  <h3 className="font-semibold sm:mt-3">{s.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Band>

      {/* Brand pillars — brief §2.3 */}
      <Band tone="tint-1" prev="paper" next="dark-2">
        <div className="container-k py-20 md:py-28">
          <Reveal>
            <p className="t-caption mb-3 text-sage-strong">{h.pillars.eyebrow}</p>
            <h2 className="t-h2">{h.pillars.title}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {h.pillars.items.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 70} className="border-t border-sage pt-5">
                <h3 className="t-h3">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Band>

      {/* Differentiation — brief §2.5 */}
      <Band tone="dark-2" prev="tint-1" next="accent-soft" className="text-paper">
        <div className="container-k py-24 text-center md:py-36">
          <Reveal>
            <p className="t-caption text-paper/70">{h.question.eyebrow}</p>
            <p className="mt-8 text-lg text-paper/80">{h.question.lead}</p>
            <h2 className="mx-auto mt-3 max-w-4xl font-[family-name:var(--font-serif)] text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[1.04] tracking-[-0.02em]">
              {h.question.ask}
            </h2>
            <p className="mt-4 font-[family-name:var(--font-serif)] text-xl text-paper/70 italic md:text-2xl">{h.question.rather}</p>
            <span aria-hidden className="mx-auto mt-10 block h-px w-16 bg-accent" />
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-paper/85">{h.question.body}</p>
          </Reveal>
        </div>
      </Band>

      {/* Roasters — brief §1, §6.5 */}
      <Band tone="accent-soft" prev="dark-2" next="footer">
        <div className="container-k grid items-end gap-8 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-8">
            <SectionHeading eyebrow={h.roasters.eyebrow} title={h.roasters.title} body={h.roasters.body} />
          </Reveal>
          <Reveal className="md:col-span-4 md:justify-self-end" delay={100}>
            <Link href="/roasters" className="btn btn-primary">
              {h.roasters.cta}
            </Link>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
