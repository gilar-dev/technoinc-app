import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import ThemeProvider from "@/contexts/ThemeProvider";
import SidebarProvider from "@/contexts/SidebarProvider";
import ArticleDataProvider from "@/contexts/ArticleDataProvider";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"]
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"]
});

export const viewport: Viewport = {
    themeColor: "background"
};

export const metadata: Metadata = {
    title: "TechnoInc MC Wiki",
    description: "A free documented Minecraft encyclopedia for TechnoInc survival world.",
    metadataBase: new URL("https://technoinc.world")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className="h-full antialiased"
            suppressHydrationWarning
        >
            <body className={`${inter.variable} ${montserrat.variable} overflow-auto`}>
                <ThemeProvider>
                    <SidebarProvider>
                        <ArticleDataProvider>
                            {children}
                        </ArticleDataProvider>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html >
    );
}