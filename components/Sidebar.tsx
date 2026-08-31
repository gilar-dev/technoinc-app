"use client"; // Client-side rendering directive for Next.js

import { useTheme } from "next-themes";
import { useState, useEffect, useMemo, useRef } from "react";
import { useSidebar } from "@/contexts/SidebarProvider";
import { Schema } from "@/utils/typeUtils";
import { getContents } from "@/utils/parserUtils";

interface SidebarProps {
    contents?: Schema | undefined;
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

export default function Sidebar({ contents = undefined }: SidebarProps) {
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
        if (!subContent) {
            contentTarget.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        const contentContainer = contentTarget.closest(".content");
        if (!contentContainer) return;
        const targets = contentContainer.getElementsByClassName("child");
        if (targets.length === 0 || targets && targets[1].classList.contains("block")) {
            targets[0].classList.replace("fa-angle-down", "fa-angle-up");
            targets[1].classList.replace("hidden", "block");
            contentTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
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

        if (isOpen) parentSibling.classList.replace("overflow-auto", "overflow-hidden");
        else parentSibling.classList.replace("overflow-hidden", "overflow-auto");

        const resizeEventHandler = () => {
            const viewportWidth = window.innerWidth;
            if (viewportWidth > 768) closeSidebar();
        }

        window.addEventListener("resize", resizeEventHandler);
        return () => {
            window.removeEventListener("resize", resizeEventHandler);
        }
    }, [isOpen]);

    return (
        <aside
            ref={sidebarRef}
            className={`
                w-[75%] h-full px-3 py-5 overflow-hidden font-basic flex-col gap-5 fixed z-1 border-r
                border-border text-foreground bg-background -translate-x-full transition-transform duration-150 ease-in-out
                md:w-full md:relative md:translate-x-0
                ${isOpen ? "translate-x-0" : ""}
            `}
        >
            <div className="mb-5 flex justify-between items-center text-foreground">
                <span className="font-montserrat font-bold text-[0.9em]">TechnoInc MC Wiki</span>
                <span className="text-[1.2em] md:hidden">
                    <button
                        className="cursor-pointer"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </span>
            </div>
            {/* Main groups */}
            <div className="mb-5">
                <input id="main-group-label" type="checkbox" className="peer hidden" />
                <label
                    htmlFor="main-group-label"
                    className="p-2 cursor-pointer flex justify-between items-center rounded-[10px] bg-list-bg peer-checked:[&>*:last-child]:rotate-180"
                >
                    <span className="font-light">Main groups</span>
                    <span className="transition-transform duration-150 ease-in-out"><i className="fa-solid fa-angle-down"></i></span>
                </label>
                <div className="max-h-40 overflow-hidden peer-checked:max-h-0 peer-checked:p-0 transition-[max-height] duration-150 ease-in-out">
                    <ul className="m-3 flex flex-col gap-3">
                        {mainGroupLists.map((group: string, index: number) => (
                            <li
                                key={`group-${index}`}
                                className="cursor-pointer rounded-[5px] hover:bg-foreground/5"
                                onClick={() => setSelectedGroup({ isSelected: true, selectedIndex: index })}
                            >
                                <div className="group flex justify-between items-center gap-1 hover:font-bold transition-[font] duration-150 ease-in-out">
                                    <span className="text-[0.9em]">{group}</span>
                                    <span className="group-hover:scale-[120%]"><i className="fa-solid fa-angle-right"></i></span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Featured */}
            <div className="mb-5">
                <input id="featured-label" type="checkbox" className="peer hidden" />
                <label
                    htmlFor="featured-label"
                    className="p-2 cursor-pointer flex justify-between items-center rounded-[10px] bg-list-bg peer-checked:[&>*:last-child]:rotate-180"
                >
                    <span className="font-light">Featured</span>
                    <span className="transition-transform duration-150 ease-in-out"><i className="fa-solid fa-angle-down"></i></span>
                </label>
                <div className="max-h-40 overflow-hidden peer-checked:max-h-0 peer-checked:p-0 transition-[max-height] duration-150 ease-in-out">
                    <ul className="m-3 flex flex-col gap-3 [&>li]:cursor-pointer [&>li]:rounded-[5px] [&>li]:hover:bg-foreground/5">
                        <li
                            onClick={() => { setTheme(theme === "bright" ? "dark" : "bright"); closeSidebar(); }}
                        >
                            <div className="group flex items-center gap-3 hover:font-bold transition-[font,scale] duration-150 ease-in-out">
                                <span className="group-hover:scale-[120%]">
                                    <i className={`fa-solid ${mounted && theme === "bright" ? "fa-sun" : "fa-moon"}`}></i>
                                </span>
                                <span className="text-[0.9em]">Switch theme</span>
                            </div>
                        </li>
                        <li
                            onClick={() => { }}
                        >
                            <div className="group flex items-center gap-3 hover:font-bold transition-[font,scale] duration-150 ease-in-out">
                                <span className="group-hover:scale-[120%]">
                                    <i className="fa-regular fa-map"></i>
                                </span>
                                <span className="text-[0.9em]">Interactive map</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Dynamic content list */}
            {contentHeadings && (
                <div className="mb-5">
                    <input id="content-label" type="checkbox" className="peer hidden" />
                    <label
                        htmlFor="content-label"
                        className="p-2 cursor-pointer flex justify-between items-center rounded-[10px] bg-list-bg peer-checked:[&>*:last-child]:rotate-180"
                    >
                        <span>Contents</span>
                        <span className="transition-transform duration-150 ease-in-out"><i className="fa-solid fa-angle-down"></i></span>
                    </label>
                    <div className="max-h-96 overflow-hidden peer-checked:max-h-0 peer-checked:p-0 transition-[max-height] duration-150 ease-in-out [&_ul]:pl-3">
                        <ul className="m-3 flex flex-col gap-1 [&_a]:cursor-pointer [&_a]:rounded-[5px] [&_a]:hover:bg-foreground/5">
                            {contentHeadings.map((heading, index) => {
                                const nextContent = contentHeadings[index + 1];
                                if (!Array.isArray(heading)) return (
                                    <li
                                        key={`heading-${index}`}
                                        className="relative"
                                    >
                                        {Array.isArray(nextContent) && (
                                            <span
                                                className="mr-2 cursor-pointer absolute translate-x-[-110%] bg-foreground/5"
                                                onClick={(e) => {
                                                    const parent = e.currentTarget.parentElement;
                                                    const icon = e.currentTarget.children[0];
                                                    if (!parent || !icon) return;
                                                    const child = parent.children[2];
                                                    const currentDisplay = child.classList.contains("flex");
                                                    icon.classList.replace(currentDisplay ? "fa-angle-up" : "fa-angle-down", currentDisplay ? "fa-angle-down" : "fa-angle-up");
                                                    child.classList.replace(currentDisplay ? "flex" : "hidden", currentDisplay ? "hidden" : "flex")
                                                }}
                                            >
                                                <i className="fa-solid fa-angle-up"></i>
                                            </span>
                                        )}
                                        <a
                                            href={`#${heading.replaceAll(" ", "_")}`}
                                            className="w-full inline-block text-[0.9em]"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openContent(heading, false);
                                            }}
                                        >{heading}</a>
                                        {Array.isArray(nextContent) && (
                                            <ul className="flex flex-col gap-1 [&_a]:cursor-pointer [&_a]:rounded-[5px] [&_a]:hover:bg-foreground/5">
                                                {nextContent.map((subheading, subindex) => (
                                                    <li key={`subheading-${index}.${subindex}`}>
                                                        <a
                                                            href={`#${subheading.replaceAll(" ", "_")}`}
                                                            className="w-full block text-[0.9em]"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                openContent(subheading, true);
                                                            }}
                                                        >{subheading}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {/* Another sidebar panel menu for categories of group */}
            <div className={`
                    w-full h-full px-3 absolute top-0 left-0 bg-background transition-transform duration-150 ease-in-out
                    ${selectedGroup.isSelected ? "translate-x-0" : "translate-x-full"}
                `}>
                <div className="mb-5 py-3 flex justify-between items-center border-b border-border text-foreground">
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
                            <li key={`category-${index}`}>
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