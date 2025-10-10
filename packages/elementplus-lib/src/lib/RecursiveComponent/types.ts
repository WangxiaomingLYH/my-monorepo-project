import { type Child } from "../Table/type";

type Row = {
    [key: string]: any
}

export interface Props {
    child: Child,
    row: Row[],
    propName: string
}