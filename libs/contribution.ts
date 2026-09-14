import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { getAPIUrl } from "@/utils/databaseutils";

interface CreateArticleResults {
    success: boolean;
    url: string;
}

export async function createArticle(articlePayload: ArticleData): Promise<CreateArticleResults | undefined> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/contribution/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(articlePayload),
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`${response}`);
        const result: CreateArticleResults = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}