"use client"; // Client-side rendering directive for Next.js

import { useState, useEffect, useRef, useMemo } from "react";
import WikiRenderer from "@/components/Jhuloid/WikiRenderer";

interface PrimaryProps {
    block: Record<string, any>[];
    expandContent: (event: HTMLDivElement) => void;
}

interface InfoboxProps {
    block: Record<string, any>[];
    index: number;
}

export function PrimaryParser({ block, expandContent }: PrimaryProps): React.JSX.Element {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const isArray = (content: any): boolean => {
        return Array.isArray(content);
    }
    const checkType = (content: Record<string, any>[], type: string): boolean => {
        return content.some((item: Record<string, any>) => item.type.includes(type));
    }

    useEffect(() => {
        setIsMounted(true);
        const handleResize = (): void => {
            if (isMounted && contentRef.current) {
                if (window.innerWidth > 768) {
                    contentRef.current.classList.replace("hidden", "block");
                    contentRef.current.classList.remove("md:block");
                }
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); }
    }, [isMounted]);

    return (
        <div className="content">
            <div
                onClick={(e) => expandContent(e.currentTarget)}
                className="py-2 cursor-pointer flex justify-between items-center gap-2 border-b border-border active:bg-gray-500/10"
            >
                <WikiRenderer block={block[0]} />
                <span className="text-[1.3em]"><i className="child fa-solid fa-angle-down"></i></span>
            </div>
            <div ref={contentRef} className="child pt-2 hidden md:block">
                {block.map((subBlock: any, subIndex: number) => {
                    if (!isArray(subBlock) && subBlock.type !== "gen-heading-type") return (
                        <WikiRenderer key={subIndex} block={subBlock} />
                    );
                    else if (isArray(subBlock) && checkType(subBlock, "ib")) return (
                        <InfoboxParser key={subIndex} block={subBlock} index={subIndex} />
                    );
                })}
            </div>
        </div>
    );
}

export function InfoboxParser({ block, index }: InfoboxProps): React.JSX.Element {
    const getIBSubheadings = useMemo<number[]>(() => {
        const subheadings: number[] = [];
        for (let pos: number = 0; pos < block.length; pos++) {
            if (block[pos].type === "ib-subheading-type") subheadings.push(pos);
        }
        return subheadings;
    }, [block]);

    const setFullMode = (event: HTMLButtonElement, className: string): void => {
        const infoboxChild: NodeListOf<Element> = document.querySelectorAll(`.${className}`);
        infoboxChild.forEach((child: Element) => {
            const isExpand = child.classList.contains("table-row");
            child.classList.replace(isExpand ? "table-row" : "hidden", !isExpand ? "table-row" : "hidden");
            event.children[0].textContent = !isExpand ? "Collapse" : "Expand";
        });
    }

    return (
        <table
            width="100%"
            className="mb-5 border-separate border border-border bg-infobox-bg md:w-[10%] md:float-right md:clear-right md:ml-5"
        >
            <tbody>
                {block.map((subBlock: any, subIndex: number) => (
                    <tr
                        key={subIndex}
                        className={`table-row ${getIBSubheadings.length > 1 && subIndex >= getIBSubheadings[1] ? `more-${index}` : ""}`}
                    >
                        <td>
                            <WikiRenderer block={subBlock} />
                        </td>
                    </tr>
                ))}
                {getIBSubheadings.length > 1 && (
                    <tr>
                        <td>
                            <div className="w-full mt-3 font-sans flex justify-center items-center hover:bg-gray-300/30">
                                <button
                                    onClick={(e) => setFullMode(e.currentTarget, `more-${index}`)}
                                    className="w-full p-1 cursor-pointer border-none bg-transparent"
                                >
                                    <span className="px-1 font-semibold border-l border-r">Collapse</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
                <tr>
                    <td>
                        <div className="p-3 font-['Inter'] text-[14px] flex justify-between items-center border-t border-border">
                            <span>Infobox</span>
                            <span className="p-0.5 rounded-[100%] scale-[-55%] text-white bg-blue-500 rotate-180"><i className="fa-solid fa-info"></i></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}