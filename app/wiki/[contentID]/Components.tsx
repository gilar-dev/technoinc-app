"use client"; // Client-side rendering directive for Next.js

interface ArticleTitleProps {
    title: string;
    description: string | undefined;
}

export function HeadingHolder({ title, description }: ArticleTitleProps) {
    return (
        <div className="w-full mt-5 font-basic text-center flex flex-col items-center gap-5 lg:px-7">
            <div>
                <h1 className="font-bold text-2xl">
                    <span className="highlight">{title}</span>
                </h1>
                <span className="text-[0.9em]">{description}</span>
            </div>
            <div className="w-full p-3">
                <nav className="w-full border-t border-b border-border">
                    <ul className="w-full px-1 flex justify-center items-center gap-1">
                        <li className="block mr-auto">
                            <span className="font-semibold">Page</span>
                        </li>
                        <li className="p-1 hover:bg-list-bg">
                            <span className="text-[1.5em]"><i className="fa-solid fa-pen-to-square"></i></span>
                        </li>
                        <li className="p-1 hover:bg-list-bg">
                            <span className="text-[1.5em]"><i className="fa-solid fa-ellipsis-vertical"></i></span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}