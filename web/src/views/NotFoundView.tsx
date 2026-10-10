"use client";

import Link from "next/link";
import { Band } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export function NotFoundView() {
  const { t } = useLang();
  return (
    <Band tone="paper" next="dark">
      <div className="container-k flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="t-display">{t.notFound.title}</p>
        <Link href="/" className="btn btn-primary mt-8">
          {t.notFound.back}
        </Link>
      </div>
    </Band>
  );
}
