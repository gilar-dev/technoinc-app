"use client"; // Client-side rendering directive for Next.js

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
    const { data: session, status } = useSession();

    if (status === "loading") return (
        <div className="text-[1em] flex justify-center items-center">
            <i className="fa-solid fa-user"></i>
        </div>
    );

    if (session) return (
        <div className="flex items-center gap-4">
            {session.user?.image && (
                <img
                    title={session.user.name || ""}
                    src={session.user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
            )}
        </div>
    );

    return (
        <button
            onClick={() => signIn()}
            className="px-4 py-2 rounded-md text-white"
        ><i className="fa-solid fa-user"></i></button>
    );
}