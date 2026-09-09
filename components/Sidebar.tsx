"use client"; // Client-side rendering directive for Next.js

import { useTheme } from "next-themes";
import { useState, useEffect, useMemo, useRef } from "react";
import type { Schema } from "@/utils/typeUtils";
import { getContents } from "@/utils/parserUtils";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useSidebar } from "@/contexts/SidebarProvider";
import SidebarContent from "./Sidebar/SidebarContent";

interface SidebarProps {
    contents?: Schema | undefined;
    historyLog?: boolean;
}

const mainGroupLists: string[] = [
    "Science and Nature",
    "Human and Society",
    "Culture and Thought"
];
const CategoriesOfGroups: string[][] = [
    ["Nature", "Science", "Technology"], // Science and Nature
    ["Figure", "Society", "Politics", "Business", "Military"], // Human and Society
    ["Arts", "Literature", "History", "Geography", "Philosophy"] // Culture and Thought
];

export default function Sidebar({ contents = undefined, historyLog = false }: SidebarProps) {
    const { theme, setTheme } = useTheme();
    const { isOpen, closeSidebar } = useSidebar();
    const [mounted, setMounted] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState({ isSelected: false, selectedIndex: 0 });
    const contentHeadings = useMemo<(string | string[])[] | undefined>(() => getContents(contents), [contents]);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const openContent = (id: string, subContent: boolean): void => {
        const contentID = id.replaceAll(" ", "_");
        const contentTarget = document.getElementById(contentID);
        window.history.pushState(null, "", `#${contentID}`);
        if (isOpen) closeSidebar();
        if (!contentTarget) return;
        const contentContainer = contentTarget.closest(".content");
        if (!contentContainer) return;
        const targets = contentContainer.getElementsByClassName("child");
        if (!subContent) {
            // If it's a main content heading, toggle the visibility of its child elements
            if (targets[1].classList.contains("hidden")) {
                targets[0].classList.replace("fa-angle-down", "fa-angle-up");
                targets[1].classList.replace("hidden", "block");
            }
            // Scroll to the main content heading
            contentTarget.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        if (targets[1].classList.contains("block")) {
            // Check if the second target is visible (has the "block" class)
            contentTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            // If the second target is not visible, toggle the classes to show it and scroll to the content
            targets[0].classList.replace("fa-angle-down", "fa-angle-up");
            targets[1].classList.replace("hidden", "block");
            contentTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    useEffect(() => {
        setMounted(true);
        if (!sidebarRef.current) return;

        const parentElement = sidebarRef.current.parentElement;
        if (!parentElement) return;

        const parentSibling = parentElement.nextElementSibling as HTMLElement;
        if (!parentSibling) return;

        document.body.style.overflow = isOpen ? "hidden" : "visible";

        const resizeEventHandler = () => {
            const viewportWidth = window.innerWidth;
            if (viewportWidth > 768) closeSidebar();
        }

        // Add event listener for window resize to handle sidebar behavior on larger screens
        window.addEventListener("resize", resizeEventHandler);
        return () => {
            // Clean up the event listener when the component unmounts or when isOpen changes
            window.removeEventListener("resize", resizeEventHandler);
        }
    }, [isOpen]);

    return (
        <aside
            ref={sidebarRef}
            className={`
                w-[75%] h-screen pb-5 overflow-x-hidden overflow-y-auto font-basic flex-col gap-5 fixed z-1 border-r
                border-sidebar-border text-foreground bg-sidebar-bg -translate-x-full transition-transform duration-150 ease-in-out
                md:w-full md:relative md:translate-x-0
                ${isOpen ? "translate-x-0" : ""}
            `}
        >
            <div className="mb-1 px-3 py-4 flex justify-between items-center sticky top-0 border-b border-sidebar-border text-foreground bg-sidebar-bg">
                <div className="flex items-center gap-3">
                    <span className="w-9 h-9 flex justify-center items-center rounded-lg text-sidebar-bg bg-sidebar-accent shadow-sm shadow-black/15">
                        <i className="fa-solid fa-cube"></i>
                    </span>
                    <div className="leading-none">
                        <span className="block font-montserrat font-bold text-[1em] tracking-wide">TechnoInc</span>
                        <span className="mt-1 block font-montserrat text-[0.62em] font-semibold uppercase tracking-[0.2em] text-sidebar-accent">MC Wiki</span>
                    </div>
                </div>
                <span className="text-[1.1em] text-sidebar-accent md:hidden">
                    <button
                        title="Close sidebar"
                        className="cursor-pointer"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </span>
            </div>
            {/* Main groups */}
            <div className={`mx-1 mb-5 ${selectedGroup.isSelected ? "hidden" : "block"}`}>
                <input id="main-group-label" type="checkbox" className="peer hidden" />
                <label
                    htmlFor="main-group-label"
                    className="p-2 cursor-pointer flex justify-between items-center rounded-[10px] border border-sidebar-border bg-sidebar-panel peer-checked:[&>*:last-child]:rotate-180"
                >
                    <span className="font-light">Main groups</span>
                    <span className="transition-transform duration-150 ease-in-out"><i className="fa-solid fa-angle-up"></i></span>
                </label>
                <div className="max-h-40 overflow-hidden peer-checked:max-h-0 peer-checked:p-0 transition-[max-height] duration-150 ease-in-out">
                    <ul className="m-3 flex flex-col gap-3">
                        {mainGroupLists.map((group, index) => (
                            <li
                                key={`group-${index}`}
                                className="cursor-pointer rounded-[5px] hover:bg-sidebar-hover"
                                onClick={() => setSelectedGroup({ isSelected: true, selectedIndex: index })}
                            >
                                <div className="group flex justify-between items-center gap-1 hover:font-bold transition-[font] duration-150 ease-in-out">
                                    <span className="text-[0.9em]">{group}</span>
                                    <span className="text-sidebar-accent group-hover:scale-[120%]"><i className="fa-solid fa-angle-right"></i></span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Featured */}
            <div className={`mx-1 mb-5 ${selectedGroup.isSelected ? "hidden" : "block"}`}>
                <input id="featured-label" type="checkbox" className="peer hidden" />
                <label
                    htmlFor="featured-label"
                    className="p-2 cursor-pointer flex justify-between items-center rounded-[10px] border border-sidebar-border bg-sidebar-panel peer-checked:[&>*:last-child]:rotate-180"
                >
                    <span className="font-light">Featured</span>
                    <span className="transition-transform duration-150 ease-in-out"><i className="fa-solid fa-angle-up"></i></span>
                </label>
                <div className="max-h-40 overflow-hidden peer-checked:max-h-0 peer-checked:p-0 transition-[max-height] duration-150 ease-in-out">
                    <ul className="m-3 flex flex-col gap-3 [&>li]:cursor-pointer [&>li]:rounded-[5px] [&>li]:hover:bg-sidebar-hover">
                        <li
                            onClick={() => { setTheme(theme === "bright" ? "dark" : "bright"); closeSidebar(); }}
                        >
                            <div className="group flex items-center gap-3 hover:font-bold transition-[font,scale] duration-150 ease-in-out">
                                <span className="text-sidebar-accent group-hover:scale-[120%]">
                                    <i className={`fa-solid ${mounted && theme === "bright" ? "fa-sun" : "fa-moon"}`}></i>
                                </span>
                                <span className="text-[0.9em]">Switch theme</span>
                            </div>
                        </li>
                        <li
                            onClick={() => { }}
                        >
                            <div className="group flex items-center gap-3 hover:font-bold transition-[font,scale] duration-150 ease-in-out">
                                <span className="text-sidebar-accent group-hover:scale-[120%]">
                                    <i className="fa-regular fa-map"></i>
                                </span>
                                <span className="text-[0.9em]">Interactive map</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Dynamic content list */}
            {contentHeadings && (<SidebarContent show={selectedGroup.isSelected} contents={contentHeadings} expandContent={openContent} />)}
            {/* Another sidebar panel menu for categories of group */}
            <div className={`
                    w-full h-full px-3 absolute top-0 left-0 bg-sidebar-bg transition-transform duration-150 ease-in-out
                    ${selectedGroup.isSelected ? "translate-x-0" : "translate-x-full"}
                `}>
                <div className="mb-5 py-3 flex justify-between items-center border-b border-sidebar-border text-foreground">
                    <span className="font-montserrat font-bold text-[1em]">{mainGroupLists[selectedGroup.selectedIndex]}</span>
                    <span className="text-[1.4em]">
                        <button
                            className="cursor-pointer"
                            onClick={() => setSelectedGroup({ isSelected: false, selectedIndex: 0 })}
                        >
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    </span>
                </div>
                <div className="text-foreground">
                    <ul>
                        {CategoriesOfGroups[selectedGroup.selectedIndex].map((category, index) => (
                            <li key={`category-${index}`} className="rounded-[5px] px-2 py-1.5 hover:bg-sidebar-hover">
                                <div>
                                    <span>{category}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}