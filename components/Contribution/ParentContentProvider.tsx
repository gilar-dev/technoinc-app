"use client" // Client-side rendering directive for Next.js

import { useState, useRef, createContext, useContext } from "react";
import { SetState } from "@/utils/typeUtils";

interface ContentData {
    isScroll: boolean;
    setIsScroll: SetState<boolean>;
}

const ParentContent = createContext<ContentData | undefined>(undefined);

export function useParentContent() {
    const context = useContext(ParentContent);
    if (!context) throw new Error("useParentContent must be used within ParentContentProvider");
    return context;
}

export default function ParentContentProvider({ children }: { children: React.ReactNode }) {
    const [isScroll, setIsScroll] = useState<boolean>(true);
    const contentRef = useRef<HTMLDivElement | null>(null);

    return (
        <ParentContent.Provider value={{
            isScroll: isScroll,
            setIsScroll: setIsScroll
        }}>
            <div
                ref={contentRef}
                className="overflow-auto md:w-[75%]"
            >
                {children}
            </div>
        </ParentContent.Provider>
    );
}