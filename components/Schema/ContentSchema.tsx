"use client"; // Client-side rendering directive for Next.js

import { Schema } from "@/utils/typeUtils";

interface ContentSchemaProps {
    wikiContent?: Schema | undefined;
}

export default function ContentSchema({ wikiContent = undefined }: ContentSchemaProps) { }