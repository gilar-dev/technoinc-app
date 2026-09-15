import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { reformatURI } from "@/utils/textUtils";
import { createArticle } from "./contribution";
import { dbGetUniversalID, dbIncreaeUniversalID } from "./database";
import {
    checkMetadataValues,
    checkTitleExistence,
    checkContentValues,
    getImageBlockIndexes,
    uploadImages,
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

    // Check image type block and upload the files to cloud storage
    const coverFile = safeClonedData.raw_file;
    const imageIndexes = getImageBlockIndexes(safeClonedData.content);
    const uploadProcess = await uploadImages(coverFile, safeClonedData.content, imageIndexes, universalID, true);
    if (!uploadProcess) return { success: false, message: "Failed to upload images" }

    // Modify current content image src urls with secure cloud urls
    const modifiedContent = replaceImageSources(
        imageIndexes, safeClonedData.content, uploadProcess.public_ids, uploadProcess.secure_urls
    );
    const finalArticlePayload: ArticleData = {
        ...safeClonedData,
        title: formattedTitle,
        id: universalID + 1,
        cover: uploadProcess.secure_urls[0],
        p_id: uploadProcess.public_ids[0],
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