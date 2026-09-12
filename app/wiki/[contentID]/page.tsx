import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Jhuloid from "@/components/Jhuloid/Jhuloid";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import { HeadingHolder, MissingArticle, RedirectNotice } from "./Components";
import { getLinks } from "@/utils/parserUtils";
import { dbGetArticleData, dbGetExistingLinks } from "@/utils/databaseutils";

interface Params {
    params: Promise<{ contentID: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { contentID } = await params;
    const cleanContentID = decodeURIComponent(contentID).replace(/(_+)|( +)/g, "_");
    const articleData = await dbGetArticleData(cleanContentID);

    if (!articleData) return { title: `${cleanContentID.replaceAll("_", " ")} - TechnoInc MC Wiki` }
    return {
        title: `${articleData.title.replaceAll("_", " ")} - TechnoInc MC Wiki`,
        description: articleData.desc,
        metadataBase: new URL(`https://technoinc.world/wiki/${articleData.title}`),
        openGraph: {
            type: "website",
            url: `https://technoinc.world/wiki/${articleData.title}`,
            title: `${articleData.title.replaceAll("_", " ")} - TechnoInc MC Wiki`,
            description: articleData.desc,
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
    const cleanURI = reformatURI.replaceAll("_", " ");
    const articleData = await dbGetArticleData(reformatURI);
    const links = articleData ? getLinks(articleData.content) : [];
    const existingLinks = links ? await dbGetExistingLinks(links) : undefined;

    if (articleData) {
        // Redirect to the correct URL if the contentID in the URL does not match the article title
        if (decodeURIComponent(contentID) !== reformatURI || articleData.title !== reformatURI) {
            redirect(`/wiki/${articleData.title.replaceAll(" ", "_")}`, "replace");
        }
    }

    return (
        <div className="md:relative md:w-[75%] md:left-[25%]">
            <Menubar title={articleData ? articleData.title.replaceAll("_", " ") : cleanURI} />
            <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar contents={articleData?.content} />
            </div>
            <HeadingHolder
                title={articleData ? articleData.title.replaceAll("_", " ") : cleanURI}
                description={articleData ? articleData.desc : ""}
            />
            <div className="main-container lg:px-7">
                {articleData
                    ? (<Jhuloid
                        articleData={articleData}
                        existingLinks={existingLinks}
                    />)
                    : (<MissingArticle title={cleanURI} />)
                }
            </div>
            <Footer />
            {articleData
                && redirectedURL
                && articleData.title.toLowerCase() === redirectedURL.toLowerCase()
                && articleData.title !== redirectedURL
                && (<RedirectNotice redirectedURL={redirectedURL} />)}
        </div>
    );
}