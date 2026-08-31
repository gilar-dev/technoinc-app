import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Jhuloid from "@/components/Jhuloid/Jhuloid";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import { HeadingHolder } from "./Components";
import { dbGetArticleData } from "@/utils/databaseutils";

interface Params {
    params: Promise<{ contentID: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { contentID } = await params;
    const cleanContentID = decodeURIComponent(contentID).replace(/(_+)|( +)/g, " ");
    const articleData = await dbGetArticleData(contentID);
    if (!articleData) return { title: `${cleanContentID} - TechnoInc MC Wiki` }

    return {
        title: `${articleData.title} - TechnoInc MC Wiki`,
        description: articleData.description,
        icons: { icon: articleData.cover },
        openGraph: {
            type: "website",
            url: `https://technoinc.world/wiki/${articleData.title.replaceAll(" ", "_")}`,
            title: articleData.title,
            description: articleData.description,
            images: [{ url: articleData.cover }]
        }
    }
}

export default async function WikiPage({ params }: Params) {
    const { contentID } = await params;
    const reformatURI = decodeURIComponent(contentID).replace(/(_+)|( +)/g, "_");
    const cleanContentID = reformatURI.replaceAll("_", " ");
    const articleData = await dbGetArticleData(reformatURI);

    if (articleData) {
        // If article data is exist but slug is not correct, redirect to correct URL
        if (decodeURIComponent(contentID) !== reformatURI || articleData.title !== cleanContentID) {
            redirect(`/wiki/${articleData.title.replaceAll(" ", "_")}`, "replace");
        }
    }

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col md:flex-row">
            <div className="z-2 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar contents={articleData?.wiki_content} />
            </div>
            <div className="overflow-auto md:w-[75%]">
                <Menubar title={articleData ? articleData.title : cleanContentID} />
                <HeadingHolder
                    title={articleData ? articleData.title : cleanContentID}
                    description={articleData ? articleData.description : ""}
                />
                <div className="lg:px-7">
                    {articleData
                        ? (<Jhuloid articleData={articleData} />)
                        : (<div><p>Sorry, we have no article for that yet.</p></div>)}
                </div>
            </div>
        </div>
    );
}