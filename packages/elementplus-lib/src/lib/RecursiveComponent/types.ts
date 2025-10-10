import { type Child } from "../Table/extend";

type Row = {
    [key: string]: any
}

export interface Props {
    child: Child,
    row: Row[],
    propName: string
}