import TextParser from "./TextParser";
import type { CSON } from "@/utils/typeUtils";

interface WikiRendererProps {
    block: CSON;
}

export default function WikiRenderer({ block }: WikiRendererProps) {
    switch (block.type) {
        // General content block types
        case "gen-heading-type":
            return (
                <h1
                    id={block.heading.replaceAll(" ", "_")}
                    className="scroll-mt-20 font-historical font-medium text-[26px]"
                >
                    {block.heading}
                </h1>
            );
        case "gen-subheading-type":
            return (
                <h2
                    id={block.subheading.replaceAll(" ", "_")}
                    className="scroll-mt-20 mb-2 font-['Inter'] font-semibold text-[18px]"
                >
                    {block.subheading}
                </h2>
            );
        case "gen-paragraph-type":
            return (
                <p className="mb-3 font-['Inter'] font-normal text-[15px] leading-relaxed whitespace-pre-wrap">
                    <TextParser content={block.text} />
                </p>
            );
        case "gen-image-type":
            return (
                <div className="p-3 whitespace-pre-wrap flex justify-center items-center">
                    <div className="min-w-[60%] max-w-[90%] max-h-[22em] p-1 flex flex-col items-center gap-1">
                        <div className="overflow-hidden cursor-pointer relative">
                            <img
                                src={block.src || undefined}
                                alt={block.description}
                                className="w-full transition-transform ease-in-out duration-500 hover:scale-[110%]"
                            />
                            <span className="p-1.25 text-[10px] absolute bottom-2 right-2 self-end rounded-full text-white bg-black/50">
                                <i className="fa-regular fa-clone"></i>
                            </span>
                        </div>
                        <TextParser content={block.description} style="font-[400] text-[.75em] tracking-wide" />
                    </div>
                </div>
            );
        // Infobox content block types
        case "ib-heading-type":
            return (
                <div className="font-['Inter'] font-medium text-[1.25em] text-center whitespace-pre-wrap">
                    <TextParser content={block.heading} />
                </div>
            );
        case "ib-subheading-type":
            return (
                <div className="mt-5 p-3 border-t border-[rgb(85,85,85)]">
                    <h4 className="font-bold text-center">
                        <span className="highlight">{block.subheading}</span>
                    </h4>
                </div>
            );
        case "ib-info-type":
            return (
                <div className="py-1 font-['Inter'] flex justify-between gap-3">
                    <div className="w-full">
                        <h5 className="font-['Inter'] text-[0.9em] font-bold whitespace-pre-wrap">
                            <TextParser content={block.head} />
                        </h5>
                    </div>
                    <div className="w-full">
                        <div className="font-['Inter'] text-[0.9em] leading-relaxed whitespace-pre-wrap">
                            <TextParser content={block.data} />
                        </div>
                    </div>
                </div>
            );
        case "ib-image-type":
            return (
                <div className="whitespace-pre-wrap flex justify-center items-center">
                    <div className="p-1 flex flex-col items-center gap-1 md:p-3">
                        <div className="min-w-[50vw] max-w-full overflow-hidden cursor-pointer relative md:min-w-[25vw]">
                            <img
                                src={block.src || null}
                                alt={block.description}
                                className="w-full transition-transform ease-in-out duration-500 hover:scale-[110%]"
                            />
                            <span className="p-1.25 text-[10px] absolute bottom-2 right-2 self-end rounded-full text-white bg-black/50">
                                <i className="fa-regular fa-clone"></i>
                            </span>
                        </div>
                        <TextParser content={block.description} style="font-[400] text-[0.85em] tracking-wide" />
                    </div>
                </div>
            );
        default:
            return (<></>);
    }
}