"use client"; // Client-side rendering directive for Next.js

import Link from "next/link";
import { useTheme } from "next-themes";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useState, useEffect, useRef } from "react";

interface MenubarProps {
    title?: string;
}

export default function Menubar({ title = "" }: MenubarProps) {
    const { theme } = useTheme();
    const { toggleSidebar } = useSidebar();
    const [mounted, setMounted] = useState<boolean>(false);
    const menubarRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        if (!menubarRef.current) return;

        const parentElement = menubarRef.current.parentElement;
        if (!parentElement) return;

        const parentScrollHandle = () => {
            if (menubarRef.current) {
                const scrollTop = parentElement.scrollTop;
                if (scrollTop > 0) menubarRef.current.classList.replace("p-[0.7em]", "p-[0.5em]")
                else menubarRef.current.classList.replace("p-[0.5em]", "p-[0.7em]");
            }
        };

        // Add scroll event listener to the parent element to handle padding changes on scroll
        parentElement.addEventListener("scroll", parentScrollHandle);
        return () => {
            // Clean up the event listener when the component unmounts
            parentElement.removeEventListener("scroll", parentScrollHandle);
        }
    }, []);

    return (
        <nav
            ref={menubarRef}
            className="
                w-full mb- font-basic p-[0.7em] flex justify-evenly items-center gap-1 sticky top-0 border-b z-1 border-border text-white bg-navbar-bg
                transition-[padding] duration-300 ease-in-out [&_button]:text-[1.3em]
            "
        >
            <div
                title="Menu"
                className="w-10 aspect-square flex justify-center items-center relative hover:bg-white/20 transition-colors duration-300 ease-in-out *:absolute md:hidden"
            >
                <i className="fa-solid fa-bars text-[1.4em]"></i>
                <button
                    className="w-full h-full cursor-pointer"
                    onClick={() => toggleSidebar()}
                ></button>
            </div>
            <div className="font-montserrat">
                <h2 className="font-bold">
                    {title.trim() ? title : "TechnoInc Wiki MC"}
                </h2>
                {title.trim() && (
                    <span className="font-semibold text-[0.75em]">TechnoInc MC Wiki</span>
                )}
            </div>
            <div className="ml-auto">
                <ul className="flex items-center gap-2 [&_div]:w-10 [&_div]:aspect-square [&_div]:hover:bg-white/20 [&_i]:text-[1.4em]">
                    <li title="Search">
                        <div className="flex justify-center items-center relative *:absolute">
                            <i className="fa-solid fa-search"></i>
                            <button className="w-full h-full cursor-pointer"></button>
                        </div>
                    </li>
                    <li title="Contribution">
                        <div className="flex justify-center items-center relative *:absolute">
                            <i className="fa-solid fa-pen-to-square"></i>
                            <Link
                                href="/contribution"
                                className="w-full h-full cursor-pointer"
                            ></Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}