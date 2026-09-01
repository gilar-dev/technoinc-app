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
        return !data.category.includes(category) || createCategory.create;
    }

    useEffect(() => {
        if (!debounceQuery.trim()) { setMatches([]); setIsLoading(false); return; }
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const API_URL = process.env.NEXT_PUBLIC_TECHNOINC_BACKEND_API!;
                const response = await fetch(`${API_URL}/api/v1/wiki/category/search/${debounceQuery}`, { cache: "no-store" });
                if (!response.ok) throw new Error(`Error when fetching data: ${response}`);
                const result: FetchResult = await response.json();
                setMatches(result.data);
            } catch (error) {
                console.error("Error occures:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [debounceQuery]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {/* Category menu form */}
            <div className="w-full p-3 border border-border bg-menu-form-bg shadow-2xs shadow-black">
                {createCategory.create && (
                    <div className="mb-1 flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-[1.2em]">Create category:</span>
                            <span className="font-semibold text-[1.2em]">{cleanText(createCategory.createInput)}</span>
                        </div>
                        <div className="font-light text-[1em]">
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
                        className="w-full p-1 outline-none border border-foreground"
                        onChange={(e) => setInput(e.currentTarget.value)}
                    />
                    <button
                        title="Cancel"
                        className="py-1 px-3 cursor-pointer font-semibold border border-red-500 text-white bg-red-500/50 hover:bg-red-500/70 transition-colors duration-150 ease-in-out"
                        onClick={() => setCategoryForm({ ...categoryForm, isOpen: false })}
                    >Cancel</button>
                </div>
                {/* List of categories */}
                <div className="max-h-75 mt-1 overflow-auto border border-foreground">
                    {/* Modal menu when category is not exist */}
                    {debounceQuery.trim() && !isLoading && !createCategory.create && matches.length === 0 && (
                        <div className="p-3">
                            <h1 className="mb-1 font-medium text-center text-[1.3em] bg-foreground/10">Category not found</h1>
                            <p className="text-center text-[1em]">Category of "<strong>{input.trim()}</strong>" is not exist.</p>
                            <p className="text-center text-[1em]">Would you like to create this category?</p>
                            <button
                                className="w-[70%] mt-3 mx-auto p-2 font-semibold block border border-green-500 bg-green-500/10 hover:bg-green-500/30 transition-colors duration-150 ease-in-out"
                                onClick={() => { setInput(""); setCreateCategory({ create: true, createInput: capitalize(formattedText(input)) }) }}
                            >Create category</button>
                        </div>
                    )}
                    {/* List of matches categories */}
                    <ul className="flex flex-col">
                        {matches.map((category, index) => (
                            <li
                                key={`match-category-${index}`}
                                className="p-1 flex justify-between items-center has-[>button:hover]:bg-foreground/10 transition-colors duration-150 ease-in-out"
                            >
                                <div className="w-full flex flex-col">
                                    <span className="font-semibold text-[1.2em]">{cleanText(category.category)}</span>
                                    <em className="text-[1em]">{cleanText(category.hierarchy)}</em>
                                </div>
                                {checkConditions(category.category) && (
                                    <button
                                        className="h-10 aspect-square p-1 cursor-pointer flex justify-center items-center border border-foreground"
                                        onClick={async () => {
                                            if (createCategory.create) {
                                                const process = await dbCreateCategory(createCategory.createInput, category.category);
                                                if (process) setData({ ...data, category: [...data.category, createCategory.createInput] });
                                                setCategoryForm({ ...categoryForm, isOpen: false });
                                                return;
                                            }
                                            setData({ ...data, category: [...data.category, category.category] });
                                            setCategoryForm({ ...categoryForm, isOpen: false });
                                        }}
                                    ><i className="fa-solid fa-plus text-[1.2em]"></i></button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Directive information */}
                <div className="font-light">
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