import { MetadataRoute } from "next";
import { mockVehicles } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rjauto.vercel.app";

  // Static routes
  const routes = [
    "",
    "/vehicules",
    "/reprise",
    "/a-propos",
    "/contact",
    "/alertes",
    "/mentions-legales",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic vehicle routes
  const vehicleRoutes = mockVehicles
    .filter((v) => v.published)
    .map((vehicle) => ({
      url: `${baseUrl}/vehicules/${vehicle.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

  return [...routes, ...vehicleRoutes];
}
