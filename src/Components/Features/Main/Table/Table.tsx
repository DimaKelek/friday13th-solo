import {RenderDeckType} from "../MainCommon/utils/dataHandlers";
import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import S from "./Table.module.css";
import {Search} from "./Search/Search";
import {TableHeader} from "./TableHeader/TableHeader";
import {TableBody} from "./TableBody/TableBody"
import { PaginationControlled } from "./Pagination/Pagination";
import {CircularProgress} from "@material-ui/core";

export type CallType = {
    title: string | React.ReactNode
    width: string
}

export type CallStyleType = {
    display: string
    gridTemplateColumns: string
}

type TablePropsType = {
    columns: CallType[]
    items: (Array<string | number | boolean | ReactNode>)[]
    totalCount: number
}

export const Table: React.FC<TablePropsType> = props => {
    const {columns, items, totalCount} = props
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const visiblePage = useSelector<AppStoreType, number>(state => state.decks.visiblePage)
    const cellStyle = {
        display: "grid",
        gridTemplateColumns: columns.map(c => c.width).join(" ")
    }
    return (
        <div className={S.table}>
            <div className={S.tableBody}>
                <TableHeader columns={columns} callStyle={cellStyle}/>
                {status === "loading"
                    ? <div className={S.circular_box}><CircularProgress/></div>
                    : <TableBody cellStyle={cellStyle} items={items}/>
                }
            </div>
            <div className={S.pagination}>
                <PaginationControlled page={visiblePage} totalCount={totalCount} />
            </div>
        </div>
    )
}