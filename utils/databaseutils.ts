import type { ArticleData } from "@/contexts/ArticleDataProvider";

interface Status {
    status: "Success" | "Error";
}

export function getAPIUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_TECHNOINC_BACKEND_API;
    if (!apiUrl) throw new Error("NEXT_PUBLIC_TECHNOINC_BACKEND_API is not configured");
    return apiUrl.replace(/\/$/, "");
}

export function getUploadPreset(): string {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!uploadPreset) throw new Error("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not configured");
    return uploadPreset;
}

interface ArticleDataResult extends Status {
    article: ArticleData;
}

/**
 * Get article data from database by article title "contentID"
 * @param contentID string
 * @returns ArticleData | undefined
 */
export async function dbGetArticleData(contentID: string): Promise<ArticleData | undefined> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/get/${encodeURIComponent(contentID)}`, {
            cache: "no-store"
        });
        if (response.status === 404) return undefined;
        if (!response.ok) throw new Error(`Failed to fetch article content (${response.status})`);
        const result: ArticleDataResult | undefined = await response.json();
        return result?.article;
    }
    catch (error) {
        console.error(error);
    }
}

interface CreateCategoryResult extends Status {
    message: string
}

/**
 * Create new category in database
 * @param category string
 * @param parent string
 * @returns boolean | undefined
 */
export async function dbCreateCategory(category: string, parent: string): Promise<boolean> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/category/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category_name: category, category_parent: parent }),
            cache: "no-store"
        })
        if (!response.ok) throw new Error("Failed to create category");
        const result: CreateCategoryResult = await response.json();
        return result.status === "Success";
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Get all of existing links of articles from article content
 * @param links - Array of captured links in content (string)
 * @returns - Returns array of available links or undefined
 */
export async function dbGetExistingLinks(links: string[]): Promise<string[] | undefined> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/check-links`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ links: links })
        });
        if (!response.ok) throw new Error("Failed to check existing links");
        const result = await response.json();
        return result.existing.map((link: string) => link.replaceAll(" ", "_"));
    } catch (error) {
        console.error(error);
    }
}

export async function dbGetUniversalID(): Promise<number> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/universal-id/get`);
        if (!response.ok) throw new Error(`${response}`);
        const result: { status: string; universal_id: number } = await response.json();
        return result.universal_id;
    } catch (error) {
        console.error(error);
        return 0;
    }
}