import React, {useEffect, useState} from "react";
import S from "./DecksTable.module.css"
import {useDispatch, useSelector} from "react-redux";
import {DecksStateType, getDecks} from "../../../../../Store/decks-reducer";
import {AppStoreType} from "../../../../../Store/store";
import {getDecksForUI} from "../../MainCommon/utils/dataHandlers";
import {DeckItem} from "./DeckItem/DeckItem";
import {PaginationControlled} from "./Pagination/Pagination";
import {RequestStatusType} from "../../../../../Store/app-reducer";
import {CircularProgress} from "@material-ui/core";
import {DeckType} from "../../../../../Api/api";

type DecksTablePropsType = {
    status: RequestStatusType
    totalCount: number
    decks: DeckType[] | null
}

export const DecksTable: React.FC<DecksTablePropsType> = props => {
    const {status, decks, totalCount} = props

    const dispatch = useDispatch()
    const [visiblePage, setVisiblePage] = useState<number>(1)

    useEffect(() => {
        dispatch(getDecks(visiblePage))
    }, [visiblePage, dispatch])

    const deckItems = getDecksForUI(decks)?.map((d, i) => {
        return (
            <DeckItem
                key={i}
                name={d.name}
                cards={d.cards}
                lastUpdate={d.lastUpdate}
                created={d.created}
                index={i}
            />
        )
    })

    return (
        <div>
            <div className={S.table}>
                <div className={S.header}>
                    <div className={S.name}>Name</div>
                    <div className={S.cards}>Cards</div>
                    <div className={S.update}>Last Update</div>
                    <div className={S.created}>Created by</div>
                    <div className={S.actions}>Actions</div>
                </div>
                {status === "loading"
                    ? <div className={S.circular_box}><CircularProgress/></div>
                    : deckItems
                }
            </div>
            <div className={S.pagination}>
                <PaginationControlled
                    page={visiblePage}
                    setPage={setVisiblePage}
                    totalCount={totalCount}
                />
            </div>
        </div>
    )
}