"use client"; // Client-side rendering directive for Next.js

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useArticleData } from "@/contexts/ArticleDataProvider";
import { useEditor } from "@/contexts/EditorProvider";
import { useProcess } from "@/contexts/ProcessProvider";
import { reformatURI } from "@/utils/textUtils";
import uploadArticleWiki from "@/libs/upload-article";
import updateArticleWiki from "@/libs/update-article";

export default function Validation() {
    const { data, toDelete } = useArticleData();
    const { editMode, currentData } = useEditor();
    const { isLoading, isValidating } = useProcess();
    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const router = useRouter();

    const submitContribution = async (): Promise<void> => {
        const contributorName = name.trim();
        const changeSummary = summary.trim();
        if (!contributorName || isLoading.state) return;

        localStorage.setItem("technoinc-contributor-name", contributorName);
        isLoading.set(true);

        if (!editMode) {
            const uploadProcess = await uploadArticleWiki(data);
            if (uploadProcess.success) {
                toast.success(uploadProcess.message, { className: "text-foreground! bg-menu-form-bg!" });
                router.replace(`/wiki/${reformatURI(data.title)}`);
            } else toast.error(uploadProcess.message, { className: "text-foreground! bg-menu-form-bg!" });
        } else {
            const updateProcess = await updateArticleWiki(data, currentData, toDelete);
            if (updateProcess.success) {
                toast.success(updateProcess.message, { className: "text-foreground! bg-menu-form-bg!" });
                router.replace(`/wiki/${reformatURI(data.title)}`);
            } else toast.error(updateProcess.message, { className: "text-foreground! bg-menu-form-bg!" });
        }
        isValidating.set(false);
        isLoading.set(false);
    };

    useEffect(() => {
        const storedName = localStorage.getItem("technoinc-contributor-name");
        if (storedName) setName(storedName);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isValidating.state ? "hidden" : "visible";
    }, [isValidating]);

    if (!isValidating.state) return null;
    return (
        <div
            className="overlay w-full h-full flex justify-center items-center fixed top-0 left-0 z-3 bg-form-bg/30 md:pl-[25%]"
            onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains("overlay")) isValidating.set(false);
            }}
        >
            <section id="contributor-action" className="mx-3 mb-6 max-w-5xl rounded-lg border border-sidebar-border bg-menu-form-bg p-5 shadow-sm shadow-black/10 lg:mx-14 lg:p-7 xl:mx-21">
                <div className="mb-5 border-b border-sidebar-border pb-3">
                    <p className="text-[0.72em] font-semibold uppercase tracking-[0.18em] text-sidebar-accent">Contributor validation</p>
                    <h2 className="mt-1 text-xl font-bold">Review your contribution</h2>
                    <p className="mt-1 text-sm text-foreground/65">Add your contributor name and a short summary before submitting this edit.</p>
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold">Name or alias</span>
                        <input
                            id="contributor-name-input"
                            type="text"
                            placeholder="How should we credit you?"
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            className="rounded-sm border border-sidebar-border bg-foreground/5 p-2 outline-none transition-colors focus:border-sidebar-accent"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="font-semibold">Edit summary</span>
                        <textarea
                            id="summary-input"
                            placeholder="What did you change? (optional)"
                            value={summary}
                            rows={3}
                            onChange={(e) => setSummary(e.currentTarget.value)}
                            className="resize-none rounded-sm border border-sidebar-border bg-foreground/5 p-2 outline-none transition-colors focus:border-sidebar-accent"
                        />
                    </label>
                </div>
                <div className="mt-5 flex justify-end border-t border-sidebar-border pt-4">
                    <button
                        type="button"
                        disabled={!name.trim() || isLoading.state}
                        onClick={submitContribution}
                        className="flex items-center gap-2 rounded-sm border border-link bg-link px-4 py-2 font-semibold text-white transition-opacity hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                        {isLoading.state ? "Submitting..." : "Validate and submit"}
                    </button>
                </div>
            </section>
        </div>
    );
}