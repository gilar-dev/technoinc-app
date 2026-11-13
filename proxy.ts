import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reformatURI } from "./utils/textUtils";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const contentID = decodeURIComponent(pathname).split("/wiki/")[1];
    if (!contentID) return NextResponse.next();

    const formattedURI = reformatURI(contentID);
    const response = NextResponse.next();

    // Set the cookie only if it doesn't already exist
    if (!request.cookies.get("x-user-previous-url")?.value) {
        response.cookies.set("x-user-previous-url", formattedURI, {
            path: "/",
            maxAge: 5,
            sameSite: "lax",
        });
    }

    return response;
}

export const config = {
    matcher: "/wiki/:contentID*"
}