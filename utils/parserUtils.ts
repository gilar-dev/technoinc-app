import { Schema } from "./typeUtils";
import { reformatURI } from "./textUtils";
import { textToken } from "@/components/Jhuloid/TextParser";

export function getContents(schema: Schema | undefined): (string | string[])[] | undefined {
    if (!schema) return;
    const headings: (string | string[])[] = [];
    let subheadings: string[] = [];

    for (let index = 0; index < schema.length; index++) {
        const block = schema[index];

        if (block.type === "gen-heading") {
            if (subheadings.length > 0) { headings.push(subheadings); subheadings = []; }
            headings.push(block.heading);
        } else if (block.type === "gen-subheading") subheadings.push(block.subheading);
    }
    
    if (subheadings.length > 0) { headings.push(subheadings); subheadings = []; }
    
    return headings.length > 0 ? headings : undefined;
}

export function getLinks(schema: Schema) {
    const links: string[] = [];
    const stringifySchema = JSON.stringify(schema);
    const regex = /\[\[(.*?)#(.*?)\]\]/g;
    for (const match of stringifySchema.matchAll(regex)) {
        const linkUrl = reformatURI(match[2]);
        if (linkUrl && !links.includes(linkUrl)) {
            links.push(linkUrl);
        }
    }
    return links;
}

export function removeTextToken(text: string): string {
    const regexPattern = new RegExp(textToken.join(""), "g");
    const newText: string[] = [];
    let lastIndex: number = 0;

    const matches = Array.from(text.matchAll(regexPattern));
    matches.forEach((match, index) => {
        const matchString = match[0];
        const matchIndex = match.index ?? 0;
        const groups = match.groups;

        if (matchIndex > lastIndex) {
            newText.push(text.substring(lastIndex, matchIndex));
        }

        if (groups?.bold) {
            const cleanText = match[2];
            newText.push(cleanText);
        } else if (groups?.underline) {
            const cleanText = match[4];
            newText.push(cleanText);
        } else if (groups?.italic) {
            const cleanText = match[6];
            newText.push(cleanText);
        } else if (groups?.dotted) {
            const cleanText = match[8];
            newText.push(cleanText);
        } else if (groups?.link) {
            const cleanText = match[10];
            newText.push(cleanText);
        }

        lastIndex = matchIndex + matchString.length;
    });

    if (lastIndex < text.length) newText.push(text.substring(lastIndex));

    return newText.join(" ");
}

export function contentGrouper(content: Schema): Record<string, any>[] {
    const group: Schema = [];
    for (let index = 0; index < content.length; index++) {
        const block = content[index];
        const last = group.length - 1;

        if (block.type === "gen-heading") {
            group.push([{ ...block }]);
            continue;
        }

        if (block.type.includes("ib")) {
            if (Array.isArray(group[last])) {
                // If last index collection contains 'ib', means it's infobox collection
                if (group[last][0].type.includes("ib")) {
                    group[last].push(block);
                    continue;
                } else if (group[last][0].type === "gen-heading") {
                    if (Array.isArray(group[last][group[last].length - 1])) {
                        if (group[last][group[last].length - 1][0].type.includes("ib")) {
                            group[last][group[last].length - 1].push(block);
                            continue;
                        } else {
                            group[last].push([block]);
                            continue;
                        }
                    } else {
                        group[last].push([block]);
                        continue;
                    }
                } else {
                    group.push([block]);
                    continue;
                }
            } else {
                group.push([block]);
                continue;
            }
        }

        // Check if last item of group is not Array
        if (!Array.isArray(group[last])) group.push(block);
        else {
            if (group[last].some((item: Record<string, any>) => !item.type.includes("ib"))) {
                group[last].push(block);
            } else group.push(block);
        }
    }

    return group;
}