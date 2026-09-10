"use client"; // Client-side rendering directive for Next.js

import { useEffect } from "react";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";
import BlockRenderer from "./BlockRenderer";

export default function ContentSchema() {
    const { data } = useArticleData();
    const { blockOpt } = useEditor();

    useEffect(() => {
        const handleClick = (e: Event): void => {
            const target = e.target as HTMLElement;
            const parent = target.closest(".block-option-button");
            if (!parent) blockOpt.set(null);
        }
        document.addEventListener("click", handleClick);
        return () => { document.removeEventListener("click", handleClick); }
    }, []);

    return (
        <main data-content-schema className="mx-3 lg:mx-14 xl:mx-21">
            {data.wiki_content.map((block, index) => (
                <BlockRenderer key={`block-${index}`} block={block} index={index} />
            ))}
        </main>
    );
}