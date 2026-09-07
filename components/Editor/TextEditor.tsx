"use client"; // Client-side rendering directive for Next.js

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEditor } from "@/contexts/EditorProvider";

export default function TextEditor() {
    const { editMode } = useEditor();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
        if (!isMounted) return;
        const selectionHandle = (e: Event): void => {
            console.log(e);
        }
        window.addEventListener("focus", selectionHandle);
        return () => {
            window.removeEventListener("focus", selectionHandle);
        }
    }, []);

    return (
        <div className="sticky top-14 z-1 m-3 flex h-12 items-center justify-between overflow-hidden rounded-md border border-sidebar-border bg-menu-form-bg shadow-sm shadow-black/10 lg:mx-21">
            {editMode && (
                <div className="w-full h-full text-center md:w-[50%]">
                    <button
                        type="button"
                        title="Cancel editing"
                        aria-label="Cancel editing and return to contribution"
                        className="h-full w-full cursor-pointer border-r border-sidebar-border bg-red-500/10 text-red-700 hover:bg-red-500 hover:text-white transition-colors duration-150 ease-in-out"
                        onClick={() => router.push("/contribution")}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}
            <div className="w-full h-full text-center">
                <button
                    title="Bold"
                    className="h-full w-full cursor-pointer text-foreground/65 hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-bold"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Italic"
                    className="h-full w-full cursor-pointer text-foreground/65 hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-italic"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Underline"
                    className="h-full w-full cursor-pointer text-foreground/65 hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-underline"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Dotted"
                    className="h-full w-full cursor-pointer text-foreground/65 hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Link"
                    className="h-full w-full cursor-pointer text-foreground/65 hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-link"></i>
                </button>
            </div>
            <div className="w-full h-full text-center md:w-[50%]">
                <button
                    title="Publish"
                    className="h-full w-full cursor-pointer bg-sidebar-accent text-white hover:brightness-90 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>
    );
}