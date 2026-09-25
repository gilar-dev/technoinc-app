"use client"; // Client-side rendering directive for Next.js

import { SessionProvider } from "next-auth/react";

export default function AppSessionProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}