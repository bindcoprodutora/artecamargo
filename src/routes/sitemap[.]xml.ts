import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchProducts } from "@/lib/shopify";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/produtos", changefreq: "daily", priority: "0.9" },
          { path: "/nossa-historia", changefreq: "monthly", priority: "0.6" },
          { path: "/atacado", changefreq: "monthly", priority: "0.7" },
          { path: "/duvidas", changefreq: "monthly", priority: "0.5" },
          { path: "/politicas/trocas", changefreq: "yearly", priority: "0.3" },
          { path: "/politicas/privacidade", changefreq: "yearly", priority: "0.3" },

        ];

        try {
          const products = await fetchProducts(150);
          products.forEach((p) =>
            entries.push({
              path: `/produto/${p.node.handle}`,
              changefreq: "weekly",
              priority: "0.8",
            }),
          );
        } catch {
          // catálogo indisponível: mantém apenas as rotas estáticas
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
