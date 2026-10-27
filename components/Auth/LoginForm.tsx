"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface LoginFormProps {
    action: "create" | "edit";
    articleTitle: string;
    returnHref: string;
}

export default function LoginForm({ action, articleTitle, returnHref }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleSignIn = async (): Promise<void> => {
        setIsLoading(true);
        setError("");

        try {
            await signIn("google", { callbackUrl: returnHref });
        } catch {
            setError("Google sign-in could not be started. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] px-3 py-8 font-basic lg:px-7 lg:py-12">
            <section className="mx-auto max-w-5xl border-y border-border bg-form-bg">
                <div className="border-b border-border bg-list-bg px-4 py-2 text-sm">
                    <span className="font-semibold">Sign-in required:</span> authenticate before editing this article.
                </div>
                <div className="p-6 lg:p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-3 flex items-center gap-3 text-sidebar-accent">
                                <i className="fa-solid fa-lock text-xl" aria-hidden="true"></i>
                                <span className="text-xs font-semibold uppercase tracking-[0.16em]">Contributor access</span>
                            </div>
                            <h1 className="font-historical text-3xl font-medium">Sign in to {action} article</h1>
                            <p className="mt-3 leading-7 text-foreground/75">
                                Sign in with your Google account to continue {action} article
                                {articleTitle ? <> <strong className="text-foreground">{articleTitle}</strong></> : " this article"}.
                                You will return to this page after authentication.
                            </p>
                            <p className="mt-3 text-sm leading-6 text-foreground/65">
                                Your Google sign-in is used to authenticate your session. Article revision attribution is provided
                                separately when you submit a contribution.
                            </p>
                        </div>

                        <div className="w-full border-l-4 border-sidebar-accent bg-sidebar-panel p-5 lg:max-w-xs">
                            <h2 className="mb-3 font-semibold">Continue to {action} article</h2>
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={handleGoogleSignIn}
                                className="flex w-full items-center justify-center gap-3 border border-sidebar-border bg-menu-form-bg px-4 py-3 font-semibold transition-colors hover:bg-sidebar-hover active:bg-sidebar-hover disabled:cursor-wait disabled:opacity-60"
                            >
                                <i className={isLoading ? "fa-solid fa-spinner fa-spin" : "fa-brands fa-google"} aria-hidden="true"></i>
                                {isLoading ? "Connecting to Google..." : "Continue with Google"}
                            </button>
                            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
                            <Link
                                href={`/wiki/${encodeURIComponent(articleTitle.replaceAll(" ", "_"))}`}
                                className="mt-4 inline-flex items-center gap-2 text-sm text-link hover:underline active:underline"
                            >
                                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                                Return to article
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
