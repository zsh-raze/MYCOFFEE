import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the client's original image files as-is (no re-encoding or resizing).
  images: { unoptimized: true },
  // Lets test builds use a separate folder so they don't clash with a running `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
