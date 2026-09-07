"use client"; // Client-side rendering directive for Next.js

import { useEditor } from "@/contexts/EditorProvider";

export default function BlockTools() {
    const { blockMenu } = useEditor();

    return (
        <div className="sticky bottom-0 z-1 m-3 rounded-md border border-sidebar-border bg-menu-form-bg p-1 shadow-sm shadow-black/10 lg:mx-21">
            <div>
                <button
                    data-block-menu-trigger
                    title="Browse blocks"
                    className={`block cursor-pointer rounded-sm p-3 text-white transition-colors ${blockMenu.show ? "bg-foreground/60" : "bg-sidebar-accent"}`}
                    onClick={() => blockMenu.set((prev) => !prev)}
                >
                    <i className={`fa-solid fa-plus ${blockMenu.show ? "rotate-45" : ""} transition-transform duration-150 ease-in-out`}></i>
                </button>
            </div>
        </div>
    );
}