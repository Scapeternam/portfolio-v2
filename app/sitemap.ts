import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { portfolioContent } from "@/lib/portfolio-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const routes = [
    ...["", "/projects", "/about", "/cv"],
    ...portfolioContent.projects.map((project) => `/projects/${project.id}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
