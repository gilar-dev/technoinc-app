interface PropTypes {
    content: string;
    style?: string;
}

export default function TextParser({ content, style = "" }: PropTypes) {
    const parsedText = (content: string): any => {
        if (!content) return [];

        const regexCombined = /(?<bold>\*\*(.*?)\*\*)|(?<underline>__(.*?)__)|(?<italic>\*(.*?)\*)|(?<dotted>_(.*?)_)|(?<link><link:(.*?)#(.*?)>)/g;
        const elements: React.ReactNode[] = [];
        let lastIndex: number = 0;

        const matches = Array.from(content.matchAll(regexCombined));
        matches.forEach((match, index) => {
            const matchString = match[0];
            const matchIndex = match.index ?? 0;
            const groups = match.groups;

            if (matchIndex > lastIndex) {
                elements.push(content.substring(lastIndex, matchIndex));
            }

            if (groups?.bold) {
                const cleanText = match[2];
                elements.push(
                    <strong key={`b-${index}`} className="font-semibold">{parsedText(cleanText)}</strong>
                );
            } else if (groups?.underline) {
                const cleanText = match[4];
                elements.push(
                    <u key={`u-${index}`}>{parsedText(cleanText)}</u>
                );
            } else if (groups?.italic) {
                const cleanText = match[6];
                elements.push(
                    <em key={`i-${index}`}>{parsedText(cleanText)}</em>
                );
            } else if (groups?.dotted) {
                const cleanText = match[8];
                elements.push(
                    <span key={`d-${index}`} className="border-0 border-b border-dotted">{parsedText(cleanText)}</span>
                );
            } else if (groups?.link) {
                const linkLabel = match[10];
                const linkUrl = match[11];
                elements.push(
                    <a
                        key={`l-${index}`}
                        href={linkUrl} target={linkUrl.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener nooferrer"
                        className="font-medium text-link hover:underline"
                    >
                        {parsedText(linkLabel)}
                    </a>
                );
            }

            lastIndex = matchIndex + matchString.length;
        });

        if (lastIndex < content.length) {
            elements.push(content.substring(lastIndex));
        }

        return elements;
    }

    return (
        <span className={style}>{parsedText(content)}</span>
    );
}