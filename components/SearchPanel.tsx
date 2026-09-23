"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "@/utils/hookUtils";
import { dbSearchArticleTitles, type ArticleSearchResult } from "@/libs/database";

interface SearchPanelProps {
    onClose: () => void;
}

export default function SearchPanel({ onClose }: SearchPanelProps) {
    const [query, setQuery] = useState("");
    const [matches, setMatches] = useState<ArticleSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        const controller = new AbortController();
        const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase();

        if (!normalizedQuery) {
            setMatches([]);
            setIsLoading(false);
            return () => controller.abort();
        }

        const fetchMatches = async () => {
            setIsLoading(true);
            try {
                const results = await dbSearchArticleTitles(normalizedQuery, controller.signal);
                if (!controller.signal.aborted) setMatches(results.slice(0, 12));
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        };

        fetchMatches();
        return () => controller.abort();
    }, [debouncedQuery]);

    return (
        <div
            className="fixed inset-0 z-10 flex items-start justify-center bg-black/35 px-3 md:pl-[25%] lg:pt-24"
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            onWheel={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section className="w-full max-w-2xl border border-border bg-menu-form-bg text-foreground shadow-xl">
                <div className="flex items-center justify-between border-b border-border bg-navbar-bg px-4 py-3 text-white">
                    <div className="flex items-center gap-3">
                        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                        <h2 className="font-montserrat font-semibold">Search TechnoInc Wiki</h2>
                    </div>
                    <button type="button" title="Close search" onClick={onClose} className="p-1 hover:bg-white/20 active:bg-white/20">
                        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="p-4">
                    <label htmlFor="article-search" className="sr-only">Search article titles</label>
                    <div className="flex items-center gap-2 border border-sidebar-border bg-foreground/5 px-3 py-2 focus-within:border-sidebar-accent">
                        <i className="fa-solid fa-search text-sidebar-accent" aria-hidden="true"></i>
                        <input
                            id="article-search"
                            type="search"
                            autoFocus
                            value={query}
                            placeholder="Search article titles..."
                            onChange={(event) => setQuery(event.currentTarget.value)}
                            className="w-full bg-transparent outline-none placeholder:text-foreground/45"
                        />
                    </div>

                    <div className="mt-4">
                        {isLoading ? (
                            <p className="px-2 py-4 text-sm text-foreground/65">Loading articles...</p>
                        ) : !debouncedQuery.trim() ? (
                            <p className="px-2 py-4 text-sm text-foreground/65">Enter an article title to search the wiki.</p>
                        ) : matches.length > 0 ? (
                            <ul className="max-h-120 divide-y divide-border/60 overflow-y-auto border-y border-border">
                                {matches.map((article) => (
                                    <li key={article.title}>
                                        <Link
                                            href={`/wiki/${encodeURIComponent(article.title)}`}
                                            onClick={onClose}
                                            className="flex items-start gap-3 px-3 py-3 hover:bg-list-bg active:bg-list-bg"
                                        >
                                            <div className="h-16 w-16 shrink-0 overflow-hidden border border-border bg-list-bg">
                                                {article.cover ? (
                                                    <img
                                                        src={article.cover}
                                                        alt=""
                                                        className="w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sidebar-accent">
                                                        <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="font-semibold">{article.title.replaceAll("_", " ")}</h3>
                                                </div>
                                                <p className="mt-1 line-clamp-2 text-sm leading-5 text-foreground/65">{article.desc || "No description available."}</p>
                                            </div>
                                            <i className="fa-solid fa-angle-right mt-1 self-center shrink-0 text-sm text-sidebar-accent" aria-hidden="true"></i>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="border-y border-border px-2 py-4 text-sm text-foreground/65">
                                No article matches “{debouncedQuery.trim()}”.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}