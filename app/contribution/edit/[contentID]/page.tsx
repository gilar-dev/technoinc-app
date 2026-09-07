import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import EditorProvider from "@/contexts/EditorProvider";
import ArticleForm from "@/components/Contribution/ArticleForm";
import TextEditor from "@/components/Editor/TextEditor";
import ContentSchema from "@/components/Schema/ContentSchema";
import BlockTools from "@/components/Editor/BlockTools";
import BlockMenu from "@/components/Editor/BlockMenu";
import { ContributionHeader } from "../Components";
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
            <div className="overflow-auto bg-background md:w-[75%]">
                <Menubar title="Contribution - Edit" />
                <div className="mx-auto max-w-5xl py-3 lg:py-5">
                    {!articleData && (
                        <div className="mx-3 rounded-lg border border-sidebar-border bg-form-bg p-6 text-center shadow-sm shadow-black/10 lg:mx-21">
                            <div className="mb-3 text-2xl text-sidebar-accent">
                                <i className="fa-regular fa-file-lines"></i>
                            </div>
                            <h1 className="text-xl font-bold">Article unavailable for editing</h1>
                            <p className="mt-2 text-sm text-foreground/65">
                                We could not find an article about <strong className="text-foreground">{cleanContentID}</strong>.
                            </p>
                        </div>
                    )}
                    {articleData && (
                        <EditorProvider editMode={true}>
                            <ContributionHeader title={articleData.title} />
                            <ArticleForm formData={articleData} />
                            <TextEditor />
                            <ContentSchema wikiContent={articleData.wiki_content} />
                            <BlockTools />
                            <BlockMenu />
                        </EditorProvider>
                    )}
                </div>
            </div>
        </div>
    );
}