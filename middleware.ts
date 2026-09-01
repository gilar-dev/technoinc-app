import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbGetArticleData } from "@/utils/databaseutils";

export async function middleware(response: NextRequest) {
    const { pathname } = response.nextUrl;
    const contentID = decodeURIComponent(pathname).split("/wiki/")[1];
    const reformatURI = contentID.replace(/(_+)|( +)/g, "_");
    const cleanContentID = reformatURI.replaceAll("_", " ");
    const articleData = await dbGetArticleData(reformatURI);

    if (articleData) {
        const cookieStore = await cookies();
        // Redirect to the correct URL if the contentID in the URL does not match the article title
        if (decodeURIComponent(contentID) !== reformatURI || articleData.title !== cleanContentID) {
            cookieStore.set("redirected", reformatURI, { path: "/", maxAge: 5 });
        } else cookieStore.delete("redirected");
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/wiki/:contentID*",
};