export type BlockType =
    | "gen-heading-type"
    | "gen-subheading-type"
    | "gen-paragraph-type"
    | "gen-image-type"
    | "ib-heading-type"
    | "ib-subheading-type"
    | "ib-info-type"
    | "ib-image-type";

// General block types
export interface GenHeading {
    type: "gen-heading-type";
    heading: string;
}
export interface GenSubheading {
    type: "gen-subheading-type";
    subheading: string;
}
export interface GenParagraph {
    type: "gen-paragraph-type";
    text: string;
}
export interface GenImage {
    type: "gen-image-type";
    src: string;
    public_id: string;
    description: string;
    raw_file?: File;
}

// Infobox block types
export interface IbHeading {
    type: "ib-heading-type";
    heading: string;
}
export interface IbSubheading {
    type: "ib-subheading-type";
    subheading: string;
}
export interface IbInfo {
    type: "ib-info-type";
    head: string;
    data: string;
}
export interface IbImage {
    type: "ib-image-type";
    src: string;
    public_id: string;
    description: string;
    raw_file?: File;
}

// Export grouped blocks
export type GeneralBlock = GenHeading | GenSubheading | GenParagraph | GenImage;
export type InfoboxBlock = IbHeading | IbSubheading | IbInfo | IbImage;
export type Block = GeneralBlock | InfoboxBlock;