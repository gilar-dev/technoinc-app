"use client"; // Client-side rendering directive for Next.js

import type { Schema } from "@/utils/typeUtils";
import BlockRenderer from "./BlockRenderer";

interface ContentSchemaProps {
    wikiContent?: Schema | undefined;
}

export default function ContentSchema({ wikiContent = undefined }: ContentSchemaProps) {
    return (
        <main className="mx-3 lg:mx-14 xl:mx-21">
            {wikiContent && wikiContent.map((block, index) => (
                <BlockRenderer key={`block-${index}`} block={block} index={index} />
            ))}
        </main>
    );
}