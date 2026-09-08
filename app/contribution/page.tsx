import type { Metadata } from "next";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import EditorProvider from "@/contexts/EditorProvider";
import ArticleForm from "@/components/Contribution/ArticleForm";
import TextEditor from "@/components/Editor/TextEditor";
import ContentSchema from "@/components/Schema/ContentSchema";
import BlockTools from "@/components/Editor/BlockTools";
import BlockMenu from "@/components/Editor/BlockMenu";
import { ContributionHeader } from "./edit/Components";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";

export const metadata: Metadata = {
    title: "Contribution - TechnoInc MC Wiki",
    description: "Anyone can be a contributor by creating their own article",
    metadataBase: new URL("https://technoinc.world/contribution")
}

export default function ContributionPage() {
    return (
        <div className="w-full h-screen overflow-hidden flex flex-col md:flex-row">
            <div className="z-2 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>
            <div className="main-container overflow-auto bg-background md:w-[75%]">
                <Menubar title="Contribution" />
                <EditorProvider>
                    <ContributionHeader />
                    <ArticleForm />
                    <TextEditor />
                    <ContentSchema />
                    <BlockTools />
                    <BlockMenu />
                </EditorProvider>
            </div>
        </div>
    );
}