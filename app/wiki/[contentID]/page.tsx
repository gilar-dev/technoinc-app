import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Jhuloid from "@/components/Jhuloid/Jhuloid";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import { HeadingHolder, RedirectNotice } from "./Components";
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
        metadataBase: new URL(`https://technoinc.world/wiki/${articleData.title.replaceAll(" ", "_")}`),
        openGraph: {
            type: "website",
            url: `https://technoinc.world/wiki/${articleData.title.replaceAll(" ", "_")}`,
            title: `${articleData.title} - TechnoInc MC Wiki`,
            description: articleData.description,
            siteName: "TechnoInc MC Wiki",
            images: [{ url: articleData.cover, width: 800, height: 600, alt: articleData.title }]
        }
    }
}

export default async function WikiPage({ params }: Params) {
    const { contentID } = await params;
    const cookieStore = await cookies();
    const redirectedURL = cookieStore.get("x-user-previous-url")?.value;
    const reformatURI = decodeURIComponent(contentID).replace(/(_+)|( +)/g, "_");
    const cleanContentID = reformatURI.replaceAll("_", " ");
    const articleData = await dbGetArticleData(reformatURI);

    if (articleData) {
        console.log(articleData.title, redirectedURL);
        // Redirect to the correct URL if the contentID in the URL does not match the article title
        if (decodeURIComponent(contentID) !== reformatURI || articleData.title !== cleanContentID) {
            redirect(`/wiki/${articleData.title.replaceAll(" ", "_")}`, "replace");
        }
    }

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col relative md:flex-row">
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
                        : (<div className="p-3"><p>Sorry, we have no article for that yet.</p></div>)
                    }
                </div>
            </div>
            {articleData && redirectedURL && articleData.title !== redirectedURL.replaceAll("_", " ") && (
                <RedirectNotice redirectedURL={redirectedURL} />
            )}
        </div>
    );
}