"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SidebarOverlay } from "@/components/Sidebar/SidebarOverlay";

export default function ContributorPage() {
    const { data: session, status } = useSession();

    return (
        <div className="md:relative md:w-[75%] md:left-[25%]">
            <Menubar title="Contributor profile" />
            <div className="fixed top-0 left-0 z-3 md:w-[25%]">
                <SidebarOverlay />
                <Sidebar />
            </div>

            <main className="min-h-[calc(100vh-4rem)] px-3 py-8 font-basic lg:px-7 lg:py-12">
                <section className="mx-auto max-w-5xl border-y border-border bg-form-bg">
                    <div className="border-b border-border bg-list-bg px-4 py-2 text-sm font-semibold">
                        Contributor profile
                    </div>
                    <div className="flex min-h-40 items-center gap-5 p-6 lg:p-8">
                        {status === "loading" ? (
                            <p className="text-sm text-foreground/65">Loading profile...</p>
                        ) : session ? (
                            <>
                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt=""
                                        className="h-20 w-20 shrink-0 rounded-full border border-sidebar-border object-cover"
                                    />
                                ) : (
                                    <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-sidebar-panel text-2xl text-sidebar-accent">
                                        <i className="fa-solid fa-user" aria-hidden="true"></i>
                                    </span>
                                )}
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-accent">Signed in contributor</p>
                                    <h1 className="mt-1 wrap-break-word font-montserrat text-2xl font-semibold">
                                        {session.user?.name || "Contributor"}
                                    </h1>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => signOut({ callbackUrl: "/contributor" })}
                                    className="ml-auto inline-flex shrink-0 items-center gap-2 border border-sidebar-border px-3 py-2 text-sm font-semibold transition-colors hover:bg-sidebar-hover active:bg-sidebar-hover"
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <div>
                                <h1 className="font-historical text-2xl font-medium">Sign in to view your profile</h1>
                                <p className="mt-2 text-sm leading-6 text-foreground/70">
                                    Use your Google account to access contributor features.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => signIn("google", { callbackUrl: "/contributor" })}
                                    className="mt-4 inline-flex items-center gap-3 border border-sidebar-border bg-menu-form-bg px-4 py-2.5 font-semibold transition-colors hover:bg-sidebar-hover active:bg-sidebar-hover"
                                >
                                    <i className="fa-brands fa-google" aria-hidden="true"></i>
                                    Continue with Google
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
