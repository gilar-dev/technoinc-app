"use client"; // Client-side rendering directive for Next.js

import { useState } from "react";
import SearchPanel from "@/components/SearchPanel";

export default function HomeSearch() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                aria-label="Search TechnoInc Wiki"
                onClick={() => setIsSearchOpen(true)}
                className="flex w-full max-w-xl items-center border border-sidebar-border bg-menu-form-bg text-left shadow-sm transition-colors hover:border-sidebar-accent focus-visible:outline-2 focus-visible:outline-sidebar-accent"
            >
                <span className="flex-1 px-4 py-3 text-foreground/55">Search TechnoInc Wiki</span>
                <span className="flex items-center justify-center border-l border-sidebar-border bg-link px-5 py-3 text-white">
                    <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                </span>
            </button>
            {isSearchOpen && <SearchPanel onClose={() => setIsSearchOpen(false)} />}
        </>
    );
}
