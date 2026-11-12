import type { Block } from "./blockTypeUtils";

export interface BlockMenuItem {
    label: string;
    icon: string;
    block: () => Block;
}

export interface BlockMenuList {
    general: BlockMenuItem[];
    infobox: BlockMenuItem[];
    universal: BlockMenuItem[];
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
        { label: "Ib Style", icon: "fa-brands fa-elementor", block: () => ({ type: "ib-style", b_col: "#000000", h_col: "#000000", h_text: "#000000", sh_col: "#000000", sh_text:"#000000" }) },
        { label: "Ib Heading", icon: "fa-solid fa-heading p-1 border", block: () => ({ type: "ib-heading", heading: "" }) },
        { label: "Ib Subheading", icon: "fa-solid fa-s p-1 border", block: () => ({ type: "ib-subheading", subheading: "" }) },
        { label: "Ib Text", icon: "fa-solid fa-t", block: () => ({ type: "ib-text", text: "" }) },
        { label: "Ib Info", icon: "fa-solid fa-info p-1 border", block: () => ({ type: "ib-info", head: "", data: "" }) },
        { label: "Ib Image", icon: "fa-solid fa-image p-1 border", block: () => ({ type: "ib-image", src: "", p_id: "", desc: "" }) }
    ],
    universal: [
        { label: "Uni Redirect", icon: "fa-solid fa-turn-up rotate-90", block: () => ({ type: "uni-redirect", to: "" }) }
    ]
}