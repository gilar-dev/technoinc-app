"use client"; // Client-side rendering directive for Next.js

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeColorSync() {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const color = resolvedTheme === "bright" ? "#141e32" : "#240e1e";

        let meta = document.querySelector("meta[name='theme-color']");
        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "theme-color");
            document.head.appendChild(meta);
        }
        meta.setAttribute("content", color);
    }, [resolvedTheme]);

    return null;
}