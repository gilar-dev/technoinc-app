import type { Schema, History } from "@/utils/typeUtils";
import type { ArticleData } from "@/contexts/ArticleDataProvider";
import type { UploadToCloudResults } from "./storage";
import { uploadPackage, uploadToCloud } from "./storage";
import { getAPIUrl, getUploadPreset } from "./database";
import { reformatURI } from "@/utils/textUtils";

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

export async function uploadCoverImage(
    coverFile: File | undefined,
    universalID: number
): Promise<UploadToCloudResults | undefined> {
    if (!coverFile) return;
    const preset = getUploadPreset();
    const bundle = uploadPackage([coverFile], { folder: `Article_${universalID}`, uploadPreset: preset });
    const uploadProcess = await uploadToCloud(bundle);
    if (!uploadProcess) return { status: "Error", public_ids: [], secure_urls: [] }
    return uploadProcess;
}

/**
 * Asynchronous function to upload images to cloud storage within a folder based on current universal id
 * @param content Article content schema
 * @param imageIndexes list of available image indexes
 * @param universalID Current wiki universal id (from database)
 * @returns UploadToCloudResults | undefined
 */
export async function uploadContentImages(
    content: Schema,
    imageIndexes: number[],
    universalID: number
): Promise<UploadToCloudResults | undefined> {
    // Check image indexes length and image has raw file
    if (imageIndexes.length === 0) return;
    const hasRawFile = content.some((block) => block.raw_file !== undefined);
    if (!hasRawFile) return;
    // Start bundling the file into form data
    const imageFiles: File[] = [];
    for (const index of imageIndexes) imageFiles.push(content[index].raw_file);
    const imageFormData = uploadPackage(imageFiles,
        { folder: `Article_${universalID}`, uploadPreset: getUploadPreset() }
    );
    // Start uploading images to cloud storage
    const uploadProcess = await uploadToCloud(imageFormData);
    if (!uploadProcess) return { status: "Error", public_ids: [], secure_urls: [] }
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
            // Generals
            case "gen-heading":
                if (!block.heading.trim()) return emptyMessage;
                break;
            case "gen-subheading":
                if (!block.subheading.trim()) return emptyMessage;
                break;
            case "gen-paragraph":
                if (!block.text.trim()) return emptyMessage;
                break;
            case "gen-notes":
                if (!block.text.trim()) return emptyMessage;
                break;
            case "gen-image":
                if (!block.src.trim() || !block.desc.trim()) return emptyMessage;
                break;
            // Infobox
            case "ib-heading":
                 if (!block.heading.trim()) return emptyMessage;
                break;
            case "ib-subheading":
                if (!block.subheading.trim()) return emptyMessage;
                break;
            case "ib-text":
                if (!block.text.trim()) return emptyMessage;
                break;
            case "ib-info":
                if (!block.head.trim() || !block.data.trim()) return emptyMessage;
                break
            case "ib-image":
                if (!block.src.trim() || !block.desc.trim()) return emptyMessage;
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
        if (block.type.includes("image") && block.raw_file !== undefined) images.push(index);
    });
    return images;
}

/**
 * Replace current local image preview sources with official sources from cloud storage
 * @param content Article content schema
 * @param imageIndex List of image block indexes
 * @param public_ids List of public ids (string[])
 * @param secure_urls List of secure urls (string[])
 * @returns Updated content schema
 */
export function replaceImageSources(
    content: Schema,
    imageIndex: number[],
    public_ids: string[],
    secure_urls: string[]
): Schema {
    imageIndex.forEach((imgIndex, index) => {
        content[imgIndex]["p_id"] = public_ids[index];
        content[imgIndex]["src"] = secure_urls[index];
        delete content[imgIndex]["raw_file"];
        delete content[imgIndex]["prev_src"];
    });
    return content;
}

/**
 * Check current article modified data with stored data
 * @param current Current article data (modified)
 * @param stored Stored article data
 * @returns boolean, true if is equal (nothing is changed) else false
 */
export function checkIsEqual(current: ArticleData, stored: ArticleData): boolean {
    let equal: boolean = true;
    if (reformatURI(current.title) !== stored.title) equal = false;
    if (current.desc !== stored.desc) equal = false;
    if (current.cat.length !== stored.cat.length) equal = false;
    for (let index = 0; index < current.cat.length; index++) {
        if (current.cat[index] !== stored.cat[index]) equal = false;
    }
    if (current.cover !== stored.cover) equal = false;
    const currentContentStr = JSON.stringify(current.content);
    const storedContentStr = JSON.stringify(stored.content);
    if (currentContentStr !== storedContentStr) equal = false;
    return equal;
}

export function createDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const dateNum = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const milisecond = date.getMilliseconds();
    const dateFormat = `${year}/${month}/${dateNum}`;
    const timeFormat = `${hour}:${minute}:${milisecond}`;
    return `${dateFormat}, ${timeFormat}`;
}

export function createHistory(historyList: History[], newHistory: History): History[] {
    const updatedHistory = historyList.length >= 10
        ? historyList.toSpliced(1, 1)
        : [...historyList];
    return [...updatedHistory, newHistory];
}