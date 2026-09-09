"use client"; // Client-side rendering directive for Next.js

import { useSidebar } from "@/contexts/SidebarProvider";

export function SidebarOverlay() {
    const { isOpen, closeSidebar } = useSidebar();

    return (
        <div
            className={`w-screen h-screen ${isOpen ? "block" : "hidden"} absolute backdrop-blur-[5px] bg-black/30`}
            onClick={() => closeSidebar()}
        ></div>
    );
}