"use client"; // Client-side rendering directive for Next.js

import { createContext, useContext, useState } from "react";
import { SetState } from "@/utils/typeUtils";

interface EditorTypes {
    editMode: { status: boolean; set: SetState<boolean>; }
    blockMenu: { show: boolean, set: SetState<boolean>; }
}

const EditorContext = createContext<EditorTypes | undefined>(undefined);

export function useEditor() {
    const context = useContext(EditorContext);
    if (!context) throw new Error("useEditor can only be used within EditorProvider");
    return context;
}

export default function EditorProvider({ children }: { children: React.ReactNode }) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [blockMenu, setBlockMenu] = useState<boolean>(false);

    return (
        <EditorContext.Provider value={{
            editMode: { status: editMode, set: setEditMode },
            blockMenu: { show: blockMenu, set: setBlockMenu }
        }}>
            {children}
        </EditorContext.Provider>
    );
}