import type { Schema } from "@/utils/typeUtils";
import type { ArticleData } from "@/contexts/ArticleDataProvider";
import type { UploadToCloudResults } from "./storage";
import { uploadPackage, uploadToCloud } from "./storage";
import { getAPIUrl, getUploadPreset } from "./database";

// Helper functions
/**
 * Asynchronous function to check article title existence within the database
 * @param title Article title
 * @returns boolean (true if title is already exist, else false)
 */
export async function checkTitleExistence(title: string): Promise<boolean> {
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

/**
 * Asynchronous function to upload images to cloud storage within a folder based on current universal id
 * @param coverFile Raw file of article cover
 * @param content Article content schema
 * @param images list of available image indexes
 * @param universalID Current wiki universal id (from database)
 * @returns UploadToCloudResults | undefined
 */
export async function uploadImages(
    coverFile: File | undefined,
    content: Schema,
    images: number[],
    universalID: number,
    increaseID: boolean = false
): Promise<UploadToCloudResults | undefined> {
    const imageFiles: File[] = [];
    if (coverFile) imageFiles.push(coverFile);
    if (images.length > 0) for (const index of images) imageFiles.push(content[index].raw_file);
    const id = increaseID ? universalID++ : universalID;
    const imageFormData = uploadPackage(imageFiles,
        { folder: `Article_${id}`, uploadPreset: getUploadPreset() }
    );
    // Start uploading images to cloud storage
    const uploadProcess = await uploadToCloud(imageFormData);
    return uploadProcess;
}

/**
 * Check all metadata value validations
 * @param metadata Article metadata (title, id, version, category, cover, view, etc)
 * @returns String (Pass) if all metadata values are valid
 */
export function checkMetadataValues(metadata: ArticleData): string {
    if (!metadata.title.trim()) return "Title can't be empty";
    if (metadata.cat.length === 0) return "Category should be added at least one";
    if (!metadata.cover.trim()) return "Cover can't be empty";
    return "Pass";
}

/**
 * Check all content value validations
 * @param content Article content schema
 * @returns string (Pass) if all content values are valid
 */
export function checkContentValues(content: Schema): string {
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

/**
 * Get all of image blocks indexes in content schema
 * @param content Article content schema
 * @returns List of image block indexes within content schema
 */
export function getImageBlockIndexes(content: Schema): number[] {
    const images: number[] = [];
    content.forEach((block, index) => {
        if (block.type.includes("image")) images.push(index);
    });
    return images;
}

/**
 * Replace current local image preview sources with official sources from cloud storage
 * @param imageIndex List of image block indexes
 * @param content Article content schema
 * @param public_ids List of public ids (string[])
 * @param secure_urls List of secure urls (string[])
 * @returns Updated content schema
 */
export function replaceImageSources(
    imageIndex: number[],
    content: Schema,
    public_ids: string[],
    secure_urls: string[]
): Schema {
    imageIndex.forEach((imgIndex, index) => {
        content[imgIndex]["public_id"] = public_ids[index + 1];
        content[imgIndex]["src"] = secure_urls[index + 1];
        delete content[imgIndex]["raw_file"];
    });
    return content;
}