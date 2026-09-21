"use client"; // Client-side rendering directive for Next.js

import { createContext, useContext, useState } from "react";
import type { SetState } from "@/utils/typeUtils";

interface SidebarContextTypes {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    modifyLogs: { logs: ModifyLogs, set: SetState<ModifyLogs> }
}

type ModifyLogs = ["add" | "move" | "delete", string][];

const SidebarContext = createContext<SidebarContextTypes | undefined>(undefined);

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within SidebarProvider");
    return context;
}

export default function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modifyLogs, setModifyLogs] = useState<ModifyLogs>([]);
    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const closeSidebar = () => setIsOpen(false);

    return (
        <SidebarContext.Provider value={{
            isOpen,
            toggleSidebar,
            closeSidebar,
            modifyLogs: { logs: modifyLogs, set: setModifyLogs }
        }}>
            {children}
        </SidebarContext.Provider>
    );
}