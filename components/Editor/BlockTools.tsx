"use client"; // Client-side rendering directive for Next.js

import { useEditor } from "@/contexts/EditorProvider";

export default function BlockTools() {
    const { blockMenu } = useEditor();

    return (
        <div className="m-3 flex items-center sticky bottom-3 z-1 rounded-md border border-sidebar-border bg-menu-form-bg p-1 shadow-sm shadow-black/10 lg:mx-14 xl:mx-21">
            <div className="">
                <button
                    data-block-menu-trigger
                    title="Paste block"
                    className={`block cursor-pointer rounded-sm p-3 text-white transition-colors ${blockMenu.show ? "bg-foreground/60" : "bg-sidebar-accent"}`}
                    onClick={() => { }}
                >
                    <i className="fa-solid fa-paste"></i>
                </button>
            </div>
            <div className="ml-auto">
                <button
                    data-block-menu-trigger
                    title="Browse blocks"
                    className="block cursor-pointer rounded-sm p-3 border border-green-500 text-green-500 bg-green-500/30 transition-colors duration-150 ease-in-out hover:text-white hover:bg-green-500"
                    onClick={() => blockMenu.set((prev) => !prev)}
                >
                    <i className={`fa-solid fa-plus ${blockMenu.show ? "rotate-45" : ""} transition-transform duration-150 ease-in-out`}></i>
                </button>
            </div>
        </div>
    );
}