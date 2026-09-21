import type { History, ModifyLogs } from "@/utils/typeUtils";

interface HistoryGroup {
    date: string;
    revisions: History[];
}

const actionDetails = {
    add: { label: "Added", icon: "fa-plus", color: "text-green-500" },
    move: { label: "Moved", icon: "fa-up-down", color: "text-blue-500" },
    delete: { label: "Deleted", icon: "fa-minus", color: "text-red-500" },
} as const;

function formatBlockName(blockType: string): string {
    return blockType
        .replaceAll("-", " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatDate(date: string): string {
    const [datePart] = date.split(", ");
    const [year, month, day] = datePart.split("/").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (Number.isNaN(parsedDate.getTime())) return datePart;
    return parsedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export function formatTime(date: string): string {
    const [, timePart = ""] = date.split(", ");
    const [hour = "", minute = ""] = timePart.split(":");
    return hour && minute ? `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}` : timePart;
}

export function groupHistory(history: History[]): HistoryGroup[] {
    const groups = new Map<string, History[]>();

    [...history].reverse().forEach((revision) => {
        const key = revision.date.split(", ")[0];
        const revisions = groups.get(key) ?? [];
        revisions.push(revision);
        groups.set(key, revisions);
    });

    return Array.from(groups, ([date, revisions]) => ({ date, revisions }));
}

export function ModifyLogList({ logs }: { logs: ModifyLogs }) {
    if (logs.length === 0) return null;

    return (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border/60 pt-3 text-sm">
            {logs.map(([action, blockType], index) => {
                const details = actionDetails[action];

                return (
                    <li key={`${action}-${blockType}-${index}`} className="flex items-center gap-2">
                        <i className={`fa-solid ${details.icon} ${details.color}`} aria-hidden="true"></i>
                        <span>
                            <span className={`font-semibold ${details.color}`}>{details.label}</span>{" "}
                            {formatBlockName(blockType)}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}