"use client"; // Client-side rendering directive for Next.js

import { useState, useEffect } from "react";
import { useEditor } from "@/contexts/EditorProvider";

export default function TextEditor() {
    const { editMode } = useEditor();
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
        <div className="h-12 m-3 flex justify-between items-center bg-menu-form-bg/50 lg:mx-7">
            {editMode.status && (
                <div className="w-full h-full text-center">
                    <button
                        title="Dotted"
                        className="w-full h-full hover:bg-gray-500/30 transition-colors duration-150 ease-in-out"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}
            <div className="w-full h-full text-center">
                <button
                    title="Bold"
                    className="w-full h-full hover:bg-gray-500/30 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-bold"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Italic"
                    className="w-full h-full hover:bg-gray-500/30 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-italic"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Underline"
                    className="w-full h-full hover:bg-gray-500/30 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-underline"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Dotted"
                    className="w-full h-full hover:bg-gray-500/30 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            <div className="w-full h-full text-center">
                <button
                    title="Link"
                    className="w-full h-full hover:bg-gray-500/30 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-link"></i>
                </button>
            </div>
            <div className="w-[50%] h-full text-center">
                <button
                    title="Publish"
                    className="w-full h-full cursor-pointer text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-150 ease-in-out"
                >
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>
    );
}