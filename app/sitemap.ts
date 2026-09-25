import type { MetadataRoute } from "next";
import { getAPIUrl } from "@/libs/database";

interface FetchResults {
    status: string;
    title: string[];
    cover: string[];
    date: string[];
}

interface WIkiArticle {
    title: string;
    image?: string;
    modifiedAt?: [number, number, number];
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://technoinc.world";
    const API_URL = getAPIUrl();
    const articles: WIkiArticle[] = [];

    try {
        const response = await fetch(`${API_URL}/api/v1/wiki/articles`, {
            next: { revalidate }
        });
        if (response.ok) {
            const result: FetchResults = await response.json();
            for (let index = 0; index < result.title.length; index++) {
                const date = result.date[index].split(", ")[0];
                const [year, month, day] = date.split("/");
                articles.push({
                    title: result.title[index],
                    image: result.cover[index],
                    modifiedAt: [Number(year), Number(month) - 1, Number(day)]
                });
            }
        }
    } catch (error) {
        console.error("Failed to fetch dynamic sitemap list:", error);
    }
    
    const staticRoutes = [
        "",
        "/contribution",
        "/wiki",
        "/portal",
        "/category"
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0
    }));

    const dynamicRoutes = articles.map((article) => ({
        url: `${baseUrl}/wiki/${article.title}`,
        images: article.image ? [article.image] : [],
        lastModified: article.modifiedAt ? new Date() : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8
    }));

    return [...staticRoutes, ...dynamicRoutes];
}