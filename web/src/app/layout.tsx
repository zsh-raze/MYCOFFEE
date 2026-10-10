import type { Metadata, Viewport } from "next";
import { MobileBar, SiteFooter } from "@/components/SiteChrome";
import { SiteHeader } from "@/components/SiteHeader";
import { en } from "@/content/en";
import { LangProvider } from "@/lib/i18n";
import { SITE, whatsappLink } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: en.meta.title, template: `%s — ${en.meta.title}` },
  description: en.meta.description,
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    siteName: SITE.domain,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#f5f0e8" }; // --paper (Oat Cream)

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  contactPoint: { "@type": "ContactPoint", telephone: SITE.whatsappDisplay, contactType: "customer service", url: whatsappLink() },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <LangProvider>
          <SiteHeader />
          <main id="main" className="page-fade">
            {children}
          </main>
          <SiteFooter />
          <MobileBar />
        </LangProvider>
      </body>
    </html>
  );
}
