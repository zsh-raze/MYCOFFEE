"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";
import { OPTIONS } from "@/data/catalog";
import { useLang } from "@/lib/i18n";

// Typography-led editorial hero (no client photography yet — plan.md A5).
// Left: what the platform is + the two actions (brief §6.2). Right: the optional quiz entry
// (brief §5.3) — each flavor opens Build Your Coffee with that flavor preselected.
export function HomeHero() {
  const { t } = useLang();
  const h = t.home.hero;

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container-k grid items-center gap-12 pt-14 pb-20 md:pt-20 md:pb-28 lg:min-h-[min(760px,calc(100svh-4rem))] lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="t-caption text-accent-strong">{h.eyebrow}</p>
          <h1 className="mt-6 font-[family-name:var(--font-serif)] text-[clamp(2.75rem,1.7rem+4.6vw,6rem)] leading-[0.98] font-normal tracking-[-0.025em]">
            {h.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">{h.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/build" className="btn btn-primary">
              {h.primaryCta}
            </Link>
            <a href="#explore" className="btn btn-ghost">
              {h.secondaryCta}
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={150}>
          <div className="rounded-[2rem] border border-line bg-surface p-6 shadow-[0_30px_60px_-40px_rgba(41,37,33,0.45)] md:p-9">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent" />
              <p className="t-caption text-ink-soft">{t.build.steps.flavor.label}</p>
            </div>
            <h2 className="t-h3 mt-5">{h.quizLabel}</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {OPTIONS.flavor.map((f) => (
                <li key={f}>
                  <Link href={`/build?flavor=${encodeURIComponent(f)}`} className="chip">
                    {f}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm text-ink-soft">{h.quizHint}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
