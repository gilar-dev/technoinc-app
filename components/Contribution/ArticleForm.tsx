"use client"; // Client-side rendering directive for Next.js

import { useState, useEffect } from "react";
import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import CategoryForm from "./CategoryForm";
import { cleanText } from "@/utils/textUtils";

interface ArticleFormProps {
    formData?: ArticleData | undefined;
}

export default function ArticleForm({ formData = undefined }: ArticleFormProps) {
    const { data, setData, categoryForm, setCategoryForm } = useArticleData();
    const [useProvider, setUseProvider] = useState<boolean>(false);
    const category = formData && !useProvider ? formData.category : data.category;

    useEffect(() => {
        return () => {
            if (data.cover.startsWith("blob:")) URL.revokeObjectURL(data.cover);
        };
    }, [data.cover]);

    useEffect(() => {
        if (!formData) return;
        setData(formData);
        setUseProvider(true);
    }, [formData]);

    return (
        <div className="m-3 rounded-lg border border-sidebar-border border-t-4 bg-form-bg p-5 font-basic shadow-sm shadow-black/10 lg:mx-14 lg:p-7 xl:mx-21">
            {/* Article title input section */}
            <div className="mb-5 flex flex-col">
                <h1 className="py-2 text-[1.05em] font-semibold border-b border-sidebar-border">Title</h1>
                <textarea
                    name="article-title-input"
                    placeholder="Article title"
                    value={formData && !useProvider ? formData.title : data.title}
                    className="peer mt-2 min-h-2 field-sizing-content resize-none rounded-sm border border-transparent bg-foreground/5 p-2 text-[1.3em] outline-none transition-colors placeholder:text-foreground/45 focus:border-sidebar-accent"
                    onChange={(e) => {
                        const value = e.currentTarget.value;
                        const invalidChars = "!@#$%^&*=+[]{}|\\/?<>~";
                        if (invalidChars.includes(value[value.length - 1])) return;
                        setData({ ...data, title: value })
                    }}
                />
                <div className="self-center h-0.75 w-0 bg-sidebar-accent transition-[width] duration-150 ease-in-out peer-focus:w-full"></div>
            </div>
            {/* Brief article description input section */}
            <div className="mb-5 flex flex-col">
                <h1 className="py-2 text-[1.05em] font-semibold border-b border-sidebar-border">Description</h1>
                <textarea
                    name="article-brief-input"
                    placeholder="Description (optional)"
                    value={formData && !useProvider ? formData.description : data.description}
                    className="peer mt-2 min-h-2 field-sizing-content resize-none rounded-[4px] border border-transparent bg-foreground/5 p-2 text-[1em] outline-none transition-colors placeholder:text-foreground/45 focus:border-sidebar-accent"
                    onChange={(e) => setData({ ...data, description: e.currentTarget.value })}

                />
                <div className="self-center h-0.75 w-0 bg-sidebar-accent transition-[width] duration-150 ease-in-out peer-focus:w-full"></div>
            </div>
            {/* Article category input section */}
            <div className="mb-5 flex flex-col">
                <div className="py-1 flex justify-between items-center border-b border-border">
                    <h1 className="text-[1.05em] font-semibold">Category</h1>
                    <button
                        title="Add category"
                        onClick={() => setCategoryForm({ ...categoryForm, isOpen: true })}
                        className={`flex cursor-pointer items-center gap-2 rounded-[4px] border border-sidebar-border bg-sidebar-panel px-2 py-1 text-sm hover:bg-sidebar-hover transition-colors duration-150 ease-in-out ${categoryForm.isOpen ? "hidden" : "flex"}`}
                    >
                        <span>Add category</span>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="py-1 flex flex-wrap gap-1">
                    {categoryForm.isOpen && (<CategoryForm />)}
                    {!categoryForm.isOpen && category.length === 0 && (<em className="p-1.25">No category added</em>)}
                    {!categoryForm.isOpen && category.map((category, index) => (
                        <span
                            key={`category-${index}`}
                            className="rounded-[4px] border border-sidebar-border bg-sidebar-panel p-1.5 has-[>button:hover]:border-red-500 has-[>button:hover]:text-white has-[>button:hover]:bg-red-500/50 transition-colors duration-150 ease-in-out"
                        >
                            <span>{cleanText(category)}</span>
                            <button
                                title="Delete category"
                                className="cursor-pointer"
                                onClick={() => setData({ ...data, category: data.category.toSpliced(index, 1) })}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            {/* Article cover input */}
            <div className="mb-5 flex flex-col">
                <div className="py-1 flex justify-between items-center border-b border-border">
                    <h1 className="text-[1.05em] font-semibold">Cover</h1>
                    <input
                        id="article-cover-input"
                        type="file"
                        accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp"
                        className="hidden"
                        onChange={(e) => {
                            const files = e.currentTarget.files
                            if (!files) return;
                            const selectedFile = files[0];
                            const previewImage = URL.createObjectURL(selectedFile);
                            if (data.cover.startsWith("blob:")) URL.revokeObjectURL(data.cover);
                            setData({ ...data, cover: previewImage, raw_file: selectedFile });
                        }}
                    />
                    <label
                        htmlFor="article-cover-input"
                        title="Add category"
                        className="flex cursor-pointer items-center gap-2 rounded-[4px] border border-sidebar-border bg-sidebar-panel px-2 py-1 text-sm hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                    >Choose cover</label>
                </div>
                <div className="p-1 flex justify-center items-center">
                    <div className="w-[70%] p-1 flex justify-center items-center border border-border lg:w-[50%]">
                        <img
                            src={formData && !useProvider ? formData.cover : data.cover || undefined}
                            className="min-w-full cursor-pointer object-cover"
                        />
                    </div>
                </div>
            </div>
            {/* Article version input (readonly) */}
            <div className="mb-5 flex flex-col">
                <h1 className="py-2 text-[1.05em] font-semibold border-b border-sidebar-border">Version</h1>
                <input
                    id="article-version-input"
                    type="text"
                    value={`${formData && !useProvider ? formData.version : data.version} (readonly)`}
                    readOnly
                    className="mt-2 rounded-[4px] border border-sidebar-border bg-foreground/5 p-2 outline-none"
                />
            </div>
        </div>
    );
}