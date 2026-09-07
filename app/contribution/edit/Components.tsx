interface ContributionHeaderProps {
    title?: string;
}

export function ContributionHeader({ title = "" }: ContributionHeaderProps) {
    return (
        <div className="mx-3 max-w-5xl py-3 lg:mx-21 lg:py-5">
            <div className="rounded-lg border border-sidebar-border bg-form-bg p-5 shadow-sm shadow-black/10 lg:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-[0.72em] font-semibold uppercase tracking-[0.18em] text-sidebar-accent">Contributor workspace</p>
                        <h1 className="mt-1 font-montserrat text-2xl font-bold">Edit article</h1>
                        <p className="mt-1 text-sm text-foreground/65">Review and refine the existing article details and content.</p>
                    </div>
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-sidebar-border bg-sidebar-panel px-3 py-1 text-xs font-semibold text-sidebar-accent">
                        <i className="fa-solid fa-pen-to-square"></i>
                        Edit mode
                    </span>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-sidebar-border pt-3 text-sm text-foreground/70">
                    <i className="fa-regular fa-file-lines text-sidebar-accent"></i>
                    <span>Editing:</span>
                    <span className="font-semibold text-foreground">{title}</span>
                </div>
            </div>
        </div>
    );
}