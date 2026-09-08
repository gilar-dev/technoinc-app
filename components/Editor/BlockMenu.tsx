"use client"; // Client-side rendering directive for Next.js

import { useEffect, useRef } from "react";
import type { Content } from "@/utils/typeUtils";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";
import { blockMenuList } from "@/utils/blockUtils";

export default function BlockMenu() {
    const { data, setData } = useArticleData();
    const { blockMenu } = useEditor();
    const blockMenuRef = useRef<HTMLDivElement>(null);

    const addContentBlock = (block: Content): void => {
        setData({ ...data, wiki_content: [...data.wiki_content, block] });
        blockMenu.set(false);
        const mainContainer = document.querySelector(".main-container");
        if (mainContainer) mainContainer.scrollTo({ top: mainContainer.scrollHeight, behavior: "smooth" });
    }

    useEffect(() => {
        if (!blockMenu.show) return;

        const closeFromOutside = (event: PointerEvent | WheelEvent | FocusEvent): void => {
            const target = event.target;
            if (!(target instanceof Node) || blockMenuRef.current?.contains(target)) return;
            if (target instanceof Element && target.closest("[data-block-menu-trigger]")) return;
            blockMenu.set(false);
        };
        const closeOnEscape = (event: KeyboardEvent): void => {
            if (event.key === "Escape") blockMenu.set(false);
        };

        document.addEventListener("pointerdown", closeFromOutside);
        document.addEventListener("wheel", closeFromOutside, { passive: true });
        document.addEventListener("focusin", closeFromOutside);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeFromOutside);
            document.removeEventListener("wheel", closeFromOutside);
            document.removeEventListener("focusin", closeFromOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [blockMenu]);

    return (
        <div
            ref={blockMenuRef}
            className={`
                w-full max-h-[40%] mr-3 overflow-auto p-4 fixed bottom-0 left-0 z-2 border-t border-sidebar-border bg-menu-form-bg shadow-[0_-8px_25px_rgba(0,0,0,0.12)] starting:opacity-0 starting:translate-y-full
                ${blockMenu.show ? "block translate-y-0 opacity-100" : "hidden translate-y-full opacity-0"}
                transition-all transition-discrete duration-150 ease-in-out md:w-[75%] md:left-[25%]
            `}
        >
            {/* Title */}
            <div className="flex justify-between items-center">
                <span className="mb-3 font-montserrat font-semibold text-[1.15em]">Insert a block</span>
                <button
                    className="text-[1.1em]"
                    onClick={() => blockMenu.set(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            {/* General blocks */}
            <div className="mb-3">
                <div className="mb-2">
                    <span className="text-[0.72em] font-semibold uppercase tracking-[0.16em] text-sidebar-accent">General</span>
                </div>
                <div>
                    <ul className="w-auto flex flex-wrap items-center gap-3">
                        {blockMenuList.general.map((item, index) => (
                            <li key={`item-${index}`}>
                                <div
                                    className="
                                        w-26 aspect-square font-montserrat flex flex-col items-center justify-center gap-2 rounded-md
                                        border border-sidebar-border bg-sidebar-panel hover:border-sidebar-accent hover:text-sidebar-accent hover:bg-sidebar-hover
                                        active:border-sidebar-accent active:text-sidebar-accent active:bg-sidebar-hover"
                                    onClick={() => addContentBlock(item.block())}
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
            {/* Infobox blocks */}
            <div className="mb-3">
                <div className="mb-2">
                    <span className="text-[0.72em] font-semibold uppercase tracking-[0.16em] text-sidebar-accent">Infobox</span>
                </div>
                <div>
                    <ul className="w-auto flex flex-wrap items-center gap-3">
                        {blockMenuList.infobox.map((item, index) => (
                            <li key={`item-${index}`}>
                                <div
                                    className="
                                        w-26 aspect-square font-montserrat flex flex-col items-center justify-center gap-2 rounded-md
                                        border border-sidebar-border bg-sidebar-panel hover:border-sidebar-accent hover:text-sidebar-accent hover:bg-sidebar-hover
                                        active:border-sidebar-accent active:text-sidebar-accent active:bg-sidebar-hover"
                                    onClick={() => console.log(item.label)}
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