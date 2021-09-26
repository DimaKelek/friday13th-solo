import React from "react";
import S from "./TableHeader.module.css";
import Sc from "../Table.module.css";
import {CallStyleType, CallType} from "../Table";

type TableHeaderProps = {
    columns: CallType[]
    callStyle: CallStyleType
}
export const TableHeader: React.FC<TableHeaderProps> = React.memo(props => {
    const {columns} = props
    const items = columns.map((c, i) => <div key={i} className={S.row}>{c.title}</div>)

    return <div className={`${S.header} ${Sc.callStyle}`}>{items}</div>
})