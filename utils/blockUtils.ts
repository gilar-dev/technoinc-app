import type { Block } from "./blockTypeUtils";

export type BlockFactory = () => Block;

export interface BlockMenuItem {
    label: string;
    icon: string;
    block: BlockFactory;
}

export interface BlockMenuList {
    general: BlockMenuItem[];
    infobox: BlockMenuItem[];
}

export const blockMenuList: BlockMenuList = {
    general: [
        { label: "Heading", icon: "fa-solid fa-heading", block: () => ({ type: "gen-heading", heading: "" }) },
        { label: "Subheading", icon: "fa-solid fa-s", block: () => ({ type: "gen-subheading", subheading: "" }) },
        { label: "Paragraph", icon: "fa-solid fa-paragraph", block: () => ({ type: "gen-paragraph", text: "" }) },
        { label: "Notes", icon: "fa-solid fa-note-sticky", block: () => ({ type: "gen-notes", text: "" }) },
        { label: "Image", icon: "fa-solid fa-image", block: () => ({ type: "gen-image", src: "", p_id: "", desc: "" }) }

    ],
    infobox: [
        { label: "Ib Heading", icon: "fa-solid fa-heading p-1 border", block: () => ({ type: "ib-heading", heading: "" }) },
        { label: "Ib Subheading", icon: "fa-solid fa-s p-1 border", block: () => ({ type: "ib-subheading", subheading: "" }) },
        { label: "Ib Info", icon: "fa-solid fa-info p-1 border", block: () => ({ type: "ib-info", head: "", data: "" }) },
        { label: "Ib Image", icon: "fa-solid fa-image p-1 border", block: () => ({ type: "ib-image", src: "", p_id: "", desc: "" }) }
    ]
}