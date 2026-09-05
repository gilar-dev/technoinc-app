"use client"; // Client-side rendering directive for Next.js

import { useEditor } from "@/contexts/EditorProvider";

export default function BlockMenu() {
    const { blockMenu } = useEditor();

    if (!blockMenu.show) return null;

    return (
        <div className="w-full p-3 absolute bottom-0 left-0 bg-menu-form-bg">
            {/* Title */}
            <div className="flex justify-between items-center">
                <span className="font-semibold text-[1.1em]">Blocks</span>
                <button
                    className="text-[1.1em]"
                    onClick={() => blockMenu.set(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div>
                <div>
                    <span>General</span>
                </div>
                <div>
                    <ul className="flex flex-wrap">
                        <li>
                            <div></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}