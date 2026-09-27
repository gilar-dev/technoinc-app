import type { Metadata } from "next";
import Link from "next/link";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";

export const metadata: Metadata = {
    title: "Privacy Policy - TechnoInc MC Wiki",
    description: "How TechnoInc MC Wiki handles contributor information, article content, browser storage, and service providers."
};

const sections = [
    { id: "information", title: "Information involved" },
    { id: "contributions", title: "Articles and contributions" },
    { id: "browser-storage", title: "Browser storage and cookies" },
    { id: "service-providers", title: "Services and sharing" },
    { id: "retention", title: "Retention and removal" },
    { id: "your-choices", title: "Your choices and requests" },
    { id: "updates", title: "Policy updates" }
];

export default function PrivacyPolicyPage() {
    return (
        <div className="md:relative md:w-[75%] md:left-[25%]">
            <Menubar title="Privacy policy" />
            <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>

            <main className="min-h-[calc(100vh-4rem)] px-3 py-7 font-basic lg:px-7 lg:py-10">
                <article className="mx-auto max-w-5xl">
                    <header className="mb-7 border-b border-border pb-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">TechnoInc MC Wiki</p>
                        <h1 className="mt-1 font-historical text-3xl font-medium">Privacy policy</h1>
                        <p className="mt-3 max-w-3xl leading-7 text-foreground/75">
                            This page explains what information is used when you browse the wiki or contribute an article,
                            where it is sent, and what choices are available to you.
                        </p>
                        <p className="mt-3 text-sm text-foreground/60">Last reviewed: 27 September 2026</p>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
                        <div className="order-2 min-w-0 space-y-8 lg:order-1">
                            <section id="information" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Information involved</h2>
                                <p className="leading-7 text-foreground/80">
                                    TechnoInc MC Wiki is a community encyclopedia. The information handled depends on how you use it.
                                    Reading pages does not ask you to provide a name. If you submit or edit an article, the form asks
                                    for a contributor name or alias and a summary of your changes.
                                </p>
                                <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-foreground/80">
                                    <li>Article information you submit, such as titles, descriptions, categories, text, and images.</li>
                                    <li>Your chosen contributor name or alias, edit summary, and recorded block-level change log.</li>
                                    <li>Search terms and other requests needed to return the pages or results you ask for.</li>
                                </ul>
                            </section>

                            <section id="contributions" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Articles and contributions</h2>
                                <p className="leading-7 text-foreground/80">
                                    When a contribution is accepted, its article content and revision information are sent to the
                                    TechnoInc Wiki backend. The revision history can show the alias you supplied, your summary,
                                    the date, and changes such as blocks added, moved, or deleted. Articles and their revision
                                    histories are intended to be publicly viewable by site visitors. Do not include private or
                                    sensitive information in an article, alias, or summary.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    An alias is a display name, not an authentication credential. The contributor form does not
                                    establish that an alias identifies a particular person.
                                </p>
                            </section>

                            <section id="browser-storage" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Browser storage and cookies</h2>
                                <p className="leading-7 text-foreground/80">
                                    The contributor form saves the alias you enter in this browser&apos;s local storage under
                                    <code className="mx-1 rounded-sm bg-foreground/5 px-1.5 py-0.5 text-sm">technoinc-contributor-name</code>
                                    so it can be filled in during a later visit. This value stays in that browser until it is
                                    cleared from the browser&apos;s site data. It is separate from the public revision history.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    When you visit a wiki article route, the site may set a short-lived cookie named
                                    <code className="mx-1 rounded-sm bg-foreground/5 px-1.5 py-0.5 text-sm">x-user-previous-url</code>.
                                    It expires after five seconds and is used for article URL redirect handling. The site also stores
                                    your selected display theme in browser storage under
                                    <code className="mx-1 rounded-sm bg-foreground/5 px-1.5 py-0.5 text-sm">technoinc-theme</code>.
                                </p>
                            </section>

                            <section id="service-providers" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Services and sharing</h2>
                                <p className="leading-7 text-foreground/80">
                                    Search queries, article requests, and contributions are sent to the configured TechnoInc Wiki
                                    backend so it can provide the requested feature. Uploaded article images are handled through
                                    the backend&apos;s Cloudinary integration and may be stored and served by that provider.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    The site also loads its Font Awesome icon stylesheet from cdnjs. A browser requesting that
                                    stylesheet connects to the CDN, which may receive technical request information such as an
                                    IP address and browser details. These providers process requests under their own policies.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    The site code does not currently include an analytics SDK. Hosting, backend, and service
                                    providers may independently process technical logs to operate, secure, and troubleshoot their
                                    services; their exact data and retention practices depend on their configurations and policies.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    Depending on where the backend and providers operate, information may be processed in countries
                                    other than yours. Their own privacy terms describe their handling of that information.
                                </p>
                            </section>

                            <section id="retention" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Retention and removal</h2>
                                <p className="leading-7 text-foreground/80">
                                    Published article content and revision records may remain available as part of the encyclopedia.
                                    The site does not provide a self-service account or revision deletion control. Image replacement
                                    and deletion are handled through the contribution workflow, but removal from the wiki does not
                                    necessarily remove copies, caches, or records held by service providers or infrastructure.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    The local alias can be removed by clearing this site&apos;s local storage in your browser. The
                                    short-lived redirect cookie expires automatically.
                                </p>
                            </section>

                            <section id="your-choices" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Your choices and requests</h2>
                                <p className="leading-7 text-foreground/80">
                                    You can choose an alias, avoid putting personal details in public contributions, and clear the
                                    alias saved by this browser. If you have a question or want to request a correction or removal
                                    of a contribution, contact the site maintainer through the
                                    {" "}<a href="https://github.com/gilar-dev" target="_blank" rel="noopener noreferrer" className="text-link underline">maintainer&apos;s GitHub profile</a>.
                                    Include the article URL and enough detail to identify the relevant revision; do not send passwords
                                    or other sensitive information. Depending on where you live, local privacy laws may give you
                                    additional rights.
                                </p>
                            </section>

                            <section id="updates" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Policy updates</h2>
                                <p className="leading-7 text-foreground/80">
                                    This policy may change when the site&apos;s features or data practices change. The date above
                                    indicates when this page was last reviewed. Please review this page periodically for updates.
                                </p>
                            </section>
                        </div>

                        <aside className="order-1 h-fit border border-sidebar-border bg-sidebar-panel p-4 lg:sticky lg:top-24 lg:order-2">
                            <h2 className="mb-3 font-semibold">On this page</h2>
                            <nav aria-label="Privacy policy sections">
                                <ol className="space-y-2 border-l border-sidebar-border pl-3 text-sm">
                                    {sections.map((section) => (
                                        <li key={section.id}>
                                            <Link href={`#${section.id}`} className="text-foreground/75 hover:text-sidebar-accent hover:underline">
                                                {section.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </aside>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
