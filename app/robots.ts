import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: [
                "/",
                "/wiki/",
                "/category/"
            ],
            disallow: [
                "/api/",
                "/_next/",
                "/static/",
                "/contribution/",
                "/contribution/edit/"
            ]
        },
        sitemap: "https://technoinc.world/sitemap.xml"
    }
}