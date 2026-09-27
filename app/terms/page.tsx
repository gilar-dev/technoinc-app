import type { Metadata } from "next";
import Link from "next/link";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";

export const metadata: Metadata = {
    title: "Terms of Service - TechnoInc MC Wiki",
    description: "Terms for browsing, signing in to, and contributing to the TechnoInc MC Wiki."
};

const sections = [
    { id: "agreement", title: "Agreement and scope" },
    { id: "eligibility", title: "Eligibility and sign-in" },
    { id: "contributions", title: "Contributor submissions" },
    { id: "content-rights", title: "Content rights and reuse" },
    { id: "acceptable-use", title: "Acceptable use" },
    { id: "moderation", title: "Review and removal" },
    { id: "third-party", title: "Third-party services" },
    { id: "availability", title: "Availability and disclaimers" },
    { id: "liability", title: "Liability" },
    { id: "changes-contact", title: "Changes and contact" }
];

export default function TermsPage() {
    return (
        <div className="md:relative md:w-[75%] md:left-[25%]">
            <Menubar title="Terms of service" />
            <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>

            <main className="min-h-[calc(100vh-4rem)] px-3 py-7 font-basic lg:px-7 lg:py-10">
                <article className="mx-auto max-w-5xl">
                    <header className="mb-7 border-b border-border pb-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">TechnoInc MC Wiki</p>
                        <h1 className="mt-1 font-historical text-3xl font-medium">Terms of service</h1>
                        <p className="mt-3 max-w-3xl leading-7 text-foreground/75">
                            These terms explain the rules for accessing this community encyclopedia, using its sign-in feature,
                            and submitting or editing content.
                        </p>
                        <p className="mt-3 text-sm text-foreground/60">Last reviewed: 27 September 2026</p>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
                        <div className="order-2 min-w-0 space-y-8 lg:order-1">
                            <section id="agreement" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Agreement and scope</h2>
                                <p className="leading-7 text-foreground/80">
                                    These Terms of Service apply when you access or use TechnoInc MC Wiki (the “Site”), including
                                    browsing articles, searching, signing in, or submitting a contribution. By using the Site, you
                                    agree to follow these terms and applicable law. If you do not agree, do not use the Site or
                                    submit content.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    The Site is an independently maintained encyclopedia about the TechnoInc survival world. It is
                                    not an official Minecraft or Mojang service and is not affiliated with Mojang or Microsoft.
                                </p>
                            </section>

                            <section id="eligibility" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Eligibility and sign-in</h2>
                                <p className="leading-7 text-foreground/80">
                                    You are responsible for using the Site lawfully and for information you submit. If you are not
                                    legally able to agree to these terms where you live, use the Site only with any consent or
                                    supervision required by local law.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    The Site may offer sign-in through Google. Your use of Google sign-in is also subject to Google&apos;s
                                    terms and policies. A signed-in profile is used for the sign-in experience; the contributor name
                                    entered in the contribution form is separately used for public article revision attribution.
                                    A contributor alias is not identity verification and should not be used to impersonate another
                                    person or organization.
                                </p>
                            </section>

                            <section id="contributions" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Contributor submissions</h2>
                                <p className="leading-7 text-foreground/80">
                                    You may submit article text, descriptions, categories, images, contributor names or aliases,
                                    summaries, and revision logs through the Site. You are responsible for ensuring that your
                                    submission is accurate to the best of your knowledge, appropriate for this encyclopedia, and
                                    does not violate another person&apos;s rights or applicable law.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">Do not submit content that:</p>
                                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-foreground/80">
                                    <li>Contains personal, confidential, or sensitive information about another person without a lawful basis and appropriate permission.</li>
                                    <li>Infringes copyright, trademark, privacy, publicity, or other rights.</li>
                                    <li>Is unlawful, threatening, deceptive, abusive, or knowingly misleading.</li>
                                    <li>Contains malware, harmful code, spam, or attempts to disrupt or gain unauthorized access to the Site or its services.</li>
                                </ul>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    Submitted articles and revision histories are designed to be publicly viewable. Revision entries
                                    may display your chosen alias, summary, date, and block-level changes. Do not submit anything
                                    you expect to remain private.
                                </p>
                            </section>

                            <section id="content-rights" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Content rights and reuse</h2>
                                <p className="leading-7 text-foreground/80">
                                    You retain any rights you hold in content you submit. By submitting content, you grant the Site
                                    operator a non-exclusive, worldwide, royalty-free permission to host, store, reproduce, format,
                                    display, and distribute that content as reasonably needed to operate, maintain, back up, and
                                    present the Site, including displaying its public revision history.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    The Site footer describes text and content as available for community use, but the Site does not
                                    currently identify a specific standardized open-content license. Unless an article or asset
                                    includes an explicit license notice, these Terms do not grant a general license to reuse or
                                    redistribute it outside the Site. Ask the relevant rights holder for permission when needed.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    You confirm that you have the rights and permissions necessary to make your submission and to
                                    grant the limited permission described above. If a submission contains third-party material,
                                    identify any applicable source or license where practical.
                                </p>
                            </section>

                            <section id="acceptable-use" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Acceptable use</h2>
                                <p className="leading-7 text-foreground/80">When using the Site, you agree not to:</p>
                                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-foreground/80">
                                    <li>Misrepresent your identity, authority, or relationship with another person or organization.</li>
                                    <li>Interfere with the Site, its backend, or other users&apos; access, including through excessive automated requests.</li>
                                    <li>Bypass technical restrictions, probe for vulnerabilities without authorization, or access non-public systems or data.</li>
                                    <li>Use Site content or services in a way that violates applicable law or third-party rights.</li>
                                </ul>
                            </section>

                            <section id="moderation" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Review and removal</h2>
                                <p className="leading-7 text-foreground/80">
                                    The Site may review, decline, edit, restrict, or remove content or access when reasonably
                                    necessary to operate the encyclopedia, address these terms, respond to a rights or safety concern,
                                    or comply with law. The Site does not promise to review every submission or maintain every
                                    revision indefinitely. Removing content from the Site may not remove copies, caches, or records
                                    held by service providers or people who previously accessed it.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    To request a correction or removal, contact the maintainer with the relevant article URL and
                                    revision details. Requests may require enough information to assess the issue, but do not send
                                    passwords or unnecessary sensitive information.
                                </p>
                            </section>

                            <section id="third-party" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Third-party services</h2>
                                <p className="leading-7 text-foreground/80">
                                    The Site relies on services that may include Google sign-in, the TechnoInc Wiki backend, Cloudinary
                                    image handling, hosting infrastructure, and cdnjs for the icon stylesheet. Those services may
                                    have their own terms, availability, and privacy practices. The Site operator does not control
                                    independent third-party services; your use of them may be subject to their own terms.
                                </p>
                            </section>

                            <section id="availability" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Availability and disclaimers</h2>
                                <p className="leading-7 text-foreground/80">
                                    The Site and its content are provided on an “as available” basis. The operator does not guarantee
                                    uninterrupted access, error-free operation, preservation of every submission, or that every
                                    article is complete, current, or accurate. Wiki content is community documentation, not
                                    professional, legal, financial, medical, or other expert advice. Use it at your own discretion
                                    and verify important information independently.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    To the extent permitted by law, implied warranties are disclaimed. Nothing in these terms limits
                                    a warranty or right that cannot legally be excluded where you live.
                                </p>
                            </section>

                            <section id="liability" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Liability</h2>
                                <p className="leading-7 text-foreground/80">
                                    To the extent permitted by applicable law, the Site operator is not liable for indirect,
                                    incidental, special, consequential, or punitive loss, loss of data, or loss of access arising
                                    from use of or inability to use the Site. Nothing in these terms excludes liability that cannot
                                    be excluded or limited under applicable law, including liability for fraud or intentional
                                    misconduct where such exclusion is prohibited.
                                </p>
                            </section>

                            <section id="changes-contact" className="scroll-mt-24">
                                <h2 className="mb-3 border-b border-border pb-2 font-historical text-2xl">Changes and contact</h2>
                                <p className="leading-7 text-foreground/80">
                                    These terms may be updated when the Site or its practices change. The date above indicates the
                                    latest review. If a change is material, the Site may provide notice where reasonably practical.
                                    Please review this page periodically.
                                </p>
                                <p className="mt-3 leading-7 text-foreground/80">
                                    For questions, content concerns, or permission requests, contact the site maintainer through the
                                    {" "}<a href="https://github.com/gilar-dev" target="_blank" rel="noopener noreferrer" className="text-link underline">maintainer&apos;s GitHub profile</a>.
                                    These terms do not specify an exclusive governing law or court. Mandatory protections that apply
                                    to you under local law remain unaffected.
                                </p>
                                <p className="mt-3 text-sm text-foreground/60">
                                    See also the <Link href="/privacy-policy" className="text-link underline">Privacy Policy</Link> for
                                    information about data handling.
                                </p>
                            </section>
                        </div>

                        <aside className="order-1 h-fit border border-sidebar-border bg-sidebar-panel p-4 lg:sticky lg:top-24 lg:order-2">
                            <h2 className="mb-3 font-semibold">On this page</h2>
                            <nav aria-label="Terms of service sections">
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
