import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import ArticleForm from "@/components/Contribution/ArticleForm";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import { dbGetArticleData } from "@/utils/databaseutils";

interface PageProps {
    params: Promise<{ contentID: string }>;
}

export default async function ContributionEditPage({ params }: PageProps) {
    const { contentID } = await params;
    const reformatURI = decodeURIComponent(contentID).replace(/(_+)|( +)/g, "_");
    const cleanContentID = reformatURI.replaceAll("_", " ");
    const articleData = await dbGetArticleData(reformatURI);

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col md:flex-row">
            <div className="z-2 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>
            <div className="overflow-auto md:w-[75%]">
                <Menubar title="Contribution - Edit article" />
                <div>
                    {!articleData && (<p>We have no article about <strong>{cleanContentID}</strong></p>)}
                    {articleData && (<ArticleForm formData={articleData} />)}
                </div>
            </div>
        </div>
    );
}