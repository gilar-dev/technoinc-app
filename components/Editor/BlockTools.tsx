"use client"; // Client-side rendering directive for Next.js

import BlockMenu from "./BlockMenu";
import { useEditor } from "@/contexts/EditorProvider";

export default function BlockTools() {
    const { blockMenu } = useEditor();

    return (
        <div className="m-3 p-1 sticky bottom-0 rounded-[5px] bg-menu-form-bg lg:mx-7">
            <div>
                <button
                    title="Browse blocks"
                    className={`p-3 block cursor-pointer rounded-[5px] text-white ${blockMenu.show ? "bg-gray-500" : "bg-green-500"}`}
                    onClick={() => blockMenu.set((prev) => !prev)}
                >
                    <i className={`fa-solid fa-plus ${blockMenu.show ? "rotate-45" : ""} transition-transform duration-150 ease-in-out`}></i>
                </button>
            </div>
        </div>
    );
}