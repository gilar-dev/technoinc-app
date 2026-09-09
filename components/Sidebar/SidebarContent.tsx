interface SidebarContentProps {
    show: boolean;
    contents: (string | string[])[];
    expandContent: (id: string, subContent: boolean) => void;
}

export default function SidebarContent({ show, contents, expandContent }: SidebarContentProps) {
    return (
        <div className={`mx-1 mb-5 ${show ? "hidden" : "block"}`}>
            <input id="content-label" type="checkbox" className="peer hidden" />
            <label
                htmlFor="content-label"
                className="p-2 cursor-pointer flex justify-between items-center rounded-[10px] border border-sidebar-border bg-sidebar-panel peer-checked:[&>*:last-child]:rotate-180"
            >
                <span>Contents</span>
                <span className="transition-transform duration-150 ease-in-out"><i className="fa-solid fa-angle-up"></i></span>
            </label>
            <div className="max-h-96 overflow-hidden peer-checked:max-h-0 peer-checked:p-0 transition-[max-height] duration-150 ease-in-out [&_ul]:pl-3">
                <ul className="m-3 flex flex-col gap-1 [&_a]:cursor-pointer [&_a]:rounded-[5px] [&_a]:hover:bg-sidebar-hover">
                    {contents.map((heading, index) => {
                        const nextContent = contents[index + 1];
                        if (!Array.isArray(heading)) return (
                            <li
                                key={`heading-${index}`}
                                className="relative"
                            >
                                {Array.isArray(nextContent) && (
                                    <span
                                        className="mr-2 cursor-pointer absolute translate-x-[-110%] text-sidebar-accent"
                                        onClick={(e) => {
                                            const parent = e.currentTarget.parentElement;
                                            const icon = e.currentTarget.children[0];
                                            if (!parent || !icon) return;
                                            const child = parent.children[2];
                                            const currentDisplay = child.classList.contains("flex");
                                            icon.classList.replace(currentDisplay ? "fa-angle-down" : "fa-angle-right", currentDisplay ? "fa-angle-right" : "fa-angle-down");
                                            child.classList.replace(currentDisplay ? "flex" : "hidden", currentDisplay ? "hidden" : "flex")
                                        }}
                                    >
                                        <i className="fa-solid fa-angle-down"></i>
                                    </span>
                                )}
                                <a
                                    href={`#${heading.replaceAll(" ", "_")}`}
                                    className="w-full inline-block text-[0.9em]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        expandContent(heading, false);
                                    }}
                                >{heading}</a>
                                {Array.isArray(nextContent) && (
                                    <ul className="flex flex-col gap-1 border-l border-sidebar-border [&_a]:cursor-pointer [&_a]:rounded-[5px] [&_a]:hover:bg-sidebar-hover">
                                        {nextContent.map((subheading, subindex) => (
                                            <li key={`subheading-${index}.${subindex}`}>
                                                <a
                                                    href={`#${subheading.replaceAll(" ", "_")}`}
                                                    className="w-full block text-[0.9em]"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        expandContent(subheading, true);
                                                    }}
                                                >{subheading}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}