import type { MetadataRoute } from "next";
import { NAV_ROUTES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ROUTES.map((r) => ({ url: `${SITE.url}${r.href === "/" ? "" : r.href}` }));
}
