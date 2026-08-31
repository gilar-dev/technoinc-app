"use client"; // Client-side rendering directive for Next.js

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return (<>{children}</>);

    return (
        <NextThemesProvider
            storageKey="technoinc-theme"
            attribute="class"
            defaultTheme="theme-bright"
            value={{
                default: "theme-bright",
                bright: "theme-bright",
                dark: "theme-dark"
            }}
        >
            {children}
        </NextThemesProvider>
    );
}