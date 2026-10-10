"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Text wordmark. No logo file has been supplied (plan.md A4), so the brand name is set in the
 * heading serif — swap for the client's logo image once it is approved.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-[family-name:var(--font-serif)] leading-none tracking-[-0.01em] whitespace-nowrap ${className}`}>
      Mycoffee<span className="text-accent-strong">.sg</span>
    </span>
  );
}

/** Fades content up 15px when it enters the viewport. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Section heading with an optional small eyebrow line and body. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-paper/75" : "text-ink-soft";
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className={`t-caption mb-3 ${muted}`}>{eyebrow}</p>}
      <h2 className="t-h2">{title}</h2>
      {body && <p className={`mt-4 text-[17px] ${muted}`}>{body}</p>}
    </div>
  );
}

// Colour tokens a Band can use (must exist as --<name> in globals.css).
export type Tone = "paper" | "surface" | "accent-soft" | "tint-1" | "tint-2" | "tint-3" | "dark" | "dark-2";

const smoothstep = (x: number) => x * x * (3 - 2 * x);
const mix = (from: Tone, to: Tone, amount: number) =>
  amount <= 0
    ? `var(--${from})`
    : amount >= 1
      ? `var(--${to})`
      : `color-mix(in oklab, var(--${to}) ${(amount * 100).toFixed(1)}%, var(--${from}))`;

/**
 * Background for a full-width band that blends smoothly into its neighbours.
 * Each boundary is one smoothstep curve split across both bands: the upper band eases
 * to the midpoint colour over its last --fade, the lower band eases on from that same
 * midpoint over its first --fade, so the colour meets exactly with no visible seam.
 */
export function bandStyle(tone: Tone, prev?: Tone, next?: Tone): React.CSSProperties {
  const steps = 8;
  const stops: string[] = [];
  if (prev && prev !== tone) {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      stops.push(`${mix(prev, tone, smoothstep(0.5 + t / 2))} calc(var(--fade) * ${t})`);
    }
  } else {
    stops.push(`var(--${tone}) 0%`);
  }
  if (next && next !== tone) {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      stops.push(`${mix(tone, next, smoothstep(t / 2))} calc(100% - var(--fade) * ${1 - t})`);
    }
  } else {
    stops.push(`var(--${tone}) 100%`);
  }
  return { backgroundColor: `var(--${tone})`, backgroundImage: `linear-gradient(to bottom, ${stops.join(", ")})` };
}

/** Full-width page section whose background blends into the previous / next section. */
export function Band({
  tone,
  prev,
  next,
  as: Tag = "section",
  className = "",
  children,
  ...rest
}: {
  tone: Tone;
  prev?: Tone;
  next?: Tone;
  as?: "section" | "header" | "footer";
  className?: string;
  children: React.ReactNode;
  id?: string;
  "aria-labelledby"?: string;
  "aria-roledescription"?: string;
}) {
  return (
    <Tag className={className} style={bandStyle(tone, prev, next)} {...rest}>
      {children}
    </Tag>
  );
}

/** Top-of-page header for sub-pages. Blends from the site header (paper) into the next band. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  tone,
  next,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  tone: Tone;
  next: Tone;
  children?: React.ReactNode;
}) {
  return (
    <Band as="header" tone={tone} prev="paper" next={next}>
      <div className="container-k py-14 md:py-20">
        <Reveal>
          <p className="t-caption mb-4 text-ink-soft">{eyebrow}</p>
          <h1 className="t-display">{title}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{lead}</p>
        </Reveal>
        {children}
      </div>
    </Band>
  );
}
