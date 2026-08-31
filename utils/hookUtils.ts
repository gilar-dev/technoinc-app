import { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number = 700): string {
    const [debounceValue, setDebounceValue] = useState<string>(value);

    useEffect(() => {
        const timer = setTimeout(() => { setDebounceValue(value); }, delay);
        return () => { clearTimeout(timer); }
    }, [value, delay]);

    return debounceValue;
}