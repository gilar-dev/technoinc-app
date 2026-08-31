"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
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