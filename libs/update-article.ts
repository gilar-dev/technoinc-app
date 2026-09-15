import type { Schema } from "@/utils/typeUtils";
import type { ArticleData } from "@/contexts/ArticleDataProvider";
import type { UploadToCloudResults } from "./storage";
import { reformatURI } from "@/utils/textUtils";
import { deleteFromCloud } from "./storage";
import { updateArticle } from "./contribution";
import {
    checkMetadataValues,
    checkTitleExistence,
    checkContentValues,
    getImageBlockIndexes,
    uploadImages,
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
    console.log(pendingDelete);
    const safeClonedData = structuredClone(articleData);
    const formattedTitle = reformatURI(safeClonedData.title);
    const storedTitle = storedData ? reformatURI(storedData.title) : "";

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

    // Check image change if exist, then delete it
    if (pendingDelete.length > 0) {
        const deleteProcess = await deleteFromCloud(
            { folder_name: `Article_${safeClonedData.id}`, public_ids: pendingDelete }
        );
        if (!deleteProcess) return { success: false, message: "Failed to delete previous images" }
    }

    // Check image type block and upload it only when it has raw file
    const coverFile = safeClonedData.raw_file;
    const imageIndexes = getImageBlockIndexes(safeClonedData.content);
    const hasRawFile = safeClonedData.content.some((block) => block.raw_file !== undefined);
    let uploadProcess: UploadToCloudResults | undefined;
    let modifiedContent: Schema | undefined;
    if (imageIndexes.length > 0 && hasRawFile) {
        uploadProcess = await uploadImages(
            coverFile, safeClonedData.content, imageIndexes, safeClonedData.id
        );
        if (!uploadProcess) return { success: false, message: "Failed to upload images" }
        modifiedContent = replaceImageSources(
            imageIndexes, safeClonedData.content, uploadProcess.public_ids, uploadProcess.secure_urls
        );
    }

    // Modify current content image src urls with secure cloud urls if exist
    const finalArticlePayload: ArticleData = {
        ...safeClonedData,
        title: formattedTitle,
        cover: uploadProcess?.secure_urls[0] || safeClonedData.cover,
        p_id: uploadProcess?.public_ids[0] || safeClonedData.p_id,
        content: modifiedContent || safeClonedData.content
    }
    delete finalArticlePayload.raw_file;

    // Start updating edited article payload in database
    const updateProcess = await updateArticle(finalArticlePayload);
    if (!updateProcess.success) return { success: false, message: "Failed to update article" }

    // Return success if passed all checks
    return { success: true, message: "Article successfully updated" }
}