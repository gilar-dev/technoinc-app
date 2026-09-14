import { getAPIUrl } from "./databaseutils";

interface UploadConfig {
    folder: string;
    uploadPreset: string;
}

export interface UploadToCloudResults {
    status: string;
    public_ids: string[];
    secure_urls: string[];
}

export async function uploadToCloud(fileForms: FormData): Promise<UploadToCloudResults | undefined> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/cloudinary/upload`, {
            method: "POST",
            body: fileForms,
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`${response}`);
        const result: UploadToCloudResults = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export function uploadPackage(rawFile: File[], config: UploadConfig): FormData {
    const dataPackage = new FormData();
    for (const file of rawFile) dataPackage.append("file", file);
    dataPackage.append("folder", config.folder);
    dataPackage.append("upload_preset", config.uploadPreset);
    return dataPackage;
}