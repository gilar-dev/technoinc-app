"use client"; // Client-side rendering directive for Next.js

import { useRef } from "react";
import { useEditor } from "@/contexts/EditorProvider";
import { blockMenuList } from "@/utils/blockUtils";

export default function BlockMenu() {
    const { blockMenu } = useEditor();
    const blockMenuRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={blockMenuRef}
            className={`
                w-full max-h-[40%] mr-3 overflow-auto p-3 fixed bottom-0 left-0 z-2 bg-menu-form-bg starting:opacity-0 starting:translate-y-full
                ${blockMenu.show ? "block translate-y-0 opacity-100" : "hidden translate-y-full opacity-0"}
                transition-all transition-discrete duration-150 ease-in-out md:w-[75%] md:left-[25%]
            `}
        >
            {/* Title */}
            <div className="flex justify-between items-center">
                <span className="mb-3 font-semibold text-[1.3em]">Blocks</span>
                <button
                    className="text-[1.1em]"
                    onClick={() => blockMenu.set(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div>
                <div className="mb-2">
                    <span>General</span>
                </div>
                <div>
                    <ul className="w-auto flex flex-wrap items-center gap-3">
                        {blockMenuList.general.map((item, index) => (
                            <li key={`item-${index}`}>
                                <div
                                    className="
                                        w-26 aspect-square font-montserrat flex flex-col items-center justify-center gap-2 rounded-md
                                        bg-gray-500/10 hover:text-blue-500/50 hover:bg-blue-500/10"
                                    onClick={() => { }}
                                >
                                    <div className="text-3xl">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className="font-medium text-[0.8em]"><span>{item.label}</span></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}