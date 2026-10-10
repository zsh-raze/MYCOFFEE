import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Prototype under client review: keep it out of search engines. Switch to `allow: "/"` at launch.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" }, sitemap: `${SITE.url}/sitemap.xml` };
}
