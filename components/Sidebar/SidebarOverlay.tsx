"use client"; // Client-side rendering directive for Next.js

import { useSidebar } from "@/contexts/SidebarProvider";

export function SidebarOverlay() {
    const { isOpen, closeSidebar } = useSidebar();

    return (
        <div
            className={`w-full h-screen absolute ${isOpen ? "block" : "hidden"} backdrop-blur-[5px] bg-black/30`}
            onClick={() => closeSidebar()}
        ></div>
    );
}