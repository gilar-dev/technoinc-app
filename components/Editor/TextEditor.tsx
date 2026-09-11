"use client"; // Client-side rendering directive for Next.js

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";

export default function TextEditor() {
    const { data, setData } = useArticleData();
    const { editMode, selection, setSelection } = useEditor();
    const router = useRouter();

    const addSyntax = (prefix: string, suffix: string): void => {
        if (!selection.selected) return;
        const updatedContent = [...data.wiki_content];
        const currentValue: string = updatedContent[selection.blockIndex][selection.key];
        const isSelected = selection.start === selection.end;
        const selectedValue = isSelected ? "text" : currentValue.slice(selection.start, selection.end);
        const addedPrefix = currentValue.slice(0, selection.start) + prefix + selectedValue + suffix + currentValue.slice(selection.end);
        updatedContent[selection.blockIndex][selection.key] = addedPrefix;
        setData({ ...data, wiki_content: updatedContent });
        setSelection({
            ...selection,
            selected: false,
            start: selection.start + prefix.length,
            end: isSelected ? selection.end + prefix.length + 4 : selection.end + prefix.length,
            done: true
        });
    }

    return (
        <div className="sticky top-18 z-2 m-3 flex h-12 items-center justify-between overflow-hidden rounded-md border border-sidebar-border bg-menu-form-bg shadow-sm shadow-black/10 lg:mx-14 xl:mx-21">
            {editMode && (
                <div className="w-full h-full text-center md:w-[50%]">
                    <button
                        type="button"
                        title="Cancel editing"
                        aria-label="Cancel editing and return to contribution"
                        className="h-full w-full cursor-pointer border-r border-sidebar-border bg-red-500/10 text-red-700 hover:bg-red-500 hover:text-white transition-colors duration-150 ease-in-out"
                        onClick={() => router.back()}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}
            <div className="w-full h-full text-center">
                <button
                    title="Bold"
                    className={`h-full w-full cursor-pointer ${selection.selected ? "text-foreground" : "text-foreground/30"} hover:bg-sidebar-hover transition-colors duration-150 ease-in-out`}
                    onMouseDown={(e) => { e.preventDefault(); addSyntax("**", "**"); }}
                >
                    <i className="fa-solid fa-bold"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Italic"
                    className={`h-full w-full cursor-pointer ${selection.selected ? "text-foreground" : "text-foreground/30"} hover:bg-sidebar-hover transition-colors duration-150 ease-in-out`}
                    onMouseDown={(e) => { e.preventDefault(); addSyntax("*", "*"); }}
                >
                    <i className="fa-solid fa-italic"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Underline"
                    className={`h-full w-full cursor-pointer ${selection.selected ? "text-foreground" : "text-foreground/30"} hover:bg-sidebar-hover transition-colors duration-150 ease-in-out`}
                    onMouseDown={(e) => { e.preventDefault(); addSyntax("__", "__"); }}
                >
                    <i className="fa-solid fa-underline"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Dotted"
                    className={`h-full w-full cursor-pointer ${selection.selected ? "text-foreground" : "text-foreground/30"} hover:bg-sidebar-hover transition-colors duration-150 ease-in-out`}
                    onMouseDown={(e) => { e.preventDefault(); addSyntax("_", "_"); }}
                >
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Link"
                    className={`h-full w-full cursor-pointer ${selection.selected ? "text-foreground" : "text-foreground/30"} hover:bg-sidebar-hover transition-colors duration-150 ease-in-out`}
                    onMouseDown={(e) => { e.preventDefault(); addSyntax("<link:", "#/wiki/>"); }}
                >
                    <i className="fa-solid fa-link"></i>
                </button>
            </div>
            <div className="w-full h-full text-center md:w-[50%]">
                <button
                    title="Publish"
                    className="h-full w-full cursor-pointer text-blue-500 bg-blue-500/30 hover:text-white hover:bg-blue-500 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>
    );
}