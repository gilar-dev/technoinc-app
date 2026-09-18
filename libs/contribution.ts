import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { getAPIUrl } from "./database";

interface CreateArticleResults {
    success: boolean;
    url: string;
}

export async function createArticle(articlePayload: ArticleData): Promise<CreateArticleResults | undefined> {
    try {
        const API_URL = getAPIUrl();
        const stringifiedCategory = JSON.stringify(articlePayload.cat);
        const stringifiedHistory = JSON.stringify(articlePayload.his);
        const stringifiedContent = JSON.stringify(articlePayload.content);
        const response = await fetch(`${API_URL}/api/v1/contribution/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...articlePayload,
                cat: stringifiedCategory,
                his: stringifiedHistory,
                content: stringifiedContent
            }),
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`${response}`);
        const result: CreateArticleResults = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

interface UpdateArticleResults {
    success: boolean;
}

export async function updateArticle(articlePayload: ArticleData): Promise<UpdateArticleResults> {
    try {
        const API_URL = getAPIUrl();
        const stringifiedCategory = JSON.stringify(articlePayload.cat);
        const stringifiedHistory = JSON.stringify(articlePayload.his);
        const stringifiedContent = JSON.stringify(articlePayload.content);
        const response = await fetch(`${API_URL}/api/v1/contribution/update`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...articlePayload,
                cat: stringifiedCategory,
                his: stringifiedHistory,
                content: stringifiedContent
            }),
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`${response}`);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false }
    }
}