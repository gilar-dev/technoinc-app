import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { reformatURI } from "@/utils/textUtils";
import { updateArticle } from "./contribution";
import { deleteFromCloud } from "./storage";
import { dbGetArticleData } from "./database";
import {
    checkIsEqual,
    checkMetadataValues,
    checkTitleExistence,
    checkContentValues,
    getImageBlockIndexes,
    uploadCoverImage,
    uploadContentImages,
    replaceImageSources
} from "./publish-materials";

interface UpdateArticleReturns {
    success: boolean;
    message: string;
}

/**
 * Update article to database after being edited
 * @param articleData Article data (metadata & content schema)
 * @param pendingDelete List of image public ids pending to delete
 * @returns UploadArticleReturn = { succes: boolean, message: string }
 */
export default async function updateArticleWiki(
    articleData: ArticleData,
    storedData: ArticleData | undefined,
    pendingDelete: string[]
): Promise<UpdateArticleReturns> {
    const safeClonedData = structuredClone(articleData);
    const formattedTitle = reformatURI(safeClonedData.title);
    const storedTitle = storedData ? reformatURI(storedData.title) : "";
    
    // Check if current version matches with the latest version
    const latestVersion = await dbGetArticleData(storedTitle, "ver");
    if (latestVersion === undefined) return { success: false, message: "Failed to get latest version" }
    if (safeClonedData.ver !== latestVersion) return { success: false, message: "Outdated version! Please refresh the page"  }

    // Check equality of current data with stored data
    const isEqual = checkIsEqual(safeClonedData, storedData as ArticleData);
    if (isEqual) return { success: false, message: "Nothing is changed" }

    // Check article metadata completeness
    const metadataComplete = checkMetadataValues(safeClonedData);
    if (metadataComplete !== "Pass") return { success: false, message: metadataComplete }

    // Check article title existence in database
    const titleExists = await checkTitleExistence(formattedTitle);
    if (formattedTitle.toLowerCase() !== storedTitle.toLowerCase() && titleExists)
        return { success: false, message: "Article title is already exist" }

    // Check article content values
    const contentComplete = checkContentValues(safeClonedData.content);
    if (contentComplete !== "Pass") return { success: false, message: contentComplete }

    // Check image change in pending to delete, then delete it if exist
    if (pendingDelete.length > 0) {
        const deleteProcess = await deleteFromCloud(
            { folder_name: `Article_${safeClonedData.id}`, public_ids: pendingDelete }
        );
        if (!deleteProcess) return { success: false, message: "Failed to delete previous images" }
    }

    // Check cover file and upload it if it changed
    const coverFile = await uploadCoverImage(safeClonedData.raw_file, safeClonedData.id);
    if (coverFile && coverFile.status === "Error") return { success: false, message: "Failed to upload image cover" }

    // Check image content files if there is a change
    const imageIndexes = getImageBlockIndexes(safeClonedData.content);
    const contentFiles = await uploadContentImages(safeClonedData.content, imageIndexes, safeClonedData.id);
    if (contentFiles && contentFiles.status === "Error") return { success: false, message: "Failed to upload content images" }

    // Replace current content data with modified content if exist
    const modifiedContent = contentFiles
        ? replaceImageSources(safeClonedData.content, imageIndexes, contentFiles.public_ids, contentFiles.secure_urls)
        : safeClonedData.content

    const modifiedHistory = [...safeClonedData.his];
    if (modifiedHistory.length >= 10) modifiedHistory.toSpliced(1, 1);

    // Modify current content image src urls with secure cloud urls if exist
    const finalArticlePayload: ArticleData = {
        ...safeClonedData,
        title: formattedTitle,
        cover: coverFile?.secure_urls[0] || safeClonedData.cover,
        p_id: coverFile?.public_ids[0] || safeClonedData.p_id,
        content: modifiedContent
    }
    delete finalArticlePayload.raw_file;

    // Start updating edited article payload in database
    const updateProcess = await updateArticle(finalArticlePayload);
    if (!updateProcess.success) return { success: false, message: "Failed to update article" }

    // Return success if passed all checks
    return { success: true, message: "Article successfully updated" }
}