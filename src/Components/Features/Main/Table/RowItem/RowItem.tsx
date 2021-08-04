import React, {ReactNode} from "react";
import {CallStyleType} from "../Table";
import S from "./RowItem.module.css";
import Sr from "../TableHeader/TableHeader.module.css"

type RowItemType = {
    cells: Array<string | number | boolean | ReactNode>
    cellStyle: CallStyleType
    index: number
}
export const RowItem: React.FC<RowItemType> = props => {
    const {cellStyle, cells, index} = props
    const color = index === 0 || index % 2 !== 1 ? "deckItemGray" : "deckItemWhite"
    const renderCells = cells.map((c, i) => <div key={i} className={Sr.row}>{c}</div>)

    return <div style={cellStyle} className={`${S.rowItem} ${S[color]}`}>{renderCells}</div>
}