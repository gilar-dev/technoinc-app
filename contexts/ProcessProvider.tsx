"use client"; // Client-side rendering directive for Next.js

import { createContext, useContext, useState } from "react";
import type { SetState } from "@/utils/typeUtils";

interface ProcessContextProps {
    isLoading: { state: boolean; set: SetState<boolean>; }
    isValidating: { state: boolean; set: SetState<boolean>; }
}

type ModifyLogs = ["create" | "move" | "delete", string][];

const ProcessContext = createContext<ProcessContextProps | undefined>(undefined);

export function useProcess() {
    const context = useContext(ProcessContext);
    if (!context) throw new Error("useProcess must be used within ProcessProvider");
    return context;
}

export default function ProcessProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValidating, setIsValidating] = useState<boolean>(false);

    return (
        <ProcessContext.Provider value={{
            isLoading: { state: isLoading, set: setIsLoading },
            isValidating: { state: isValidating, set: setIsValidating }
        }}>
            {children}
        </ProcessContext.Provider>
    );
}