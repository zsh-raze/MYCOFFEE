"use client";

import { useEffect, useRef, useState } from "react";
import { Band, PageHeader } from "@/components/ui";
import { GROUND_FORMAT, IMG, OPTIONS } from "@/data/catalog";
import { useLang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

// Build Your Coffee (brief §5): a skippable, step-by-step preference profile.
// Options come only from OPTIONS (brief vocabularies). The grind step appears only when
// "Ground coffee" is chosen (brief §5.5). No products are recommended here — there is no
// verified catalog yet (plan.md A6) — the profile is sent on WhatsApp instead.

type Choice = "format" | "roast" | "grind";
type Multi = "flavor" | "brew";
type StepKey = Choice | Multi | "budget" | "review";
type Profile = { format: string; flavor: string[]; roast: string; brew: string[]; grind: string; budget: string };

const EMPTY: Profile = { format: "", flavor: [], roast: "", brew: [], grind: "", budget: "" };
const STORAGE_KEY = "mycoffee-build";
const MULTI: Multi[] = ["flavor", "brew"];
const isMulti = (k: StepKey): k is Multi => (MULTI as StepKey[]).includes(k);

const stepsFor = (p: Profile): StepKey[] =>
  ["format", "flavor", "roast", "brew", ...(p.format === GROUND_FORMAT ? (["grind"] as const) : []), "budget", "review"];

export function BuildView() {
  const { t } = useLang();
  const b = t.build;
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Restore saved choices; a ?flavor= link from the homepage preselects that flavor.
  useEffect(() => {
    let next = EMPTY;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") next = { ...EMPTY, ...saved };
    } catch {
      // storage unavailable or corrupt: start fresh
    }
    const flavor = new URLSearchParams(window.location.search).get("flavor");
    if (flavor && (OPTIONS.flavor as readonly string[]).includes(flavor) && !next.flavor.includes(flavor)) {
      next = { ...next, flavor: [...next.flavor, flavor] };
    }
    setProfile(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile, ready]);

  const steps = stepsFor(profile);
  const current = steps[Math.min(index, steps.length - 1)];
  const step = b.steps[current];

  // Move focus to the new question after Back/Next/Skip so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [index]);

  const go = (to: number) => {
    moved.current = true;
    setIndex(Math.max(0, Math.min(to, steps.length - 1)));
  };

  const pick = (key: Choice | Multi, value: string) =>
    setProfile((p) => {
      if (isMulti(key)) {
        const list = p[key];
        return { ...p, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
      }
      const next = { ...p, [key]: p[key] === value ? "" : value };
      if (key === "format" && next.format !== GROUND_FORMAT) next.grind = ""; // grind only applies to ground coffee
      return next;
    });

  // "Not sure — skip" clears this step's answer, so the summary reads "Not sure".
  const skip = () => {
    if (current !== "review") setProfile((p) => ({ ...p, [current]: isMulti(current) ? [] : "" }));
    go(index + 1);
  };

  const reset = () => {
    setProfile(EMPTY);
    go(0);
  };

  const valueOf = (k: Exclude<StepKey, "review">) => {
    const v = profile[k];
    const text = Array.isArray(v) ? v.join(", ") : v.trim();
    return text || b.notSure;
  };
  const summaryKeys = steps.filter((s): s is Exclude<StepKey, "review"> => s !== "review");
  const message = [b.waIntro, ...summaryKeys.map((k) => `${b.steps[k].label}: ${valueOf(k)}`), b.waOutro].join("\n");

  const progress = b.progress.replace("{n}", String(index + 1)).replace("{total}", String(steps.length));

  return (
    <>
      <PageHeader eyebrow={b.eyebrow} title={b.title} lead={b.lead} image={IMG.buildHeader} imageAlt={b.imageAlt} tone="tint-2" next="paper" />

      <Band tone="paper" prev="paper" next="footer">
        <div className="container-k grid gap-10 pt-10 pb-20 md:pt-14 md:pb-28 lg:grid-cols-12">
          {/* Step list — progress indicator (brief §5.6) */}
          <nav aria-label={b.title} className="lg:col-span-4">
            <p className="t-caption text-ink-soft" aria-live="polite">
              {progress}
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-line" aria-hidden>
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500"
                style={{ width: `${((index + 1) / steps.length) * 100}%` }}
              />
            </div>
            <ol className="mt-6 hidden gap-1 lg:grid">
              {steps.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === index ? "step" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 ${
                      i === index ? "bg-surface font-semibold" : "text-ink-soft hover:bg-surface/60"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs tabular-nums ${
                        i === index ? "border-accent-strong bg-accent-strong text-paper" : i < index ? "border-ink/30 bg-paper" : "border-line"
                      }`}
                    >
                      {i < index ? "✓" : i + 1}
                    </span>
                    {b.steps[s].label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* Current step */}
          <section aria-labelledby="step-question" className="lg:col-span-8">
            <div className="rounded-[2rem] border border-line bg-surface p-6 md:p-10">
              <p className="t-caption text-accent-strong">{step.label}</p>
              <h2 id="step-question" ref={headingRef} tabIndex={-1} className="t-h2 mt-3 outline-none">
                {step.question}
              </h2>
              <p className="mt-3 text-ink-soft">{step.note}</p>

              {current !== "review" && current !== "budget" && (
                <>
                  {isMulti(current) && <p className="mt-6 text-sm text-ink-soft">{b.multiHint}</p>}
                  <div
                    role="group"
                    aria-labelledby="step-question"
                    className={`flex flex-wrap gap-2.5 ${isMulti(current) ? "mt-3" : "mt-7"}`}
                  >
                    {OPTIONS[current].map((o) => {
                      const v = profile[current];
                      const on = Array.isArray(v) ? v.includes(o) : v === o;
                      return (
                        <button key={o} type="button" className="chip" aria-pressed={on} onClick={() => pick(current, o)}>
                          {on && <span aria-hidden>✓</span>}
                          {o}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {current === "budget" && (
                <label className="mt-7 block max-w-md">
                  <span className="text-sm font-semibold">{b.steps.budget.field}</span>
                  <input
                    name="budget"
                    value={profile.budget}
                    onChange={(e) => setProfile((p) => ({ ...p, budget: e.target.value }))}
                    placeholder={b.steps.budget.placeholder}
                    className="mt-2 w-full rounded-xl border border-ink/25 bg-paper px-4 py-3 text-base outline-none transition-colors duration-200 focus:border-ink"
                  />
                </label>
              )}

              {current === "review" && (
                <dl className="mt-7 divide-y divide-line border-y border-line">
                  {summaryKeys.map((k) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-3.5">
                      <dt className="text-sm text-ink-soft">{b.steps[k].label}</dt>
                      <dd className="flex items-baseline gap-3 text-right font-semibold">
                        <span>{valueOf(k)}</span>
                        <button
                          type="button"
                          onClick={() => go(steps.indexOf(k))}
                          aria-label={`${b.edit}: ${b.steps[k].label}`}
                          className="text-sm font-normal text-accent-strong underline underline-offset-4"
                        >
                          {b.edit}
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
                {index > 0 && (
                  <button type="button" onClick={() => go(index - 1)} className="btn btn-ghost">
                    {b.back}
                  </button>
                )}
                {current === "review" ? (
                  <>
                    <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      {b.send}
                    </a>
                    <button type="button" onClick={reset} className="text-sm font-semibold text-ink-soft underline underline-offset-4 sm:ml-auto">
                      {b.startOver}
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => go(index + 1)} className="btn btn-primary">
                      {b.next}
                    </button>
                    <button type="button" onClick={skip} className="text-sm font-semibold text-ink-soft underline underline-offset-4 sm:ml-auto">
                      {b.skip}
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-soft">{b.saved}</p>
          </section>
        </div>
      </Band>
    </>
  );
}
