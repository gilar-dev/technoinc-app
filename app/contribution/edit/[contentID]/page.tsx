import ProcessProvider from "@/contexts/ProcessProvider";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import EditorProvider from "@/contexts/EditorProvider";
import ArticleForm from "@/components/Contribution/ArticleForm";
import TextEditor from "@/components/Editor/TextEditor";
import ToastProvider from "@/contexts/ToastProvider";
import ContentSchema from "@/components/Schema/ContentSchema";
import BlockTools from "@/components/Editor/BlockTools";
import BlockMenu from "@/components/Editor/BlockMenu";
import Validation from "@/components/Editor/Validation";
import Overlay from "@/components/Overlay";
import Footer from "@/components/Footer";
import { ContributionHeader, MissingArticle } from "../../Components";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import { dbGetArticleData } from "@/libs/database";

interface PageProps {
    params: Promise<{ contentID: string }>;
}

export default async function ContributionEditPage({ params }: PageProps) {
    const { contentID } = await params;
    const reformatURI = decodeURIComponent(contentID).replace(/(_+)|( +)/g, "_");
    const cleanContentID = reformatURI.replaceAll("_", " ");
    const articleData = await dbGetArticleData(reformatURI);

    return (
        <ProcessProvider>
            <div className="md:relative md:w-[75%] md:left-[25%]">
                <Menubar title="Contribution - Edit" />
                <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                    <SidebarOverlay />
                    <Sidebar />
                </div>
                {!articleData ? (
                    <MissingArticle title={cleanContentID} />
                ) : (
                    <EditorProvider editMode={true} currentData={articleData}>
                        <ToastProvider>
                            <ContributionHeader title={articleData.title.replaceAll("_", " ")} />
                            <ArticleForm formData={{ ...articleData, title: articleData.title.replaceAll("_", " ") }} />
                            <TextEditor />
                            <ContentSchema />
                            <BlockTools />
                            <BlockMenu />
                            <Validation />
                        </ToastProvider>
                    </EditorProvider>
                )}
                <Overlay />
                <Footer />
            </div>
        </ProcessProvider>
    );
}