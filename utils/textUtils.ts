export function formattedText(text: string): string {
    return text.trim().replace(/( +)/g, "_");
}

export function cleanText(text: string): string {
    return text.replaceAll("_"," ");
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}