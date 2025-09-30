import { type Child } from "../Table/extend/index";

type Row = {
    [key: string]: any
}

export interface Props {
    child: Child,
    row: Row[],
    propName: string
}