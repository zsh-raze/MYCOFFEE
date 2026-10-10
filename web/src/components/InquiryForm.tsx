"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

export type Field = {
  name: string;
  label: string;
  /** Error message — setting it makes the field required. */
  error?: string;
  hint?: string;
  multiline?: boolean;
  autoComplete?: string;
};

/**
 * Inquiry form with no backend: validates, then opens WhatsApp with the fields pre-filled.
 * Only collect what the brief asks for (no hidden fields, no tracking).
 */
export function InquiryForm({
  title,
  fields,
  submit,
  sent: sentLabel,
  waIntro,
  requiredLabel,
  note,
}: {
  title: string;
  fields: Field[];
  submit: string;
  sent: string;
  waIntro: string;
  requiredLabel: string;
  note?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(fields.map((f) => [f.name, String(data.get(f.name) ?? "").trim()]));

    const next: Record<string, string> = {};
    for (const f of fields) if (f.error && !values[f.name]) next[f.name] = f.error;
    setErrors(next);
    setSent(false);
    const first = Object.keys(next)[0];
    if (first) {
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const text = [waIntro, ...fields.filter((f) => values[f.name]).map((f) => `${f.label}: ${values[f.name]}`)].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const field = "mt-2 w-full rounded-xl border bg-paper px-4 py-3 text-base outline-none transition-colors duration-200 focus:border-ink";

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-line bg-surface p-6 md:p-9" aria-label={title}>
      <h2 className="t-h3">{title}</h2>
      {fields.map((f) => {
        const err = errors[f.name];
        const describedBy = [err && `err-${f.name}`, f.hint && `hint-${f.name}`].filter(Boolean).join(" ") || undefined;
        const props = {
          name: f.name,
          autoComplete: f.autoComplete,
          "aria-invalid": !!err,
          "aria-required": !!f.error,
          "aria-describedby": describedBy,
          className: `${field} ${err ? "border-accent-strong" : "border-ink/25"}`,
        };
        return (
          <label key={f.name} className="block">
            <span className="text-sm font-semibold">
              {f.label}
              {f.error && (
                <>
                  {" "}
                  <span className="text-accent-strong" aria-hidden>
                    *
                  </span>
                  <span className="sr-only">({requiredLabel})</span>
                </>
              )}
            </span>
            {f.hint && (
              <span id={`hint-${f.name}`} className="mt-0.5 block text-sm text-ink-soft">
                {f.hint}
              </span>
            )}
            {f.multiline ? <textarea rows={5} {...props} className={`${props.className} resize-y`} /> : <input {...props} />}
            {err && (
              <span id={`err-${f.name}`} className="mt-1.5 block text-sm text-accent-strong">
                {err}
              </span>
            )}
          </label>
        );
      })}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary">
          {submit}
        </button>
        <p role="status" className="text-sm text-ink-soft">
          {sent && <span className="font-semibold text-accent-strong">✓ {sentLabel}</span>}
        </p>
      </div>
      {note && <p className="text-sm text-ink-soft">{note}</p>}
    </form>
  );
}
