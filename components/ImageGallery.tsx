"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Content } from "@/utils/typeUtils";
import { removeTextToken } from "@/utils/parserUtils";

interface ImageGalleryProps {
    images: Content[];
    children: ReactNode;
}

interface ImageGalleryContextValue {
    openImage: (image: Content) => void;
}

const ImageGalleryContext = createContext<ImageGalleryContextValue | undefined>(undefined);

export function useImageGallery() {
    const context = useContext(ImageGalleryContext);
    if (!context) throw new Error("useImageGallery must be used within ImageGallery");
    return context;
}

export default function ImageGallery({ images, children }: ImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showNavigation, setShowNavigation] = useState<boolean>(true);
    const thumbnailStripRef = useRef<HTMLDivElement>(null);
    const isOpen = activeIndex !== null;
    const activeImage = activeIndex === null ? null : images[activeIndex];

    const openImage = useCallback((image: Content) => {
        const index = images.indexOf(image);
        if (index !== -1) setActiveIndex(index);
    }, [images]);

    const contextValue = useMemo(() => ({ openImage }), [openImage]);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActiveIndex(null);
            if (event.key === "ArrowLeft") {
                setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length);
            }
            if (event.key === "ArrowRight") {
                setActiveIndex((index) => index === null ? null : (index + 1) % images.length);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, images.length]);

    useEffect(() => {
        if (activeIndex === null || !thumbnailStripRef.current) return;

        const activeThumbnail = thumbnailStripRef.current.children[activeIndex] as HTMLElement | undefined;
        if (activeThumbnail) {
            thumbnailStripRef.current.scrollTo({
                left: activeThumbnail.offsetLeft - thumbnailStripRef.current.offsetLeft
                    - (thumbnailStripRef.current.clientWidth - activeThumbnail.clientWidth) / 2,
                behavior: "smooth"
            });
        }
    }, [activeIndex]);

    return (
        <ImageGalleryContext.Provider value={contextValue}>
            {children}
            {activeImage && activeIndex !== null && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Image gallery"
                        className="relative flex h-full max-h-full w-full max-w-6xl flex-col items-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            className="flex min-h-0 w-full flex-1 flex-col items-center justify-center pt-12"
                            onClick={() => setShowNavigation(!showNavigation)}
                        >
                            <img
                                src={activeImage.src}
                                alt={activeImage.desc || ""}
                                className="max-h-[calc(100vh-17rem)] max-w-full object-contain"
                            />
                            {activeImage.desc && (
                                <p className="mt-2 max-w-full text-center text-sm text-white/80">{removeTextToken(activeImage.desc || "")}</p>
                            )}
                        </div>
                        {showNavigation && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex(null)}
                                    aria-label="Close image gallery"
                                    className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-2 text-2xl leading-none text-white hover:bg-black/75 hover:text-gray-300 sm:right-4 sm:top-4"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                                <div className="w-full shrink-0 pb-2">
                                    <div className="mb-3 flex items-center justify-center gap-8 text-white">
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length)}
                                            aria-label="Previous image"
                                            className="rounded px-4 py-2 hover:bg-white/15"
                                        >
                                            <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                                        </button>
                                        <span className="min-w-12 text-center text-sm">{activeIndex + 1}/{images.length}</span>
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex((index) => index === null ? null : (index + 1) % images.length)}
                                            aria-label="Next image"
                                            className="rounded px-4 py-2 hover:bg-white/15"
                                        >
                                            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div
                                        ref={thumbnailStripRef}
                                        role="group"
                                        aria-label="Gallery thumbnails"
                                        className="flex w-full gap-2 overflow-x-auto rounded-lg border border-white/20 bg-black/50 p-2"
                                    >
                                        {images.map((image, index) => (
                                            <button
                                                key={`${image.src}-${index}`}
                                                type="button"
                                                onClick={() => setActiveIndex(index)}
                                                aria-label={`Show image ${index + 1} of ${images.length}`}
                                                aria-current={index === activeIndex ? "true" : undefined}
                                                className={`h-16 w-16 shrink-0 overflow-hidden rounded border-2 transition-opacity hover:opacity-100 ${index === activeIndex ? "border-white opacity-100" : "border-transparent opacity-60"
                                                    }`}
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={image.desc || ""}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </ImageGalleryContext.Provider>
    );
}
