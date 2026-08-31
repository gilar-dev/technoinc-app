import type { ArticleData } from "@/contexts/ArticleDataProvider";

interface Status {
    status: "Success" | "Error";
}

interface ArticleDataResult extends Status {
    article: ArticleData;
}

export async function dbGetArticleData(contentID: string): Promise<ArticleData | undefined> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_TECHNOINC_BACKEND_API!;
        const response = await fetch(`${API_URL}/api/v1/wiki/get/${contentID}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch article content");
        const result: ArticleDataResult | undefined = await response.json();
        return result ? result.article : undefined;
    } catch (error) {
        console.error("Error fetching article content:", error);
    }
}

interface CreateCategoryResult extends Status {
    message: string
}

export async function dbCreateCategory(category: string, parent: string): Promise<boolean | undefined> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_TECHNOINC_BACKEND_API!;
        const response = await fetch(`${API_URL}/api/v1/wiki/category/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category_name: category, category_parent: parent })
        })
        if (!response.ok) throw new Error("Failed to create category");
        const result: CreateCategoryResult = await response.json();
        return result.status === "Success";
    } catch (error) {
        console.error(error);
    }
}