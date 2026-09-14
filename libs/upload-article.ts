import type { ArticleData } from "@/contexts/ArticleDataProvider";
import type { Schema } from "@/utils/typeUtils";
import { reformatURI } from "@/utils/textUtils";
import { uploadToCloud, uploadPackage } from "@/utils/storageUtils";
import { getAPIUrl, getUploadPreset, dbGetUniversalID } from "@/utils/databaseutils";

interface UploadArticleReturn {
    success: boolean;
    message: string;
}

/**
 * Upload new article to database after being created
 * @param articleData - article data (metadata and content)
 */
export default async function uploadArticle(articleData: ArticleData): Promise<UploadArticleReturn> {
    const safeClonedData = structuredClone(articleData);
    const universalID = await dbGetUniversalID();

    // Check article metadata completeness
    const metadataComplete = checkMetadataValues(safeClonedData);
    if (metadataComplete !== "Pass") return { success: false, message: metadataComplete }

    // Check article title existence in database
    const titleExists = await checkTitleExistence(reformatURI(safeClonedData.title));
    if (titleExists) return { success: false, message: "Article title is already exist" }

    // Check article content values
    const contentComplete = checkContentValues(safeClonedData.content);
    if (contentComplete !== "Pass") return { success: false, message: contentComplete }

    // Check image type block and upload the files to cloud storage
    const coverFile = safeClonedData.raw_file as File;
    const imageIndexes = getImageBlockIndexes(safeClonedData.content);
    uploadImages(coverFile, safeClonedData.content, imageIndexes, universalID);

    // Return success if passed all checks
    return { success: true, message: "Article successfully created" }
}

// Helper functions
async function checkTitleExistence(title: string): Promise<boolean> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/wiki/articles/${title}/check-exist`);
        if (!response.ok) throw new Error(`${response}`);
        const result: { status: string; is_exist: boolean; } = await response.json();
        return result.is_exist;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function uploadImages(coverFile: File, content: Schema, images: number[], universalID: number): Promise<void> {
    const imageFiles: File[] = [coverFile];
    const imageFormData: FormData[] = [];
    const uploadPreset = getUploadPreset();
    if (images.length > 0) for (const index of images) imageFiles.push(content[index].raw_file);
    for (const file of imageFiles) {
        const processPackage = uploadPackage(file, { folder: `Article_${universalID}`, uploadPreset: uploadPreset });
        imageFormData.push(processPackage);
    }
    // Start uploading images to cloud storage
    const uploadProcess = await uploadToCloud(imageFormData);
}

function checkMetadataValues(metadata: ArticleData): string {
    if (!metadata.title.trim()) return "Title can't be empty";
    if (metadata.cat.length === 0) return "Category should be added at least one";
    if (!metadata.cover.trim()) return "Cover can't be empty";
    return "Pass"
}

function checkContentValues(content: Schema): string {
    if (content.length === 0) return "Content can't be empty";
    for (let i: number = 0; i < content.length; i++) {
        const block = content[i];
        const emptyMessage = `This can't be empty at block ${i + 1}`;
        switch (block.type) {
            case "gen-heading-type":
                if (!block.heading.trim()) return emptyMessage;
                break;
            case "gen-subheading-type":
                if (!block.subheading.trim()) return emptyMessage;
                break;
            case "gen-paragraph-type":
                if (!block.text.trim()) return emptyMessage;
                break;
            case "gen-image-type":
                if (!block.src.trim() || !block.description.trim()) return emptyMessage;
                break;
            case "ib-heading-type":
                 if (!block.heading.trim()) return emptyMessage;
                break;
            case "ib-subheading-type":
                if (!block.subheading.trim()) return emptyMessage;
                break;
            case "ib-info-type":
                if (!block.head.trim() || !block.data.trim()) return emptyMessage;
                break
            case "ib-image-type":
                if (!block.src.trim() || !block.description.trim()) return emptyMessage;
                break;
            default:
                return "None";
        }
    }
    return "Pass";
}

function getImageBlockIndexes(content: Schema): number[] {
    const images: number[] = [];
    content.forEach((block, index) => {
        if (block.type.includes("image")) images.push(index);
    });
    return images;
}