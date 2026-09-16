import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { reformatURI } from "@/utils/textUtils";
import { createArticle } from "./contribution";
import { dbGetUniversalID, dbIncreaeUniversalID } from "./database";
import {
    checkMetadataValues,
    checkTitleExistence,
    checkContentValues,
    getImageBlockIndexes,
    uploadCoverImage,
    uploadContentImages,
    replaceImageSources
} from "./publish-materials";

interface UploadArticleReturns {
    success: boolean;
    message: string;
}

/**
 * Upload new article to database after being created
 * @param articleData article data (metadata and content)
 * @returns UploadArticleReturn = { succes: boolean, message: string }
 */
export default async function uploadArticleWiki(articleData: ArticleData): Promise<UploadArticleReturns> {
    const safeClonedData = structuredClone(articleData);
    const formattedTitle = reformatURI(safeClonedData.title);
    const universalID = await dbGetUniversalID();

    // Check article metadata completeness
    const metadataComplete = checkMetadataValues(safeClonedData);
    if (metadataComplete !== "Pass") return { success: false, message: metadataComplete }

    // Check article title existence in database
    const titleExists = await checkTitleExistence(formattedTitle);
    if (titleExists) return { success: false, message: "Article title is already exist" }

    // Check article content values
    const contentComplete = checkContentValues(safeClonedData.content);
    if (contentComplete !== "Pass") return { success: false, message: contentComplete }

    // Check cover raw file and upload the file to cloud storage
    const coverFile = await uploadCoverImage(safeClonedData.raw_file, universalID + 1);
    if (!coverFile) return { success: false, message: "Failed to upload cover image" }

    // Check image file if exist and start uploading its files
    const imageIndexes = getImageBlockIndexes(safeClonedData.content);
    const contentFiles = await uploadContentImages(safeClonedData.content, imageIndexes, universalID + 1);
    if (contentFiles && contentFiles.status === "Error") return { success: false, message: "Failed to upload content images" }

    // Modify current content image src urls with secure cloud urls if exist
    const modifiedContent = contentFiles
        ? replaceImageSources(safeClonedData.content, imageIndexes, contentFiles.public_ids, contentFiles.secure_urls)
        : safeClonedData.content

    const finalArticlePayload: ArticleData = {
        ...safeClonedData,
        title: formattedTitle,
        id: universalID + 1,
        cover: coverFile.secure_urls[0],
        p_id: coverFile.public_ids[0],
        content: modifiedContent
    }
    delete finalArticlePayload.raw_file;
    
    // Start creating new article payload in database
    const createProcess = await createArticle(finalArticlePayload);
    if (!createProcess) return { success: false, message: "Failed to create article" }

    // Update universal id by increasing it to one
    await dbIncreaeUniversalID();

    // Return success if passed all checks
    return { success: true, message: "Article successfully created" }
}