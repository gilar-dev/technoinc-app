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
        // General block types
        case "gen-heading-type":
            return (
                <div className="font-historical font-medium flex flex-col items-center text-[26px] bg-sidebar-bg">
                    <textarea
                        name="gen-heading-type"
                        placeholder="Heading"
                        aria-label={`Heading block ${index}`}
                        value={block.heading}
                        className="text-input peer w-full px-1 resize-none field-sizing-content leading-relaxed whitespace-pre-wrap outline-none"
                        onChange={(e) => handleChange(index, "heading", e.currentTarget.value)}
                    />
                    <div className="w-0 h-0.5 bg-sidebar-accent peer-focus:w-full transition-[width] duration-150 ease-in-out"></div>
                </div>
            );
        case "gen-subheading-type":
            return (
                <div className="font-['Inter'] font-semibold text-[18px] flex flex-col bg-sidebar-bg">
                    <textarea
                        name="gen-subheading-type"
                        placeholder="Subheading"
                        aria-label={`Subheading block ${index}`}
                        value={block.subheading}
                        className="text-input w-full px-1 resize-none field-sizing-content leading-relaxed whitespace-pre-wrap outline-none"
                        onChange={(e) => handleChange(index, "subheading", e.currentTarget.value)}
                    />
                </div>
            );
        case "gen-paragraph-type":
            return (
                <div className="font-['Inter'] font-normal text-[15px] bg-sidebar-bg">
                    <textarea
                        name="gen-paragraph-type"
                        placeholder="Paragraph"
                        aria-label={`Paragraph block ${index}`}
                        value={block.text}
                        className="text-input w-full p-1 text-[15px] resize-none field-sizing-content leading-relaxed whitespace-pre-wrap outline-none"
                        onChange={(e) => handleChange(index, "text", e.currentTarget.value)}
                        onSelect={(e) => handleSelection(e.currentTarget)}
                        onBlur={() => setSelection({ ...selection, selected: false })}
                    />
                </div>
            );
        case "gen-image-type":
            return (
                <div className="font-['Inter'] flex justify-center items-center">
                    <div className="max-w-[80%] flex flex-col gap-3">
                        <img
                            src={block.src || undefined}
                            alt={block.description}
                            draggable={false}
                            className="w-full max-h-[22em]"
                        />
                        <input
                            id={`image-input-${index}`}
                            type="file"
                            accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp"
                            className="hidden"
                        />
                        <label
                            htmlFor={`image-input-${index}`}
                            className="mx-auto p-1 text-[0.9em] border-2 border-sidebar-border "
                        >Choose image</label>
                        <textarea
                            name="gen-image-type"
                            aria-label={`Image block ${index}`}
                            placeholder="Image description"
                            value={block.description}
                            className="text-input w-full text-[14px] resize-none field-sizing-content leading-relaxed whitespace-pre-wrap outline-none"
                            onChange={(e) => handleChange(index, "description", e.currentTarget.value)}
                        />
                    </div>
                </div>
            );
        default:
            return (
                <div>Another type of block</div>
            );
    }
}