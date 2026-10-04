import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const ROUTES = [
  ["/", "weekly", "1.0"],
  ["/solutions", null, "0.9"],
  ["/industries", null, "0.9"],
  ["/about", null, "0.7"],
  ["/contact", null, "0.9"],
  ["/privacy", null, "0.3"],
];

// Emits sitemap.xml + robots.txt pointing at VITE_SITE_URL.
function seoFiles(siteUrl) {
  return {
    name: "aifyn-seo-files",
    generateBundle() {
      const base = siteUrl.replace(/\/$/, "");
      const urls = ROUTES.map(
        ([p, freq, prio]) =>
          `  <url><loc>${base}${p}</loc>${freq ? `<changefreq>${freq}</changefreq>` : ""}<priority>${prio}</priority></url>`,
      ).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${base}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), seoFiles(env.VITE_SITE_URL || "https://www.aifyn.in")],
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    // The original CRA source keeps JSX in a few .js files.
    esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
    optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
    server: {
      // `npm run dev` proxies /api to `wrangler dev` (port 8787).
      proxy: { "/api": "http://127.0.0.1:8787" },
    },
  };
});
