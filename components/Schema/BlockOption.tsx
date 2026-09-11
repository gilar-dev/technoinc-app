"use client"; // Client-side rendering directive for Next.js

import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";

interface BlockOptionProps {
    index: number;
}

type ModifyBlockAction = "copy" | "cut" | "paste" | "paste-below";

export default function BlockOption({ index }: BlockOptionProps) {
    const { data, setData } = useArticleData();
    const { blockOpt, blockStored, blockMenu } = useEditor();

    // Swapping or moving block to up or down within wiki content
    const optMoveBlock = (direction: "up" | "down", index: number): void => {
        if (direction === "up" && index === 0) return;
        else if (direction === "down" && index === data.wiki_content.length - 1) return;

        const modifiedContent = [...data.wiki_content];
        const currentblock = modifiedContent[index];
        const targetBlock = direction === "up" ? index - 1 : index + 1;

        modifiedContent[index] = modifiedContent[targetBlock];
        modifiedContent[targetBlock] = currentblock;
        setData({ ...data, wiki_content: modifiedContent });
    }

    // Adding new block to wiki content
    const optAddBlock = (index: number): void => {
        blockMenu.setInsert(index);
        blockMenu.set(true);
    }

    // Modifying block from wiki content
    const optModifyBlock = (action: ModifyBlockAction, index: number): void => {
        const modifiedContent = [...data.wiki_content];
        if (action === "copy") {
            blockStored.set(modifiedContent[index]);
        } else if (action === "cut") {
            blockStored.set(modifiedContent[index]);
            setData({ ...data, wiki_content: modifiedContent.toSpliced(index, 1) });
        } else if (action === "paste") {
            if (!blockStored.block) return;
            setData({ ...data, wiki_content: modifiedContent.toSpliced(index, 1, blockStored.block) });
        } else if (action === "paste-below") {
            if (!blockStored.block) return;
            setData({ ...data, wiki_content: modifiedContent.toSpliced(index + 1, 0, blockStored.block) });
        }
    }

    // Deleting block from wiki content
    const optDeleteBlock = (index: number): void => {
        const modifiedContent = [...data.wiki_content];
        setData({ ...data, wiki_content: modifiedContent.toSpliced(index, 1) });
    }

    return (
        <div className="relative bg-sidebar-panel">
            {blockOpt.selected !== index && (
                <button
                    className="block-option-button h-full cursor-pointer"
                    onClick={() => blockOpt.set(index)}
                >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            )}
            {/* Option menu */}
            {blockOpt.selected === index && (
                <div className={`
                    absolute left-0 outline-2 outline-blue-500 bg-menu-form-bg
                    ${blockOpt.selected === 0 ? "bottom-0 translate-y-full" : "top-0 -translate-y-full"}
                `}>
                    <ul className="flex items-center gap-1 text-foreground">
                        {/* Move action */}
                        <li>
                            <button
                                title="Move up"
                                className={`p-2 ${index === 0 ? "cursor-not-allowed text-gray-500/50" : "cursor-pointer hover:text-blue-500"}`}
                                onClick={() => optMoveBlock("up", index)}
                            ><i className="fa-solid fa-angle-up"></i></button>
                        </li>
                        <li>
                            <button
                                title="Move down"
                                className={`p-2 ${index === data.wiki_content.length - 1 ? "cursor-not-allowed text-gray-500/50" : "cursor-pointer hover:text-blue-500"}`}
                                onClick={() => optMoveBlock("down", index)}
                            ><i className="fa-solid fa-angle-down"></i></button>
                        </li>
                        {/* Add action */}
                        <li>
                            <button
                                title="Add block"
                                className="p-2 cursor-pointer border-l-2 border-r-2 border-blue-500 hover:text-green-500"
                                onClick={() => optAddBlock(index)}
                            ><i className="fa-solid fa-plus"></i></button>
                        </li>
                        {/* Modify action */}
                        <li>
                            <button
                                title="Copy block"
                                className="p-2 cursor-pointer hover:text-blue-500"
                                onClick={() => optModifyBlock("copy", index)}
                            ><i className="fa-solid fa-copy"></i></button>
                        </li>
                        <li>
                            <button
                                title="Cut block"
                                className="p-2 cursor-pointer hover:text-blue-500"
                                onClick={() => optModifyBlock("cut", index)}
                            ><i className="fa-solid fa-scissors"></i></button>
                        </li>
                        <li>
                            <button
                                title="Paste block"
                                className={`p-2 ${!blockStored.block ? "cursor-not-allowed text-gray-500/50" : "cursor-pointer hover:text-blue-500"}`}
                                onClick={() => optModifyBlock("paste", index)}
                            ><i className="fa-solid fa-paste"></i></button>
                        </li>
                        <li>
                            <button
                                title="Paste block below"
                                className={`p-2 ${!blockStored.block ? "cursor-not-allowed text-gray-500" : "cursor-pointer hover:text-blue-500"}`}
                                onClick={() => optModifyBlock("paste-below", index)}
                            ><i className="fa-regular fa-paste"></i></button>
                        </li>
                        {/* Delete action */}
                        <li>
                            <button
                                title="Delete block"
                                className="p-2 cursor-pointer border-l-2 border-blue-500 hover:text-red-500"
                                onClick={() => optDeleteBlock(index)}
                            ><i className="fa-solid fa-eraser"></i></button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}