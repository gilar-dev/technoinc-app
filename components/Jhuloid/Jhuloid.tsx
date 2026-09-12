"use client"; // Client-side rendering directive for Next.js

import { createContext, useContext } from "react";
import type { ArticleData } from "@/contexts/ArticleDataProvider";
import WikiRenderer from "@/components/Jhuloid/WikiRenderer";
import { PrimaryParser, InfoboxParser } from "@/components/Jhuloid/DeepParser";
import { contentGrouper } from "@/utils/parserUtils";
import { Content } from "@/utils/typeUtils";

interface JhuloidProps {
    articleData: ArticleData;
    existingLinks?: string[];
}

interface JhuloidEngineContext {
    existingLinks: string[];
}

const JhuloidEngine = createContext<JhuloidEngineContext | undefined>(undefined);

export function useJhuloid() {
    const context = useContext(JhuloidEngine);
    if (!context) throw new Error("useJhuloid can only be used within JhuloidEngineProvider");
    return context;
}

export default function Jhuloid({ articleData, existingLinks = [] }: JhuloidProps) {
    const contents: (Content | Content[])[] = contentGrouper(articleData.content);
    const expandContent = (event: HTMLDivElement): void => {
        const target = event.nextElementSibling;
        if (!target) return;
        const angle = event.children[1].children[0];
        const isExpand = target.classList.contains("block");
        target.classList.replace(isExpand ? "block" : "hidden", isExpand ? "hidden" : "block");
        angle.classList.replace(isExpand ? "fa-angle-up" : "fa-angle-down", isExpand ? "fa-angle-down" : "fa-angle-up");
    }

    return (
        <JhuloidEngine.Provider value={{ existingLinks: existingLinks }}>
            <main className="p-3 mb-5">
                {contents.map((block, index) => {
                    if (!Array.isArray(block)) return (
                        <WikiRenderer key={index} block={block} />
                    );
                    else if (block[0].type === "gen-heading-type") return (
                        <PrimaryParser key={index} block={block} expandContent={expandContent} />
                    );
                    else if (block[0].type.includes("ib")) return (
                        <InfoboxParser key={index} block={block} index={index} />
                    );
                })}
            </main>
        </JhuloidEngine.Provider>
    );
}