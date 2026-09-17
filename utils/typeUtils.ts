import { Dispatch, SetStateAction } from "react";

export type CSON = { [key: string]: any; }
export type Content = { [key: string]: any; };
export type Schema = Content[];
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type Classification = "start" | "ga" | "fa";
export type EditPermission = "free" | "strict";

export interface History {
    user: string;
    sum: string;
    date: string;
    m_logs: [("add" | "move" | "delete"), string];
}