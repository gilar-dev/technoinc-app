"use client"; // Client-side rendering directive for Next.js

import BlockMenu from "./BlockMenu";
import { useEditor } from "@/contexts/EditorProvider";

export default function BlockTools() {
    const { blockMenu } = useEditor();

    return (
        <div className="m-3 p-1 relative rounded-[5px] bg-menu-form-bg/50 lg:mx-7">
            <div>
                <button
                    title="Browse blocks"
                    className="p-3 block cursor-pointer rounded-[5px] text-white bg-green-500"
                    onClick={() => blockMenu.set(true)}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <div>
                <BlockMenu />
            </div>
        </div>
    );
}