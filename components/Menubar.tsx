"use client"; // Client-side rendering directive for Next.js

import { useState, useEffect, useRef } from "react";
import { useSidebar } from "@/contexts/SidebarProvider";
import SearchPanel from "./SearchPanel";
import LoginButton from "./Auth/LoginButton";

interface MenubarProps {
    title?: string;
}

export default function Menubar({ title = "" }: MenubarProps) {
    const { toggleSidebar } = useSidebar();
    const menubarRef = useRef<HTMLElement | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        if (!menubarRef.current) return;

        const windowScrollHandle = () => {
            if (menubarRef.current) {
                const scrollTop = window.scrollY;
                if (scrollTop > 0) menubarRef.current.classList.replace("p-[0.7em]", "p-[0.5em]")
                else menubarRef.current.classList.replace("p-[0.5em]", "p-[0.7em]");
            }
        };

        // Add scroll event listener to the parent element to handle padding changes on scroll
        window.addEventListener("scroll", windowScrollHandle);
        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener("scroll", windowScrollHandle);
        }
    }, []);

    return (
        <nav
            ref={menubarRef}
            className="
                w-full font-basic p-[0.7em] flex justify-evenly items-center gap-1 sticky top-0 border-b z-2 border-border text-white bg-navbar-bg
                transition-[padding] duration-300 ease-in-out [&_button]:text-[1.3em]
            "
        >
            <div
                title="Menu"
                className="w-10 aspect-square flex justify-center items-center relative hover:bg-white/20 active:bg-white/20 transition-colors duration-300 ease-in-out *:absolute md:hidden"
            >
                <i className="fa-solid fa-bars text-[1.4em]"></i>
                <button
                    className="w-full h-full cursor-pointer"
                    onClick={() => toggleSidebar()}
                ></button>
            </div>
            <div className="font-montserrat flex flex-col">
                <h2 className="font-bold">
                    {title.trim() ? title : "TechnoInc Wiki MC"}
                </h2>
                {title.trim() && (
                    <span className="font-semibold text-[0.75em]">TechnoInc MC Wiki</span>
                )}
            </div>
            <div className="ml-auto">
                <ul className="flex items-center gap-2 [&_div]:w-10 [&_div]:aspect-square [&_div]:hover:bg-white/20 [&_div]:active:bg-white/20 [&_i]:text-[1em]">
                    <li title="Search">
                        <div className="flex justify-center items-center relative *:absolute">
                            <button
                                type="button"
                                title="Search articles"
                                aria-label="Search articles"
                                className="w-full h-full cursor-pointer"
                                onClick={() => setIsSearchOpen(true)}
                            ><i className="fa-solid fa-search"></i></button>
                        </div>
                    </li>
                    <li title="Contribution">
                        <div className="flex justify-center items-center relative *:absolute">
                            <LoginButton />
                        </div>
                    </li>
                </ul>
            </div>
            {isSearchOpen && <SearchPanel onClose={() => setIsSearchOpen(false)} />}
        </nav>
    );
}