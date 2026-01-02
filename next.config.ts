import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Prevent Next/Turbopack from picking a parent folder as the workspace root
  // when multiple lockfiles exist outside the repo (common on Windows).
  turbopack: {
    root: configDir,
  },
};

export default nextConfig;
