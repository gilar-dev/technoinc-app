"use client"; // Client-side rendering directive for Next.js

import { createContext, useContext, useState } from "react";
import { SetState } from "@/utils/typeUtils";

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
    blockMenu: { show: boolean; set: SetState<boolean>; };
    selection: Selection;
    setSelection: SetState<Selection>;
}

const EditorContext = createContext<EditorTypes | undefined>(undefined);

export function useEditor() {
    const context = useContext(EditorContext);
    if (!context) throw new Error("useEditor can only be used within EditorProvider");
    return context;
}

export default function EditorProvider({ children, editMode = false }: { children: React.ReactNode, editMode?: boolean }) {
    const [blockMenu, setBlockMenu] = useState<boolean>(false);
    const [selection, setSelection] = useState<Selection>({ selected: false, blockIndex: 0, key: "", start: 0, end: 0, done: false });

    return (
        <EditorContext.Provider value={{
            editMode: editMode,
            blockMenu: { show: blockMenu, set: setBlockMenu },
            selection: selection,
            setSelection: setSelection
        }}>
            {children}
        </EditorContext.Provider>
    );
}