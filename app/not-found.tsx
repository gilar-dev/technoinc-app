"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathName: string = usePathname();
    const mainPath: string = pathName.split("/")[1].replace(/([%20]+)|(_+)/g, " ");
    console.log(mainPath);

    return (
        <div>
            <h1>{mainPath}</h1>
            <h3>Not Found</h3>
        </div>
    );
}