"use client"; // Client-side rendering directive for Next.js

import { useArticleData } from "@/contexts/ArticleDataProvider";

interface BlockOptionProps {
    index: number;
}

export default function BlockOption({ index }: BlockOptionProps) {
    const { data, setData } = useArticleData();

    return (
        <div className="[group.outline]:block p-2 absolute top-0 left-0 bg-menu-form-bg -translate-y-full">
            <button>test</button>
        </div>
    );
}