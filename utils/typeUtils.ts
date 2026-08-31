import { Dispatch, SetStateAction } from "react";

export type CSON = { [key: string]: any; }
export type Content = { [key: string]: any; };
export type Schema = Content[];
export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface History {
    user: string;
    summary: string;
    date: string;
    modify_logs: {
        status: "add" | "move" | "delete";
        block: string;
    }
}