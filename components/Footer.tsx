import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-sidebar-border bg-form-bg px-5 py-8 text-sm text-foreground/75 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    <div>
                        <div className="mb-3 flex items-center gap-3 text-foreground">
                            <span className="self-start flex w-9 aspect-square items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-bg">
                                <i className="fa-solid fa-cube"></i>
                            </span>
                            <div>
                                <p className="font-montserrat font-bold tracking-wide">TechnoInc MC Wiki</p>
                                <p className="text-xs text-foreground/60">A personal-built survival world encyclopedia</p>
                            </div>
                        </div>
                        <p className="max-w-md leading-6">
                            Explore documented places, people, history, and stories from the TechnoInc survival world.
                            Articles grow with every contributor.
                        </p>
                    </div>
                    <div>
                        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">Explore</h2>
                        <ul className="space-y-2">
                            <li><Link href="/wiki" className="hover:text-sidebar-accent hover:underline"><i className="fa-brands fa-wikipedia-w"></i> Wiki</Link></li>
                            <li><Link href="/category" className="hover:text-sidebar-accent hover:underline"><i className="fa-solid fa-layer-group"></i> Category</Link></li>
                            <li><Link href="/contribution" className="hover:text-sidebar-accent hover:underline"><i className="fa-brands fa-gratipay"></i> Contribution</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">Support</h2>
                        <ul className="space-y-2">
                            <li><Link href="https://github.com/gilar-dev" target="_blank" rel="noopener noreferer" className="hover:text-sidebar-accent hover:underline"><i className="fa-brands fa-github"></i> GitHub</Link></li>
                            <li><Link href="https://www.linkedin.com/in/gilar-hafizh-indarto-b1891941a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferer" className="hover:text-sidebar-accent hover:underline"><i className="fa-brands fa-linkedin"></i> LinkedIn</Link></li>
                            <li><Link href="https://instagram.com/_glrin" target="_blank" rel="noopener noreferer" className="hover:text-sidebar-accent hover:underline"><i className="fa-brands fa-instagram"></i> Instagram</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sidebar-accent">About this wiki</h2>
                        <ul className="space-y-2">
                            <li>Open documentation for the TechnoInc world</li>
                            <li>Content is maintained by contributors</li>
                            <li>Last updated content is shown per article</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-2 border-t border-sidebar-border pt-4 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>Text and content are available for community use.</p>
                    <p>TechnoInc MC Wiki · Personal documentation.</p>
                    <p>&copy; Copyright {new Date().getFullYear()} <strong>TechnoInc</strong>. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}