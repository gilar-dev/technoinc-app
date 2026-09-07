interface BlockMenuList {
    general: { label: string, icon: string }[];
    infobox: { label: string, icon: string }[];
}

export const blockMenuList: BlockMenuList = {
    general: [
        { label: "Heading", icon: "fa-solid fa-heading" },
        { label: "Subheading", icon: "fa-solid fa-s" },
        { label: "Paragraph", icon: "fa-solid fa-paragraph" },
        { label: "Image", icon: "fa-solid fa-image" }

    ],
    infobox: [
        { label: "Ib Heading", icon: "fa-solid fa-heading p-1 border" },
        { label: "Ib Subheading", icon: "fa-solid fa-s p-1 border" },
        { label: "Ib Text", icon: "fa-solid fa-t p-1 border" },
        { label: "Ib Image", icon: "fa-solid fa-image p-1 border" }
    ]
}