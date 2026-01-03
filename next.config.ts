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
  // Also harden webpack-based pipelines (some loaders/plugins still use enhanced-resolve)
  // so module resolution always includes THIS project's node_modules, even if a parent
  // directory is incorrectly inferred as the context.
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.modules = [
      path.join(configDir, "node_modules"),
      ...(config.resolve.modules ?? []),
    ];
    return config;
  },
};

export default nextConfig;
