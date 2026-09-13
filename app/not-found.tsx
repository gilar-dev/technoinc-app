"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";

interface RouteSuggestion {
    label: string;
    href: string;
    keywords: string[];
}

const routeSuggestions: RouteSuggestion[] = [
    { label: "Wiki", href: "/wiki", keywords: ["wiki", "article", "page", "encyclopedia"] },
    { label: "Categories", href: "/category", keywords: ["category", "categories", "topics"] },
    { label: "Contribution", href: "/contribution", keywords: ["contribution", "create", "edit", "article"] },
    { label: "Home", href: "/", keywords: ["home", "index", "main"] },
];

function getClosestRoute(pathname: string): RouteSuggestion {
    const pathWords = decodeURIComponent(pathname)
        .toLowerCase()
        .split(/[\/_-]+/)
        .filter(Boolean);

    return routeSuggestions.reduce((closest, route) => {
        const closestScore = closest.keywords.reduce(
            (score, keyword) => score + pathWords.filter((word) => word.includes(keyword) || keyword.includes(word)).length,
            0
        );
        const routeScore = route.keywords.reduce(
            (score, keyword) => score + pathWords.filter((word) => word.includes(keyword) || keyword.includes(word)).length,
            0
        );

        return routeScore > closestScore ? route : closest;
    }, routeSuggestions[0]);
}

export default function NotFound() {
    const pathname = usePathname();
    const requestedPath = decodeURIComponent(pathname || "/");
    const closestRoute = getClosestRoute(requestedPath);
    const readablePath = requestedPath.replaceAll("_", " ");

    return (
        <div className="md:relative md:w-[75%] md:left-[25%]">
            <Menubar title="Page not found" />
            <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>

            <main className="min-h-[calc(100vh-4rem)] px-3 py-8 font-basic lg:px-7 lg:py-12">
                <section className="mx-auto max-w-5xl border-y border-border bg-form-bg shadow-2xs shadow-black">
                    <div className="border-b border-border bg-list-bg px-4 py-2 text-[0.85em] lg:px-6">
                        <span className="font-semibold">Page notice:</span> the requested page is not available.
                    </div>

                    <div className="p-6 lg:p-10">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                            <div className="min-w-0 flex-1">
                                <div className="mb-3 flex items-center gap-3 text-link">
                                    <i className="fa-solid fa-file-circle-question text-[1.8em]"></i>
                                    <span className="text-[0.8em] font-semibold uppercase tracking-wide">Missing page</span>
                                </div>
                                <h1 className="mb-4 text-3xl font-bold">This page does not exist</h1>
                                <p className="max-w-2xl leading-7">
                                    The address you entered does not lead to a page in TechnoInc MC Wiki.
                                    Check the path below or continue to the closest section suggested on the right.
                                </p>

                                <div className="mt-6 border-l-4 border-link bg-background px-4 py-3">
                                    <span className="block text-[0.75em] font-semibold uppercase tracking-wide text-foreground/70">
                                        Requested URL path
                                    </span>
                                    <code className="mt-1 block break-all font-mono text-sm">{readablePath}</code>
                                </div>
                            </div>

                            <aside className="w-full border border-sidebar-border bg-sidebar-panel p-5 lg:max-w-xs">
                                <div className="mb-3 flex items-center gap-2 text-sidebar-accent">
                                    <i className="fa-solid fa-compass"></i>
                                    <h2 className="font-semibold">Closest page</h2>
                                </div>
                                <p className="mb-4 text-sm leading-6">
                                    This section is the nearest match for the words in your address:
                                </p>
                                <Link
                                    href={closestRoute.href}
                                    className="inline-flex items-center gap-2 border border-link bg-link px-4 py-2 font-semibold text-white hover:brightness-110"
                                >
                                    <span>{closestRoute.label}</span>
                                    <i className="fa-solid fa-arrow-right text-sm"></i>
                                </Link>
                            </aside>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-5">
                            <Link
                                href="/wiki"
                                className="border border-border px-4 py-2 font-semibold hover:bg-list-bg"
                            >
                                Browse wiki
                            </Link>
                            <Link
                                href="/contribution"
                                className="border border-border px-4 py-2 font-semibold hover:bg-list-bg"
                            >
                                Create an article
                            </Link>
                            <Link
                                href="/"
                                className="border border-border px-4 py-2 font-semibold hover:bg-list-bg"
                            >
                                Go home
                            </Link>
                            <span className="ml-auto text-[0.8em] text-foreground/70">Status: 404 not found</span>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}