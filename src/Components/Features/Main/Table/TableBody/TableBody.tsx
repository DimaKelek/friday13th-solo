import React, {ReactNode} from "react";
import S from "./TableBody.module.css";
import {CallStyleType} from "../Table";
import {RowItem} from "../RowItem/RowItem";

type TableBodyProps = {
    cellStyle: CallStyleType
    items: (Array<string | number | boolean | ReactNode>)[]
}
export const TableBody: React.FC<TableBodyProps> = React.memo(props => {
    const {cellStyle, items} = props

    const rowItems = items.map((item, i) => <RowItem key={i} cells={item} cellStyle={cellStyle} index={i}/>)
    return <div className={S.body}>{rowItems}</div>
})