"use client"; // Client-side rendering directive for Next.js

import { MouseEventHandler, useEffect, useRef } from "react";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import BlockRenderer from "./BlockRenderer";

export default function ContentSchema() {
    const { data } = useArticleData();
    const mainRef = useRef<HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
        const parent = e.currentTarget;
        const target = e.target as HTMLElement;
        const selected = target.closest("main > *") as HTMLElement;
        for (const child of parent.children) child.classList.remove("outline");
        if (!selected) return;
        selected.classList.add("outline");
        selected.classList.add("outline-blue-700");
    }

    return (
        <main ref={mainRef} onClick={handleClick} data-content-schema className="mx-3 lg:mx-14 xl:mx-21">
            {data.wiki_content.map((block, index) => (
                <BlockRenderer key={`block-${index}`} block={block} index={index} />
            ))}
        </main>
    );
}