import Link from "next/link";
import type { ArticleData } from "@/contexts/ArticleDataProvider";
import { createDate } from "@/libs/publish-materials";

interface WikiInfoProps {
    articleData: ArticleData;
    suggestions?: string[];
}

function displayTitle(title: string): string {
    return title.replaceAll("_", " ");
}

function revisionMessage(status: "create" | "edit", date: string): { text: string; isToday: boolean } {
    const action = status === "create" ? "created" : "last edited";

    const [datePart, timePart] = date.split(", ");
    const [year, month, day] = datePart.split("/");
    const [hour, minute] = timePart.split(":");
    const revisionDate = new Date(Number(year), Number(month) - 1, Number(day));
    const stringifiedRevDate = revisionDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    const currentDate = createDate().split(", ");
    const [cYear, cMonth, cDay] = currentDate[0].split("/");

    const isToday = year === cYear && month === cMonth && day === cDay;
    const isYesterday = year === cYear && month === cMonth && Number(cDay) - 1 === Number(day);
    const dateLabel = isToday ? "today" : isYesterday ? "yesterday" : stringifiedRevDate;
    const timeFormat = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;

    return { text: `This article was ${isToday || isYesterday ? action : `${action} on`} ${dateLabel}, at ${timeFormat}`, isToday };
}

export default function WikiInfo({ articleData, suggestions = [] }: WikiInfoProps) {
    const latestRevision = articleData.his[articleData.his.length - 1];
    const contributor = latestRevision.user;
    const revision = revisionMessage(latestRevision.sts, latestRevision.date);
    const relatedArticles = suggestions.filter((suggestion) => suggestion !== articleData.title).slice(0, 6);

    return (
        <section className="font-basic text-[14px] bg-form-bg">
            <div>
                {latestRevision && (
                    <Link
                        href={`/wiki/${articleData.title}/history`}
                        className={`group cursor-pointer flex items-center gap-3 border-y border-border px-3 py-2 ${revision.isToday ? "bg-[#36c] text-white" : "bg-infobox-bg text-foreground/75"}`}
                    >
                        <i className={`fa-solid fa-clock-rotate-left ${revision?.isToday ? "text-white" : "text-sidebar-accent"}`}></i>
                        <p className="group-hover:underline group-active:underline"><strong>{revision.text}</strong> by {contributor}.</p>
                        <i className="fa-solid fa-angle-right ml-auto"></i>
                    </Link>
                )}

                <div className="mx-3 mt-5 p-3 border border-border bg-gray-500/10">
                    {articleData.cat.length > 0 ? (
                        <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <li>Category:</li>
                            {articleData.cat.map((category, index) => (
                                <li key={category} className="flex items-center gap-x-2">
                                    {index > 0 && <span aria-hidden="true" className="text-foreground/45">|</span>}
                                    <Link
                                        href={`/category/${encodeURIComponent(category)}`}
                                        className="text-link hover:underline"
                                    >
                                        {displayTitle(category)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-foreground/65">This article has not been placed in a category.</p>
                    )}
                </div>
            </div>

            {relatedArticles.length > 0 && (
                <div className="mx-3 py-4">
                    <h2 className="mb-3 font-historical text-[20px] font-medium">More articles</h2>
                    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedArticles.map((article) => (
                            <li key={article}>
                                <Link
                                    href={`/wiki/${encodeURIComponent(article)}`}
                                    className="flex items-center gap-2 text-link hover:underline active:underline"
                                >
                                    <i className="fa-solid fa-arrow-up-right-from-square text-[0.75em]"></i>
                                    <span>{displayTitle(article)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}