"use client";

import { useSidebar } from "@/contexts/SidebarProvider";

export function SidebarOverlay() {
    const { isOpen, closeSidebar } = useSidebar();

    return (
        <div
            className={`w-full h-full absolute ${isOpen ? "block" : "hidden"} backdrop-blur-[5px] bg-black/30`}
            onClick={() => closeSidebar()}
        ></div>
    );
}