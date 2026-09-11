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
    selection: Selection;
    setSelection: SetState<Selection>;
    blockOpt: { selected: number | null; set: SetState<number | null>; };
    blockStored: { block: Content | null; set: SetState<Content | null>; };
    blockMenu: { show: boolean; set: SetState<boolean>; insert: number | null; setInsert: SetState<number | null>; };
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
    const [blockInsert, setBlockInsert] = useState<number | null>(null);
    const [blockStored, setBlockStored] = useState<Content | null>(null);
    const [selection, setSelection] = useState<Selection>({
        selected: false, blockIndex: 0, key: "", start: 0, end: 0, done: false
    });

    return (
        <EditorContext.Provider value={{
            editMode: editMode,
            selection: selection,
            setSelection: setSelection,
            blockOpt: { selected: block, set: setblock },
            blockStored: { block: blockStored, set: setBlockStored },
            blockMenu: { show: blockMenu, set: setBlockMenu, insert: blockInsert, setInsert: setBlockInsert }
        }}>
            {children}
        </EditorContext.Provider>
    );
}