import type { ArticleData } from "@/contexts/ArticleDataProvider";
import type { History, Schema } from "@/utils/typeUtils";

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

type ArticleField = Exclude<keyof ArticleData, "content" | "raw_file" | "prev_src">;

interface ArticleDataResult extends Status {
    data: Omit<ArticleData, "cat" | "his" | "content"> & {
        cat: string;
        his: string;
        content: string;
    }
}

export function dbGetArticleData(contentID: string): Promise<ArticleData | undefined>;
export function dbGetArticleData<K extends ArticleField>(
    contentID: string,
    field: K
): Promise<ArticleData[K] | undefined>;

/**
 * Get article data from database by article title "contentID"
 * @param contentID string
 * @returns ArticleData | undefined
 */
export async function dbGetArticleData<K extends ArticleField>(
    contentID: string,
    field?: K
): Promise<ArticleData | ArticleData[K] | undefined> {
    try {
        const API_URL = getAPIUrl();
        const query = field ? `?field=${encodeURIComponent(field)}` : "";
        const response = await fetch(
            `${API_URL}/api/v1/wiki/${encodeURIComponent(contentID)}${query}`,
            { cache: "no-store" }
        );
        if (response.status === 404) return undefined;
        if (!response.ok) throw new Error(`Failed to fetch article content (${response.status})`);
        const result: ArticleDataResult | null = await response.json();
        if (!result) return;
        if (field) return result.data as unknown as ArticleData[K];
        const parsedCategory: string[] = JSON.parse(result.data.cat);
        const parsedHistory: History[] = JSON.parse(result.data.his);
        const parsedContent: Schema = JSON.parse(result.data.content);
        return { ...result.data, cat: parsedCategory, his: parsedHistory, content: parsedContent };
    }
    catch (error) {
        console.error(error);
    }
}

interface CreateCategoryResult extends Status {
    message: string
}

export interface ArticleSearchResult {
    title: string;
    cover: string;
    desc: string;
}

export async function dbSearchArticleTitles(query: string, signal?: AbortSignal): Promise<ArticleSearchResult[]> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/search/${encodeURIComponent(query)}`, {
            cache: "no-store",
            signal
        });
        if (!response.ok) throw new Error(`Failed to search articles (${response.status})`);

        const result: { status: string; articles: ArticleSearchResult[] } = await response.json();
        return result.articles;
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return [];
        console.error(error);
        return [];
    }
}

export interface CategorySearchResult {
    category: string;
    hierarchy: string;
}

export async function dbSearchCategories(query: string, signal?: AbortSignal): Promise<CategorySearchResult[]> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/category/search/${encodeURIComponent(query.trim().replace(/\s+/g, "_"))}`, {
            cache: "no-store",
            signal
        });
        if (!response.ok) throw new Error(`Failed to search categories (${response.status})`);

        const result: { status: string; data: CategorySearchResult[] } = await response.json();
        return result.data ?? [];
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return [];
        console.error(error);
        return [];
    }
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

interface IncreaseUniversalIDResults {
    status: string;
    message: string;
}

export async function dbIncreaeUniversalID(): Promise<IncreaseUniversalIDResults | undefined> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/universal-id/increase`, {
            method: "PUT",
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`${response}`);
        const result: IncreaseUniversalIDResults = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}