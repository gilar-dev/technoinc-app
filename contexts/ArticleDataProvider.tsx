"use client"; // Client-side rendering directive for Next.js

import { createContext, useContext, useState } from "react";
import { Schema, SetState, History } from "@/utils/typeUtils";

export interface ArticleData {
    title: string;
    id: number;
    desc: string;
    cover: string;
    p_id: string;
    ver: number;
    cls: "Start" | "GA" | "FA";
    cat: string[];
    view: number;
    his: History[];
    content: Schema;
    // Temporary properties
    raw_file?: File | undefined;
}

interface CategoryForm {
    isOpen: boolean;
    createNew: boolean;
}

interface DataTypes {
    data: ArticleData;
    setData: SetState<ArticleData>;
    toDelete: string[];
    setToDelete: SetState<string[]>;
    categoryForm: CategoryForm;
    setCategoryForm: SetState<CategoryForm>;
}

const ArticleDataContext = createContext<DataTypes | undefined>(undefined);

export function useArticleData() {
    const context = useContext(ArticleDataContext);
    if (!context) throw new Error("Can only be used inside ArticleDataProvider");
    return context;
}

export default function ArticleDataProvider({ children }: { children: React.ReactNode }) {
    const [articleData, setArticleData] = useState<ArticleData>({
        title: "",
        id: 0,
        desc: "",
        cover: "",
        p_id: "",
        ver: 0,
        cls: "Start",
        cat: [],
        view: 0,
        his: [],
        content: []
    });
    const [toDelete, setToDelete] = useState<string[]>([]);
    const [categoryForm, setCategoryForm] = useState<CategoryForm>({
        isOpen: false,
        createNew: false
    })

    return (
        <ArticleDataContext.Provider value={{
            data: articleData,
            setData: setArticleData,
            toDelete: toDelete,
            setToDelete: setToDelete,
            categoryForm: categoryForm,
            setCategoryForm: setCategoryForm
        }}>
            {children}
        </ArticleDataContext.Provider>
    );
}