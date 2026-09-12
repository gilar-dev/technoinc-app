"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";

const TOOLBAR_BUTTON_CLASS = "h-full w-full cursor-pointer text-foreground transition-colors duration-150 ease-in-out hover:bg-sidebar-hover";
const DISABLED_BUTTON_CLASS = `${TOOLBAR_BUTTON_CLASS} text-foreground/30`;

export default function TextEditor() {
    const { data, setData } = useArticleData();
    const { editMode, selection, setSelection } = useEditor();
    const router = useRouter();

    const syntaxActions = useMemo(() => [
        { title: "Bold", icon: "fa-solid fa-bold", prefix: "**", suffix: "**" },
        { title: "Italic", icon: "fa-solid fa-italic", prefix: "*", suffix: "*" },
        { title: "Underline", icon: "fa-solid fa-underline", prefix: "__", suffix: "__" },
        { title: "Dotted", icon: "fa-solid fa-ellipsis", prefix: "_", suffix: "_" },
        { title: "Link", icon: "fa-solid fa-link", prefix: "<link:", suffix: "#/wiki/>" },
    ], []);

    const addSyntax = (prefix: string, suffix: string): void => {
        if (!selection.selected) return;

        const updatedContent = [...data.content];
        const currentValue = updatedContent[selection.blockIndex][selection.key];
        const isCollapsed = selection.start === selection.end;
        const selectedValue = isCollapsed ? "text" : currentValue.slice(selection.start, selection.end);
        const newValue =
            currentValue.slice(0, selection.start) +
            prefix +
            selectedValue +
            suffix +
            currentValue.slice(selection.end);

        updatedContent[selection.blockIndex][selection.key] = newValue;

        setData({ ...data, content: updatedContent });
        setSelection({
            ...selection,
            selected: false,
            start: selection.start + prefix.length,
            end: isCollapsed ? selection.end + prefix.length + 4 : selection.end + prefix.length,
            done: true,
        });
    };

    const handleButtonMouseDown = (event: React.MouseEvent<HTMLButtonElement>, prefix: string, suffix: string) => {
        event.preventDefault();
        addSyntax(prefix, suffix);
    };

    return (
        <div className="m-3 sticky top-18 z-2 flex h-12 items-center justify-between overflow-hidden rounded-md border border-sidebar-border bg-menu-form-bg shadow-sm shadow-black/10 lg:mx-14 xl:mx-21">
            {editMode && (
                <div className="h-full w-full text-center md:w-[50%]">
                    <button
                        type="button"
                        title="Cancel editing"
                        aria-label="Cancel editing and return to contribution"
                        className="h-full w-full cursor-pointer border-r border-sidebar-border bg-red-500/10 text-red-700 transition-colors duration-150 ease-in-out hover:bg-red-500 hover:text-white"
                        onClick={() => router.back()}
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
            )}

            {syntaxActions.map(({ title, icon, prefix, suffix }) => (
                <div key={title} className="h-full w-full text-center">
                    <button
                        type="button"
                        title={title}
                        className={selection.selected ? TOOLBAR_BUTTON_CLASS : DISABLED_BUTTON_CLASS}
                        onMouseDown={(event) => handleButtonMouseDown(event, prefix, suffix)}
                    >
                        <i className={icon} />
                    </button>
                </div>
            ))}

            <div className="h-full w-full text-center md:w-[50%]">
                <button
                    type="button"
                    title="Publish"
                    className="h-full w-full cursor-pointer bg-blue-500/30 text-blue-500 transition-colors duration-150 ease-in-out hover:bg-blue-500 hover:text-white"
                >
                    <i className="fa-solid fa-angle-right" />
                </button>
            </div>
        </div>
    );
}