"use client"; // Client-side rendering directive for Next.js

import { useJhuloid } from "./Jhuloid";
import { reformatURI } from "@/utils/textUtils";

interface PropTypes {
    content: string;
    style?: string;
}

export default function TextParser({ content, style = "" }: PropTypes) {
    const { existingLinks } = useJhuloid();
    const lowerizedExistingLinks = existingLinks.map(link => link.toLowerCase());

    const parsedText = (content: string): any => {
        if (!content) return [];

        const regexPatterns = [
            "(?<bold>\\*(.*?)\\*)",
            "|(?<underline><u>(.*?)</u>)",
            "|(?<italic>_(.*?)_)",
            "|(?<dotted><d>(.*?)</d>)",
            "|(?<link>\\[\\[(.*?)#(.*?)\\]\\])"
        ];
        const regexCombined = new RegExp(regexPatterns.join(""), "g");
        const elements: React.ReactNode[] = [];
        let lastIndex: number = 0;

        const matches = Array.from(content.matchAll(regexCombined));
        matches.forEach((match, index) => {
            const matchString = match[0];
            const matchIndex = match.index ?? 0;
            const groups = match.groups;

            if (matchIndex > lastIndex) {
                elements.push(content.substring(lastIndex, matchIndex));
            }

            if (groups?.bold) {
                const cleanText = match[2];
                elements.push(
                    <strong key={`b-${index}`} className="font-semibold">{parsedText(cleanText)}</strong>
                );
            } else if (groups?.underline) {
                const cleanText = match[4];
                elements.push(
                    <u key={`u-${index}`}>{parsedText(cleanText)}</u>
                );
            } else if (groups?.italic) {
                const cleanText = match[6];
                elements.push(
                    <em key={`i-${index}`}>{parsedText(cleanText)}</em>
                );
            } else if (groups?.dotted) {
                const cleanText = match[8];
                elements.push(
                    <span key={`d-${index}`} className="border-0 border-b border-dotted">{parsedText(cleanText)}</span>
                );
            } else if (groups?.link) {
                const linkLabel = match[10];
                const linkUrl = match[11];
                elements.push(
                    <a
                        key={`l-${index}`}
                        href={reformatURI(linkUrl)}
                        target="_self"
                        rel={undefined}
                        className={`font-medium ${linkUrl && lowerizedExistingLinks.includes(reformatURI(linkUrl).toLowerCase()) ? "text-link" : "text-[#FC7A68]"} hover:underline active:underline`}
                    >
                        {parsedText(linkLabel)}
                    </a>
                );
            }

            lastIndex = matchIndex + matchString.length;
        });

        if (lastIndex < content.length) {
            elements.push(content.substring(lastIndex));
        }

        return elements;
    }

    return (
        <span className={style}>{parsedText(content)}</span>
    );
}