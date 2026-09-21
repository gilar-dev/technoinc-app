interface SidebarModifyProps {
    modifyLogs: ["add" | "move" | "delete", string][];
}

const actionDetails = {
    add: { label: "Added", icon: "fa-plus", color: "text-green-500" },
    move: { label: "Moved", icon: "fa-up-down", color: "text-blue-500" },
    delete: { label: "Deleted", icon: "fa-minus", color: "text-red-500" },
} as const;

function formatBlockName(blockType: string): string {
    return blockType.split("-").map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
}

export default function SidebarModifyLogs({ modifyLogs }: SidebarModifyProps) {
    return (
        <div className="mx-1 mb-5">
            <input id="modify-log-label" type="checkbox" className="peer hidden" />
            <label
                htmlFor="modify-log-label"
                className="p-2 cursor-pointer flex justify-between items-center rounded-[10px] border border-sidebar-border bg-sidebar-panel peer-checked:[&>*:last-child]:rotate-180"
            >
                <span>Modify logs</span>
                <span className="transition-transform duration-150 ease-in-out"><i className="fa-solid fa-angle-up"></i></span>
            </label>
            <div className="max-h-96 overflow-hidden peer-checked:max-h-0 peer-checked:p-0 transition-[max-height] duration-150 ease-in-out">
                <ul className="m-3 flex flex-col gap-1 [&_a]:cursor-pointer [&_a]:rounded-[5px] [&_a]:hover:bg-sidebar-hover">
                    {modifyLogs.map((log, index) => (
                        <li key={`log-${index}`} className="rounded-[5px] py-1.5 hover:bg-sidebar-hover">
                            {(() => {
                                const [action, blockType] = log;
                                const details = actionDetails[action];

                                return (
                                    <div className="flex items-center gap-1 text-[0.9em]">
                                        <span className={`flex w-5 justify-center ${details.color}`}>
                                            <i className={`fa-solid ${details.icon}`} aria-hidden="true"></i>
                                        </span>
                                        <span>
                                            <span className={`font-semibold ${details.color}`}>{details.label}</span>{" "}
                                            <span>{formatBlockName(blockType)}</span>
                                        </span>
                                    </div>
                                );
                            })()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}