"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui";
import { IMG, OPTIONS } from "@/data/catalog";
import { useLang } from "@/lib/i18n";

// Photo hero (brief §6.2, §9.1). Two separately composed images, not one crop:
//  - below lg: 4:5 image shown at its own shape under the text (subject in its lower half);
//  - lg and up: 16:9 image behind the text (subject right, text left, paper gradient from the left).
// The flavor quiz entry (brief §5.3) follows as its own strip so it never covers the subject.
export function HomeHero() {
  const { t } = useLang();
  const h = t.home.hero;

  return (
    <>
      <section className="relative isolate overflow-hidden">
        {/* lg+: wide photo behind the text */}
        <Image
          src={IMG.heroDesktop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 hidden object-cover object-[75%_center] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-paper from-20% via-paper/65 via-42% to-paper/0 to-62% lg:block"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 hidden h-32 bg-gradient-to-b from-paper/0 to-paper lg:block" />

        <div className="container-k relative z-10 pt-12 md:pt-16 lg:flex lg:min-h-[min(780px,calc(100svh-4rem))] lg:items-center lg:py-24">
          <Reveal className="max-w-xl">
            <p className="t-caption text-accent-strong">{h.eyebrow}</p>
            <h1 className="mt-5 font-[family-name:var(--font-serif)] text-[clamp(2.75rem,1.7rem+4.6vw,6rem)] leading-[0.98] font-normal tracking-[-0.025em]">
              {h.title}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft md:text-xl">{h.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/build" className="btn btn-primary">
                {h.primaryCta}
              </Link>
              <a href="#explore" className="btn btn-ghost bg-paper/60">
                {h.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Below lg: the vertical photo at its own 4:5 shape (no side crop); its calm top
            slides under the buttons and fades in from the page colour. */}
        <div className="relative -mt-[30vw] aspect-[4/5] w-full md:-mt-[36vw] lg:hidden">
          <Image src={IMG.heroMobile} alt={h.imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-paper via-paper/60 to-paper/0" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-paper/0 to-paper" />
        </div>
      </section>

      {/* Optional quiz entry — each flavor opens Build Your Coffee with it preselected */}
      <div className="container-k relative z-10 -mt-10 md:-mt-16">
        <Reveal>
          <div className="grid gap-6 rounded-[2rem] border border-line bg-surface p-6 shadow-[0_30px_60px_-40px_rgba(41,37,33,0.45)] md:p-9 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-accent" />
                <p className="t-caption text-ink-soft">{t.build.steps.flavor.label}</p>
              </div>
              <h2 className="t-h3 mt-4">{h.quizLabel}</h2>
              <p className="mt-2 text-sm text-ink-soft">{h.quizHint}</p>
            </div>
            <ul className="flex flex-wrap gap-2.5 lg:col-span-7 lg:justify-end">
              {OPTIONS.flavor.map((f) => (
                <li key={f}>
                  <Link href={`/build?flavor=${encodeURIComponent(f)}`} className="chip">
                    {f}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </>
  );
}
