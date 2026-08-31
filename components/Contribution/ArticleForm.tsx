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
        if (!formData) return;
        setData(formData);
        setUseProvider(true);
    }, [formData]);

    return (
        <div className="m-3 p-5 font-basic rounded-[10px] border-t-14 border-[#00afff] bg-form-bg shadow-2xs shadow-black lg:mx-7">
            {/* Article title input section */}
            <div className="mb-5 flex flex-col">
                <h1 className="py-1 text-[1.2em] border-b border-border">Title</h1>
                <textarea
                    placeholder="Article title"
                    value={formData && !useProvider ? formData.title : data.title}
                    className="peer min-h-2 mt-1 p-1 text-[1.3em] field-sizing-content resize-none outline-none bg-black/10"
                    onChange={(e) => {
                        const value = e.currentTarget.value;
                        const invalidChars = "!@#$%^&*=+[]{}|\\/?<>~";
                        if (invalidChars.includes(value[value.length - 1])) return;
                        setData({ ...data, title: value })
                    }}
                />
                <div className="self-center w-0 h-0.75 peer-focus:w-full bg-[#00afff] transition-[width] duration-150 ease-in-out"></div>
            </div>
            {/* Brief article description input section */}
            <div className="mb-5 flex flex-col">
                <h1 className="py-1 text-[1.2em] border-b border-border">Description</h1>
                <textarea
                    placeholder="Description (optional)"
                    value={formData && !useProvider ? formData.description : data.description}
                    className="peer min-h-2 mt-1 p-1 text-[1em] field-sizing-content resize-none outline-none bg-black/10"
                    onChange={(e) => setData({ ...data, description: e.currentTarget.value })}

                />
                <div className="self-center w-0 h-0.75 peer-focus:w-full bg-[#00afff] transition-[width] duration-150 ease-in-out"></div>
            </div>
            {/* Article category input section */}
            <div className="mb-5 flex flex-col">
                <div className="py-1 flex justify-between items-center border-b border-border">
                    <h1 className="text-[1.2em]">Category</h1>
                    <button
                        title="Add category"
                        onClick={() => setCategoryForm({ ...categoryForm, isOpen: true })}
                        className={`p-1 cursor-pointer items-center gap-2 border border-border bg-form-bg/10 hover:bg-foreground/10 transition-colors duration-150 ease-in-out ${categoryForm.isOpen ? "hidden" : "flex"}`}
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
                            className="p-1 border border-border has-[>button:hover]:border-red-500 has-[>button:hover]:text-white has-[>button:hover]:bg-red-500/50 transition-colors duration-150 ease-in-out"
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
                    <h1 className="text-[1.2em]">Cover</h1>
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
                            setData({ ...data, cover: previewImage, raw_file: selectedFile });
                        }}
                    />
                    <label
                        htmlFor="article-cover-input"
                        title="Add category"
                        className="p-1 cursor-pointer flex items-center gap-2 border border-border bg-form-bg/10 hover:bg-foreground/10 transition-colors duration-150 ease-in-out"
                    >Choose cover</label>
                </div>
                <div className="p-1 flex justify-center items-center">
                    <div className="w-[70%] p-1 flex justify-center items-center border border-border lg:w-[50%]">
                        <img
                            src={formData && !useProvider ? formData.cover : data.cover || undefined}
                            className="min-w-full cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {/* Article version input (readonly) */}
            <div className="mb-5 flex flex-col">
                <h1 className="py-1 text-[1.2em] border-b border-border">Version</h1>
                <input
                    id="article-version-input"
                    type="text"
                    value={`${formData && !useProvider ? formData.version : data.version} (readonly)`}
                    readOnly
                    className="mt-1 p-1 outline-none bg-black/10"
                />
            </div>
        </div>
    );
}