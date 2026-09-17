"use client"; // Client-side rendering directive for Next.js

import { useProcess } from "@/contexts/ProcessProvider";

export default function Overlay() {
    const { isLoading } = useProcess();

    if (!isLoading.state) return null;
    return (
        <div className="w-full h-full fixed top-0 left-0 z-20 bg-red-300/60"></div>
    );
}