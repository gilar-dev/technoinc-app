"use client"; // Client-side rendering directive for Next.js

import { createContext, useContext, useState } from "react";
import type { Content } from "@/utils/typeUtils";
import { SetState } from "@/utils/typeUtils";

interface EditorProviderProps {
    children: React.ReactNode;
    editMode?: boolean;
}

interface Selection {
    selected: boolean;
    blockIndex: number
    key: string;
    start: number;
    end: number;
    done: boolean;
}

interface EditorTypes {
    editMode: boolean;
    blockOpt: { selected: number | null; set: SetState<number | null>; };
    blockMenu: { show: boolean; set: SetState<boolean>; };
    blockStored: { block: Content | null; set: SetState<Content | null>; };
    selection: Selection;
    setSelection: SetState<Selection>;
}

const EditorContext = createContext<EditorTypes | undefined>(undefined);

export function useEditor() {
    const context = useContext(EditorContext);
    if (!context) throw new Error("useEditor can only be used within EditorProvider");
    return context;
}

export default function EditorProvider({ children, editMode = false }: EditorProviderProps) {
    const [block, setblock] = useState<number | null>(null);
    const [blockMenu, setBlockMenu] = useState<boolean>(false);
    const [blockStored, setBlockStored] = useState<Content | null>(null);
    const [selection, setSelection] = useState<Selection>({
        selected: false, blockIndex: 0, key: "", start: 0, end: 0, done: false
    });

    return (
        <EditorContext.Provider value={{
            editMode: editMode,
            blockOpt: { selected: block, set: setblock },
            blockMenu: { show: blockMenu, set: setBlockMenu },
            blockStored: { block: blockStored, set: setBlockStored },
            selection: selection,
            setSelection: setSelection
        }}>
            {children}
        </EditorContext.Provider>
    );
}