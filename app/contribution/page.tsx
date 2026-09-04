import type { Metadata } from "next";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import ArticleForm from "@/components/Contribution/ArticleForm";
import BlockTools from "@/components/Editor/BlockTools";
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
            <div className="overflow-auto md:w-[75%]">
                <Menubar title="Contribution" />
                <div className="w-full">
                    <ArticleForm />
                    <BlockTools />
                </div>
            </div>
        </div>
    );
}