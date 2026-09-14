import { getAPIUrl } from "./databaseutils";

interface UploadConfig {
    folder: string;
    uploadPreset: string;
}

export async function uploadToCloud(fileForms: FormData[]): Promise<void> {
    try {
        const API_URL = getAPIUrl();
        const response = await fetch(`${API_URL}/api/v1/cloudinary/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ form_data_list: fileForms }),
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`${response}`);
    } catch (error) {
        console.error(error);
    }
}

export function uploadPackage(rawFile: File, config: UploadConfig): FormData {
    const dataPackage = new FormData();
    dataPackage.append("file", rawFile);
    dataPackage.append("folder", config.folder);
    dataPackage.append("upload_preset", config.uploadPreset);
    return dataPackage;
}