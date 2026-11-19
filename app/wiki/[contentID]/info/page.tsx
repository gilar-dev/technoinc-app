import type { Metadata } from "next";
import Link from "next/link";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";
import { MissingArticle } from "../../Components";
import { reformatURI } from "@/utils/textUtils";
import { getAPIUrl } from "@/libs/database";

interface Params {
    params: Promise<{ contentID: string }>;
}

interface ArticleInfo {
    status: "Success" | "Error";
    data: {
        title: string;
        content_length: number;
        id: number;
        view: number;
        description: string;
        cover: string;
    };
}

type ArticleInfoResult =
    | { kind: "success"; article: ArticleInfo["data"] }
    | { kind: "not-found" }
    | { kind: "error" };

function ArticlePropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <tr className="block border-b border-border/70 last:border-b-0 sm:table-row">
            <th
                scope="row"
                className="block bg-list-bg px-4 py-2.5 text-left text-sm font-semibold text-sidebar-accent sm:table-cell sm:w-[38%] sm:border-r sm:border-border sm:px-5 sm:py-3 sm:text-foreground"
            >
                {label}
            </th>
            <td className="block min-w-0 bg-form-bg px-4 py-3 text-sm leading-6 sm:table-cell sm:px-5">
                {children}
            </td>
        </tr>
    );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { contentID } = await params;
    const title = reformatURI(decodeURIComponent(contentID)).replaceAll("_", " ");
    return { title: `${title} article information - TechnoInc MC Wiki` };
}

async function getArticleInfo(title: string): Promise<ArticleInfoResult> {
    try {
        const response = await fetch(
            `${getAPIUrl()}/api/v1/wiki/${encodeURIComponent(title)}/info`,
            { cache: "no-store" },
        );
        if (response.status === 404) return { kind: "not-found" };
        if (!response.ok) throw new Error(`Article information request failed (${response.status})`);

        const result: ArticleInfo = await response.json();
        if (result.status !== "Success" || !result.data) {
            throw new Error("The article information service returned an unsuccessful response");
        }

        return { kind: "success", article: result.data };
    } catch (error) {
        console.error("Unable to load article information", error);
        return { kind: "error" };
    }
}

export default async function WikiPageInfo({ params }: Params) {
    const { contentID } = await params;
    const articleInfo = await getArticleInfo(reformatURI(decodeURIComponent(contentID)));
    const requestedTitle = reformatURI(decodeURIComponent(contentID)).replaceAll("_", " ");

    return (
        <div className="md:relative md:w-[75%] md:left-[25%]">
            <Menubar title="Wiki - Article information" />
            <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>
            <main className="min-h-[calc(100vh-4rem)] px-3 py-6 font-basic lg:px-7 lg:py-10">
                {articleInfo.kind === "success" ? (
                    <article className="mx-auto max-w-5xl">
                        <header className="mb-6 border-l-4 border-sidebar-accent bg-form-bg px-4 py-4 sm:px-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-sidebar-accent">
                                        TechnoInc wiki <span className="mx-1 text-foreground/35">/</span> page record
                                    </p>
                                    <h1 className="mt-2 font-historical text-3xl font-medium sm:text-4xl">
                                        {articleInfo.article.title.replaceAll("_", " ")}
                                    </h1>
                                    <p className="mt-2 text-sm text-foreground/70">
                                        A quick reference to this page&apos;s content and readership.
                                    </p>
                                </div>
                                <Link
                                    href={`/wiki/${encodeURIComponent(articleInfo.article.title)}`}
                                    className="inline-flex w-fit shrink-0 items-center gap-2 border border-border px-3 py-2 text-sm font-semibold hover:bg-list-bg"
                                >
                                    <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>
                                    Return to article
                                </Link>
                            </div>
                        </header>

                        <section aria-labelledby="record-heading">
                            <div className="mb-2 flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-sidebar-accent">
                                <i className="fa-solid fa-list-check" aria-hidden="true"></i>
                                <h2 id="record-heading">Article details</h2>
                            </div>
                            <div className="overflow-hidden border border-border shadow-sm">
                                <table className="block w-full border-collapse text-left sm:table">
                                    <caption className="sr-only">
                                        Metadata and readership details for {articleInfo.article.title.replaceAll("_", " ")}
                                    </caption>
                                    <tbody className="block sm:table-row-group">
                                        <ArticlePropertyRow label="Display title">
                                            <Link
                                                href={`/wiki/${encodeURIComponent(articleInfo.article.title)}`}
                                                className="font-semibold text-link hover:underline"
                                            >
                                                {articleInfo.article.title.replaceAll("_", " ")}
                                            </Link>
                                        </ArticlePropertyRow>
                                        <ArticlePropertyRow label="Page ID">
                                            <span className="tabular-nums">{articleInfo.article.id.toLocaleString()}</span>
                                        </ArticlePropertyRow>
                                        <ArticlePropertyRow label="Page length (bytes)">
                                            <span className="tabular-nums">{articleInfo.article.content_length.toLocaleString()}</span>
                                        </ArticlePropertyRow>
                                        <ArticlePropertyRow label="Page views">
                                            <span className="inline-flex items-center gap-2 tabular-nums">
                                                <i className="fa-regular fa-eye text-sidebar-accent" aria-hidden="true"></i>
                                                {articleInfo.article.view.toLocaleString()}
                                            </span>
                                        </ArticlePropertyRow>
                                        <ArticlePropertyRow label="Local description">
                                            {articleInfo.article.description.trim() || (
                                                <span className="italic text-foreground/60">No description has been added yet.</span>
                                            )}
                                        </ArticlePropertyRow>
                                        <ArticlePropertyRow label="Page image">
                                            {articleInfo.article.cover ? (
                                                <figure className="max-w-xl">
                                                    <img
                                                        src={articleInfo.article.cover}
                                                        alt={`Cover for ${articleInfo.article.title.replaceAll("_", " ")}`}
                                                        className="max-h-72 w-full bg-list-bg object-contain p-2"
                                                    />
                                                    <figcaption className="mt-2 text-xs text-foreground/60">
                                                        Cover image for this wiki page
                                                    </figcaption>
                                                </figure>
                                            ) : (
                                                <span className="italic text-foreground/60">No page image has been added.</span>
                                            )}
                                        </ArticlePropertyRow>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-3 flex items-center gap-2 text-xs text-foreground/60">
                                <i className="fa-solid fa-circle-info text-sidebar-accent" aria-hidden="true"></i>
                                Page information is provided by the TechnoInc wiki archive.
                            </p>
                        </section>
                    </article>
                ) : articleInfo.kind === "not-found" ? (
                    <div className="mx-auto max-w-5xl">
                        <MissingArticle title={requestedTitle} />
                    </div>
                ) : (
                    <section role="alert" className="mx-auto max-w-5xl border-y border-border bg-form-bg p-6">
                        <p className="font-semibold">Article information is temporarily unavailable.</p>
                        <p className="mt-2 text-sm text-foreground/70">
                            Please try again later or return to the wiki and open the article directly.
                        </p>
                        <Link href={`/wiki/${encodeURIComponent(requestedTitle.replaceAll(" ", "_"))}`} className="mt-4 inline-block text-link hover:underline">
                            Return to article
                        </Link>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}
