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
        { label: "Heading", icon: "fa-solid fa-heading", block: () => ({ type: "gen-heading-type", heading: "" }) },
        { label: "Subheading", icon: "fa-solid fa-s", block: () => ({ type: "gen-subheading-type", subheading: "" }) },
        { label: "Paragraph", icon: "fa-solid fa-paragraph", block: () => ({ type: "gen-paragraph-type", text: "" }) },
        { label: "Image", icon: "fa-solid fa-image", block: () => ({ type: "gen-image-type", src: "", public_id: "", description: "" }) }

    ],
    infobox: [
        { label: "Ib Heading", icon: "fa-solid fa-heading p-1 border", block: () => ({ type: "ib-heading-type", heading: "" }) },
        { label: "Ib Subheading", icon: "fa-solid fa-s p-1 border", block: () => ({ type: "ib-subheading-type", subheading: "" }) },
        { label: "Ib Text", icon: "fa-solid fa-t p-1 border", block: () => ({ type: "ib-info-type", head: "", data: "" }) },
        { label: "Ib Image", icon: "fa-solid fa-image p-1 border", block: () => ({ type: "ib-image-type", src: "", public_id: "", description: "" }) }
    ]
}