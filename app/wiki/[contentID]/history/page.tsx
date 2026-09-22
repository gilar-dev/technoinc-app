import type { Metadata } from "next";
import Link from "next/link";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import { MissingArticle } from "../../Components";
import { dbGetArticleData } from "@/libs/database";
import { formatDate, formatTime, groupHistory, ModifyLogList } from "./utils";

interface PageProps {
    params: Promise<{ contentID: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { contentID } = await params;
    const title = decodeURIComponent(contentID).replaceAll("_", " ");
    return { title: `${title} history - TechnoInc MC Wiki` };
}

export default async function WikiPageHistory({ params }: PageProps) {
    const { contentID } = await params;
    const articleID = decodeURIComponent(contentID).replace(/\s+/g, "_");
    const articleData = await dbGetArticleData(articleID);
    const articleTitle = articleData?.title.replaceAll("_", " ") ?? articleID.replaceAll("_", " ");
    const historyGroups = articleData ? groupHistory(articleData.his) : [];

    return (
        <div className="md:relative md:w-[75%] md:left-[25%]">
            <Menubar title="Wiki - Revision history" />
            <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>
            <main className="min-h-[calc(100vh-4rem)] px-3 py-6 font-basic lg:px-7 lg:py-10">
                {articleData ? (
                    <section className="mx-auto max-w-5xl">
                        <header className="mb-6 border-b border-border pb-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">Revision history</p>
                                    <h1 className="mt-1 font-historical text-3xl font-medium">{articleTitle}</h1>
                                </div>
                                <Link
                                    href={`/wiki/${articleData.title}`}
                                    replace
                                    className="flex items-center gap-2 border border-border px-3 py-2 text-sm font-semibold hover:bg-list-bg"
                                >
                                    <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                                    Return to article
                                </Link>
                            </div>
                            <p className="mt-3 text-sm text-foreground/70">
                                Browse the article&apos;s revisions and the block-level changes recorded for each edit.
                            </p>
                        </header>
                        {historyGroups.length > 0 ? (
                            <div className="border-y border-border">
                                {historyGroups.map((group) => (
                                    <section key={group.date} className="border-b border-border last:border-b-0">
                                        <h2 className="bg-list-bg px-4 py-2 font-semibold">{formatDate(group.date)}</h2>
                                        <ol className="divide-y divide-border/60">
                                            {group.revisions.map((revision, index) => (
                                                <li key={`${revision.date}-${revision.user}-${index}`} className="p-4 lg:px-6">
                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                        <div className="flex items-start gap-3">
                                                            <i className={`fa-solid ${revision.sts === "create" ? "fa-file-circle-plus text-green-500" : "fa-pen-to-square text-sidebar-accent"} mt-1`} aria-hidden="true"></i>
                                                            <div>
                                                                <p>
                                                                    <span className="font-semibold">{revision.user}</span>
                                                                    <span className="text-foreground/70"> {revision.sts === "create" ? "created this article" : "edited this article"}</span>
                                                                </p>
                                                                <p className="mt-1 text-sm text-foreground/70">{revision.sum || <span className="italic">No summary added</span>}</p>
                                                            </div>
                                                        </div>
                                                        <time className="text-sm text-foreground/60 sm:pl-4">{formatTime(revision.date)}</time>
                                                    </div>
                                                    <ModifyLogList logs={revision.m_logs} />
                                                </li>
                                            ))}
                                        </ol>
                                    </section>
                                ))}
                            </div>
                        ) : (
                            <div className="border-y border-border bg-form-bg p-8 text-center text-foreground/70">
                                No revision history has been recorded for this article yet.
                            </div>
                        )}
                    </section>
                ) : (
                    <MissingArticle title={articleTitle} />
                )}
            </main>
            <Footer />
        </div>
    );
}