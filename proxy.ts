import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function proxy(response: NextRequest) {
    const { pathname } = response.nextUrl;
    const contentID = decodeURIComponent(pathname).split("/wiki/")[1];
    if (!contentID) return NextResponse.next();

    const reformatURI = contentID.replace(/(_+)|( +)/g, "_");
    const cookieStore = await cookies();

    // Set the cookie only if it doesn't already exist
    if (!cookieStore.get("x-user-previous-url")?.value) {
        cookieStore.set("x-user-previous-url", reformatURI, { path: "/", maxAge: 5 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/wiki/:contentID*"
};