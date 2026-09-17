export type BlockType =
    // Generals
    | "gen-heading"
    | "gen-subheading"
    | "gen-paragraph"
    | "gen-notes"
    | "gen-image"
    // Infobox
    | "ib-heading"
    | "ib-subheading"
    | "ib-text"
    | "ib-info"
    | "ib-image";

// General block types
export interface GenHeading {
    type: "gen-heading";
    heading: string;
}
export interface GenSubheading {
    type: "gen-subheading";
    subheading: string;
}
export interface GenParagraph {
    type: "gen-paragraph";
    text: string;
}
export interface GenNotes {
    type: "gen-notes",
    text: string;
}
export interface GenImage {
    type: "gen-image";
    src: string;
    p_id: string;
    desc: string;
    raw_file?: File;
    prev_src?: string;
}

// Infobox block types
export interface IbHeading {
    type: "ib-heading";
    heading: string;
}
export interface IbSubheading {
    type: "ib-subheading";
    subheading: string;
}
export interface IbText {
    type: "ib-text";
    text: string;
}
export interface IbInfo {
    type: "ib-info";
    head: string;
    data: string;
}
export interface IbImage {
    type: "ib-image";
    src: string;
    p_id: string;
    desc: string;
    raw_file?: File;
    prev_src?: string;
}

// Export grouped blocks
export type GeneralBlock = GenHeading | GenSubheading | GenParagraph | GenNotes | GenImage;
export type InfoboxBlock = IbHeading | IbSubheading | IbText | IbInfo | IbImage;
export type Block = GeneralBlock | InfoboxBlock;