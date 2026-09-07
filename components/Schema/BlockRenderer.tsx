"use client"; // Client-side rendering directive for Next.js

import { useState, useEffect } from "react";
import type { Content } from "@/utils/typeUtils"
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";

interface BlockRendererProps {
    block: Content;
    index: number;
}

export default function BlockRenderer({ block, index }: BlockRendererProps) {
    const { data, setData } = useArticleData();
    const { selection, setSelection } = useEditor();

    const handleChange = (index: number, key: string, value: string): void => {
        const updatedContent = [...data.wiki_content];
        updatedContent[index][key] = value;
        setData({ ...data, wiki_content: updatedContent });
    }

    const handleSelection = (target: HTMLTextAreaElement): void => {
        const selectionStart = target.selectionStart;
        const selectionEnd = target.selectionEnd;
        setSelection({ ...selection, selected: true, blockIndex: index, key: "text", start: selectionStart, end: selectionEnd });
        if (selection.done) {
            target.setSelectionRange(selection.start, selection.end);
            setSelection({ ...selection, done: false });
        }
    }

    switch (block.type) {
        case "gen-heading-type":
            return (
                <div className="font-historical font-medium text-[26px]">
                    <textarea
                        name="gen-heading-type"
                        aria-label={`Heading block ${index}`}
                        value={block.heading}
                        className="text-input w-full resize-none field-sizing-content leading-relaxed whitespace-pre-wrap"
                        onChange={(e) => handleChange(index, "heading", e.currentTarget.value)}
                    />
                </div>
            );
        case "gen-paragraph-type":
            return (
                <div className="font-['Inter'] font-normal text-[15px]">
                    <textarea
                        name="gen-paragraph-type"
                        aria-label={`Paragraph block ${index}`}
                        value={block.text}
                        className="text-input w-full resize-none field-sizing-content leading-relaxed whitespace-pre-wrap"
                        onChange={(e) => handleChange(index, "text", e.currentTarget.value)}
                        onSelect={(e) => handleSelection(e.currentTarget)}
                        onBlur={() => setSelection({ ...selection, selected: false })}
                    />
                </div>
            );
        default:
            return (
                <div>Another type of block</div>
            );
    }
}