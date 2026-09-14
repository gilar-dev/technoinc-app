import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { getAPIUrl } from "./database";

interface CreateArticleResults {
    success: boolean;
    url: string;
}

export async function createArticle(articlePayload: ArticleData): Promise<CreateArticleResults | undefined> {
    try {
        const stringifiedContent = JSON.stringify(articlePayload.content);
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/contribution/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...articlePayload, content: stringifiedContent }),
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`${response}`);
        const result: CreateArticleResults = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}