"use client"; // Client-side rendering directive for Next.js

import { useState, useEffect } from "react";
import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";
import CategoryForm from "./CategoryForm";
import { cleanText } from "@/utils/textUtils";

interface ArticleFormProps {
    formData?: ArticleData | undefined;
}

export default function ArticleForm({ formData = undefined }: ArticleFormProps) {
    const { data, setData, categoryForm, setCategoryForm, toDelete, setToDelete } = useArticleData();
    const { editMode } = useEditor();
    const [useProvider, setUseProvider] = useState<boolean>(false);
    const category = formData && !useProvider ? formData.cat : data.cat;

    const handleImageInput = (files: FileList | null): void => {
        if (!files) return;
        const selectedFile = files[0];
        const previewImage = URL.createObjectURL(selectedFile);
        const modifiedData = structuredClone(data);

        if (editMode) {
            modifiedData.prev_src = modifiedData.cover;
            if (!toDelete.includes(modifiedData.p_id)) setToDelete([...toDelete, modifiedData.p_id]);
        }

        if (modifiedData.cover.startsWith("blob:")) URL.revokeObjectURL(modifiedData.cover);
        modifiedData.cover = previewImage;
        modifiedData.raw_file = selectedFile;
        setData(modifiedData);
    }

    const restoreImage = (): void => {
        const modifiedData = structuredClone(data);
        const prevSource = modifiedData.prev_src;
        if (!prevSource) return;

        if (modifiedData.cover.startsWith("blob:")) URL.revokeObjectURL(modifiedData.cover);
        modifiedData.cover = prevSource;
        delete modifiedData.prev_src;
        delete modifiedData.raw_file;

        const updatePending = toDelete.filter((imageID) => imageID !== modifiedData.p_id);
        setToDelete(updatePending);
        setData(modifiedData);
    }

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
                        const invalidChars: string = "!@#$%^&*=+[]{}|\\/?<>~_";
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
                    value={formData && !useProvider ? formData.desc : data.desc}
                    className="peer mt-2 min-h-2 field-sizing-content resize-none rounded-sm border border-transparent bg-foreground/5 p-2 text-[1em] outline-none transition-colors placeholder:text-foreground/45 focus:border-sidebar-accent"
                    onChange={(e) => setData({ ...data, desc: e.currentTarget.value })}

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
                        className={`flex cursor-pointer items-center gap-2 rounded-sm border border-sidebar-border bg-sidebar-panel px-2 py-1 text-sm hover:bg-sidebar-hover transition-colors duration-150 ease-in-out ${categoryForm.isOpen ? "hidden" : "flex"}`}
                    >
                        <span>Add category</span>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="py-1 flex flex-wrap gap-1">
                    {categoryForm.isOpen && (<CategoryForm />)
                        || !categoryForm.isOpen && category.length === 0 && (<em className="p-1.25">No category added</em>)
                        || !categoryForm.isOpen && category.map((category, index) => (
                            <span
                                key={`category-${index}`}
                                className="rounded-sm border border-sidebar-border bg-sidebar-panel p-1.5 has-[>button:hover]:border-red-500 has-[>button:hover]:text-white has-[>button:hover]:bg-red-500/50 transition-colors duration-150 ease-in-out"
                            >
                                <span>{cleanText(category)}</span>
                                <button
                                    title="Delete category"
                                    className="cursor-pointer"
                                    onClick={() => setData({ ...data, cat: data.cat.toSpliced(index, 1) })}
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
                        onChange={(e) => handleImageInput(e.target.files)}
                    />
                    <label
                        htmlFor="article-cover-input"
                        title="Choose article cover"
                        className="flex cursor-pointer items-center gap-2 rounded-sm border border-sidebar-border bg-sidebar-panel px-2 py-1 text-sm hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                    >Choose cover</label>
                </div>
                <div className="p-1 flex flex-col items-center justify-center gap-3">
                    <div className="w-[70%] p-1 flex justify-center items-center border border-border lg:w-[50%]">
                        <img
                            src={formData && !useProvider ? formData.cover : data.cover || undefined}
                            draggable={false}
                            className="min-w-full cursor-pointer object-cover"
                        />
                    </div>
                    {data.prev_src !== undefined && (
                        <button
                            title="Restore image"
                            className="p-1 cursor-pointer flex items-center gap-1 rounded-sm border-2 border-sidebar-border bg-sidebar-panel"
                            onClick={() => restoreImage()}
                        ><i className="fa-solid fa-rotate-left"></i><span>Restore</span></button>
                    )}
                </div>
            </div>
            {/* Article version input (readonly) */}
            <div className="mb-5 flex flex-col">
                <h1 className="py-2 text-[1.05em] font-semibold border-b border-sidebar-border">Version</h1>
                <input
                    id="article-version-input"
                    type="text"
                    value={`${formData && !useProvider ? formData.ver : data.ver} (readonly)`}
                    readOnly
                    className="mt-2 rounded-sm border border-sidebar-border bg-foreground/5 p-2 outline-none"
                />
            </div>
        </div>
    );
}