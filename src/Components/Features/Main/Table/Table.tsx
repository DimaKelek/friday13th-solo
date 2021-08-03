import {RenderDeckType} from "../MainCommon/utils/dataHandlers";
import React from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import S from "./Table.module.css";
import {SearchWithButton} from "./SearchWithButton/SearchWithButton";
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
    title: string
    columns: CallType[]
    items: RenderDeckType[] | null
    visiblePage: number
    setVisiblePage: (visiblePage: number) => void
    totalCount: number
}

export const Table: React.FC<TablePropsType> = props => {
    const {title, columns, items, totalCount, setVisiblePage, visiblePage} = props
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)

    const callStyle = {
        display: "grid",
        gridTemplateColumns: columns.map(c => c.width).join(" ")
    }
    return (
        <div className={S.table}>
            <h2>{title}</h2>
            <SearchWithButton status={status} buttonTitle="Add new deck"/>
            <div className={S.tableBody}>
                <TableHeader columns={columns} callStyle={callStyle}/>
                {status === "loading"
                    ? <div className={S.circular_box}><CircularProgress/></div>
                    : <TableBody callStyle={callStyle} items={items}/>
                }
            </div>
            <div className={S.pagination}>
                <PaginationControlled page={visiblePage} setPage={setVisiblePage} totalCount={totalCount} />
            </div>
        </div>
    )
}