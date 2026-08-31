import { Content, Schema } from "./typeUtils";

export function getContents(schema: Schema | undefined): (string | string[])[] | undefined {
    if (!schema) return;
    const headings: (string | string[])[] = [];
    let subheadings: string[] = [];

    for (let index = 0; index < schema.length; index++) {
        const block = schema[index];

        if (block.type === "gen-heading-type") {
            if (subheadings.length > 0) { headings.push(subheadings); subheadings = []; }
            headings.push(block.heading);
        } else if (block.type === "gen-subheading-type") subheadings.push(block.subheading);
    }
    
    if (subheadings.length > 0) { headings.push(subheadings); subheadings = []; }
    
    return headings.length > 0 ? headings : undefined;
}

export function contentGrouper(content: Schema): Record<string, any>[] {
    const group: Schema = [];
    let headingID: number = 0;
    let subheadingID: number = 0;
    for (let index = 0; index < content.length; index++) {
        const block = content[index];
        const last = group.length - 1;

        if (block.type === "gen-heading-type") {
            headingID++;
            subheadingID = 0;
            block.contentID = headingID;
            group.push([block]);
            continue;
        }

        if (block.type.includes("ib")) {
            if (Array.isArray(group[last])) {
                // If last index collection contains 'ib', means it's infobox collection
                if (group[last][0].type.includes("ib")) {
                    group[last].push(block);
                    continue;
                } else if (group[last][0].type === "gen-heading-type") {
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