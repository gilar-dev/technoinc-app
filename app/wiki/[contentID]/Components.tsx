"use client"; // Client-side rendering directive for Next.js

import Link from "next/link";

interface ArticleTitleProps {
    title: string;
    description: string;
}

export function HeadingHolder({ title, description }: ArticleTitleProps) {
    return (
        <div className="w-full mt-5 font-basic text-center flex flex-col items-center gap-5 lg:px-7">
            <div>
                <h1 className="font-bold text-2xl">
                    <span className="highlight">{title}</span>
                </h1>
                <span className="text-[0.9em]">{description}</span>
            </div>
            <div className="w-full p-3">
                <nav className="w-full border-t border-b border-border">
                    <ul className="w-full px-1 flex justify-center items-center gap-1">
                        <li className="block mr-auto">
                            <span className="font-semibold">Page</span>
                        </li>
                        <li className="p-1 hover:bg-list-bg">
                            <span className="text-[1.5em]"><i className="fa-solid fa-pen-to-square"></i></span>
                        </li>
                        <li className="p-1 hover:bg-list-bg">
                            <span className="text-[1.5em]"><i className="fa-solid fa-ellipsis-vertical"></i></span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export function RedirectNotice({ redirectedURL }: { redirectedURL: string }) {
    return (
        <div className="min-w-[65%] max-w-[90%] p-3 fixed left-[50%] bottom-0 rounded-[3px] text-white bg-gray-800 translate-x-[-50%] translate-y-full animate-[showUp_7s_ease-in-out_forwards]">
            <p className="text-[0.9em] text-center">Redirected from '<span className="font-semibold underline">{redirectedURL.replaceAll("_", " ")}</span>'</p>
        </div>
    );
}

export function MissingArticle({ title }: { title: string }) {
    return (
        <section className="m-3 border-y border-border bg-form-bg shadow-2xs shadow-black">
            <div className="border-b border-border bg-list-bg px-4 py-2 text-[0.85em] lg:px-6">
                <span className="font-semibold">Page notice:</span> this title is waiting for its first article.
            </div>
            <div className="p-6 lg:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                    <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3 text-link">
                            <i className="fa-regular fa-file-lines text-[1.8em]"></i>
                            <span className="text-[0.8em] font-semibold uppercase tracking-wide">Unwritten page</span>
                        </div>
                        <h2 className="mb-3 text-2xl font-bold">This article does not exist yet</h2>
                        <p className="max-w-2xl leading-7">
                            The wiki has no article for <span className="font-semibold">{title}</span>.
                            You can start a draft, check nearby pages, or return to the wiki index.
                        </p>
                    </div>
                    <div className="w-full border-l-4 border-link bg-background p-4 text-left lg:w-76">
                        <h3 className="mb-2 font-semibold">What happens next?</h3>
                        <ul className="list-disc space-y-1 pl-5 text-[0.9em]">
                            <li>A contributor can create the first version.</li>
                            <li>The page title will remain available at this address.</li>
                            <li>New content can be expanded over time.</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-5">
                    <Link
                        href="/contribution"
                        className="border border-link bg-link px-4 py-2 font-semibold text-white hover:brightness-110"
                    >
                        Create article
                    </Link>
                    <Link
                        href="/wiki"
                        className="border border-border px-4 py-2 font-semibold hover:bg-list-bg"
                    >
                        Browse wiki
                    </Link>
                    <Link
                        href="/"
                        className="border border-border px-4 py-2 font-semibold hover:bg-list-bg"
                    >
                        Go home
                    </Link>
                    <span className="ml-auto text-[0.8em] text-foreground/70">Page status: not created</span>
                </div>
            </div>
        </section>
    );
}