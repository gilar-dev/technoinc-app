"use client" // Client-side rendering directive for Next.js

import Link from "next/link";
import { useState, useEffect } from "react";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useDebounce } from "@/utils/hookUtils";
import { dbCreateCategory } from "@/utils/databaseutils";
import { capitalize, formattedText, cleanText } from "@/utils/textUtils";

interface CreateCategoryProps {
    create: boolean;
    createInput: string;
}

interface Category {
    category: string;
    hierarchy: string;
}

interface FetchResult {
    status: string;
    data: Category[];
}

export default function CategoryForm() {
    const { data, setData, categoryForm, setCategoryForm } = useArticleData();
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [matches, setMatches] = useState<Category[]>([]);
    const [createCategory, setCreateCategory] = useState<CreateCategoryProps>({ create: false, createInput: "" });
    const debounceQuery = useDebounce(input);

    const checkConditions = (category: string): boolean => {
        return !data.cat.includes(category) || createCategory.create;
    }

    useEffect(() => {
        const controller = new AbortController();

        if (!debounceQuery.trim()) {
            setMatches([]);
            setIsLoading(false);
            return () => controller.abort();
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const API_URL = process.env.NEXT_PUBLIC_TECHNOINC_BACKEND_API!;
                const response = await fetch(`${API_URL}/api/v1/wiki/category/search/${formattedText(debounceQuery)}`, {
                    cache: "no-store",
                    signal: controller.signal
                });
                if (!response.ok) throw new Error(`Error when fetching data: ${response}`);
                const result: FetchResult = await response.json();
                setMatches(result.data);
            } catch (error) {
                if (!controller.signal.aborted) console.error("Error when fetching categories:", error);
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        };
        fetchData();

        return () => controller.abort();
    }, [debounceQuery]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {/* Category menu form */}
            <div className="w-full rounded-md border border-sidebar-border bg-menu-form-bg p-4 shadow-lg shadow-black/15">
                {createCategory.create && (
                    <div className="mb-3 flex flex-col rounded-sm border-l-4 border-sidebar-accent bg-sidebar-panel p-3">
                        <div className="flex items-center gap-2">
                            <span className="text-[0.8em] font-semibold uppercase tracking-wide text-sidebar-accent">Create category</span>
                            <span className="font-semibold">{cleanText(createCategory.createInput)}</span>
                        </div>
                        <div className="text-sm text-foreground/65">
                            <p>New category must have parent category</p>
                        </div>
                    </div>
                )}
                {/* Category search input */}
                <div className="w-full flex items-center">
                    <input
                        id="search-category-input"
                        type="text"
                        placeholder={!createCategory.create ? "Search category" : "Search parent category"}
                        value={input}
                        autoFocus
                        className="w-full rounded-l-sm border border-sidebar-border bg-foreground/5 p-2 outline-none focus:border-sidebar-accent"
                        onChange={(e) => setInput(e.currentTarget.value)}
                    />
                    <button
                        title="Cancel"
                        className="cursor-pointer rounded-r-sm border border-red-500 bg-red-500/80 px-3 py-2 font-semibold text-white hover:bg-red-600 transition-colors duration-150 ease-in-out"
                        onClick={() => setCategoryForm({ ...categoryForm, isOpen: false })}
                    >Cancel</button>
                </div>
                {/* List of categories */}
                <div className="mt-2 max-h-75 overflow-auto rounded-sm border border-sidebar-border">
                    {/* Modal menu when category is not exist */}
                    {debounceQuery.trim() && !isLoading && !createCategory.create && matches.length === 0 && (
                        <div className="p-4">
                            <h1 className="mb-2 text-center text-[1.1em] font-semibold">Category not found</h1>
                            <p className="text-center text-sm">Category of "<strong>{input.trim()}</strong>" does not exist.</p>
                            <p className="text-center text-[1em]">Would you like to create this category?</p>
                            <button
                                className="mx-auto mt-3 block w-[70%] rounded-sm border border-sidebar-accent bg-sidebar-panel p-2 font-semibold hover:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                                onClick={() => { setInput(""); setCreateCategory({ create: true, createInput: capitalize(formattedText(input)) }) }}
                            >Create category</button>
                        </div>
                    )}
                    {/* List of matches categories */}
                    <ul className="flex flex-col">
                        {matches.length > 0 && matches.map((category, index) => (
                            <li
                                key={`match-category-${index}`}
                                className="flex items-center justify-between border-b border-sidebar-border/60 p-2 last:border-b-0 has-[>button:hover]:bg-sidebar-hover transition-colors duration-150 ease-in-out"
                            >
                                <div className="w-full flex flex-col">
                                    <span className="font-semibold">{cleanText(category.category)}</span>
                                    <em className="text-sm text-foreground/60">{cleanText(category.hierarchy)}</em>
                                </div>
                                {checkConditions(category.category) && (
                                    <button
                                        className="flex h-9 aspect-square cursor-pointer items-center justify-center rounded-sm border border-sidebar-accent text-sidebar-accent hover:bg-sidebar-hover"
                                        onClick={async () => {
                                            if (createCategory.create) {
                                                const process = await dbCreateCategory(createCategory.createInput, category.category);
                                                if (process) setData({ ...data, cat: [...data.cat, createCategory.createInput] });
                                                setCategoryForm({ ...categoryForm, isOpen: false });
                                                return;
                                            }
                                            setData({ ...data, cat: [...data.cat, category.category] });
                                            setCategoryForm({ ...categoryForm, isOpen: false });
                                        }}
                                    ><i className="fa-solid fa-plus text-[1.2em]"></i></button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Directive information */}
                <div className="mt-3 text-sm text-foreground/65">
                    <span>See more about category on </span>
                    <Link
                        href="/category"
                        className="text-link hover:underline"
                    >category page</Link>
                </div>
            </div>
        </div>
    );
}