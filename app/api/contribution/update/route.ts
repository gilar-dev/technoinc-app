import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });
    return NextResponse.json(session, { status: 200 });
}

export async function GET(req: Request) {
    return NextResponse.json({ hello: "world" }, { status: 200 });
}