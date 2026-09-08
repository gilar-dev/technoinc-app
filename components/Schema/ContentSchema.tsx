"use client"; // Client-side rendering directive for Next.js

import { useArticleData } from "@/contexts/ArticleDataProvider";
import BlockRenderer from "./BlockRenderer";

export default function ContentSchema() {
    const { data } = useArticleData();

    return (
        <main data-content-schema className="scroll-mb-50 flex flex-col gap-3 mx-3 lg:mx-14 xl:mx-21">
            {data.wiki_content.map((block, index) => (
                <BlockRenderer key={`block-${index}`} block={block} index={index} />
            ))}
        </main>
    );
}