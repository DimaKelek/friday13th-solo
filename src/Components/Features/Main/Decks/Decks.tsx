import React, {ChangeEvent, ReactNode, useCallback, useEffect, useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {
    changeDecksFilter,
    changeMaxSelected, changeMinSelected,
    createDeck,
    DecksStateType,
    getDecks,
    setDeckID
} from "../../../../Store/decks-reducer";
import {CallType, Table} from "../Table/Table";
import {DataForRequest, getDecksForUI, getDecksRequestDC} from "../MainCommon/utils/dataHandlers";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {CreateDeckRequestData} from "../../../../Api/api";
import {RequestStatusType, setNeedUpdate} from "../../../../Store/app-reducer";
import {Search} from "../Table/Search/Search";
import {CircularProgress} from "@material-ui/core";
import {ActionsPanel} from "./ActionsPanel/ActionsPanel";
import {NavLink} from "react-router-dom";
import {changeVisibleDecksPage} from "../../../../Store/decks-reducer";

export const Decks: React.FC = props => {
    const {decks, filter, totalCount, visiblePage, minCardsCount, maxCardsCount, minSelectedCardsCount,
        maxSelectedCardsCount} = useSelector<AppStoreType, DecksStateType>(state => state.decks)
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const needUpdate = useSelector<AppStoreType, boolean>(state => state.app.needUpdate)
    const dispatch = useDispatch()

    const [minValue, setMinValue] = useState<number>(minSelectedCardsCount ?? 0)
    const [maxValue, setMaxValue] = useState<number>(maxSelectedCardsCount ?? 100)
    const setMinValueHandler = (value: number) => {
        setMinValue(value)
        dispatch(changeMinSelected(value))
    }
    const setMaxValueHandler = (value: number) => {
        setMaxValue(value)
        dispatch(changeMaxSelected(value))
    }

    const [packName, setPackName] = useState<string>("")
    const [timeID, setTimeID] = useState<number | null>(null)
    useEffect(() => {
        if(needUpdate && status !== "loading") {
            let dataForRequest: DataForRequest = {
                filter: filter,
                pageNumber: visiblePage,
                user_id: userID,
                min: minValue,
                max: maxValue,
                packName
            }
            let requestData = getDecksRequestDC(dataForRequest)
            dispatch(getDecks(requestData))
            dispatch(setNeedUpdate(false))
        }
    }, [needUpdate, status])
    const requestStart = () => {
        let id = setTimeout(async () => {
            let dataForRequest: DataForRequest = {
                filter: filter,
                pageNumber: visiblePage,
                user_id: userID,
                min: minValue,
                max: maxValue,
                packName
            }
            let requestData = getDecksRequestDC(dataForRequest)
            await dispatch(getDecks(requestData))
            setTimeID(null)
        }, 500)
        setTimeID(+id)
    }
    useEffect(() => {
        if (timeID && status !== "loading") {
            clearTimeout(timeID)
            requestStart()
        } else if(status !== "loading"){
            requestStart()
        } else {
            dispatch(setNeedUpdate(true))
        }
    }, [filter, visiblePage, dispatch, minValue, maxValue, packName, userID])

    const modeBlockStyle = `${S.onBlock} ${filter === "My" ? S.myMode : S.allMode}`

    // handlers
    const createDeckHandler = useCallback(() => {
        let data: CreateDeckRequestData = {
            cardsPack: {
                name: "Kelek Deck",
                private: false,
                deckCover: ""
            }
        }
        dispatch(createDeck(data))
    }, [dispatch])
    const myModeHandler = useCallback(() => {
        dispatch(changeDecksFilter("My"))
    }, [dispatch])
    const allModeHandler = useCallback(() => {
        dispatch(changeDecksFilter("All"))
    }, [dispatch])
    const visibleDecksPageHandler = (page: number) => {
        dispatch(changeVisibleDecksPage(page))
    }

    //search sort
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.target.value)
    }
    // data for table
    const columns: CallType[] = [
        {title: "name", width: "200px"},
        {title: "count", width: "1fr"},
        {title: "last update", width: "2fr"},
        {title: "maker", width: "2fr"},
        {title: "actions", width: "220px"},
    ]
    const rowItems: (Array<string | number | boolean | ReactNode>)[] = []
    getDecksForUI(decks)?.forEach(o => {
        rowItems.push([<NavLink to={`/app/cards/${o.deckID}`}>{o.name}</NavLink>, o.cards, o.lastUpdate,
            o.created, <ActionsPanel makerDeckID={o.makerDeckID} deckID={o.deckID}/>])
    })
    const disabled = timeID !== null || (decks?.length === 0 && filter === "My")
        || decks === null || (minValue === 0 && maxValue === 0)
    return (
        <div className={Sc.workSpace}>
            <div className={Sc.workSpace_container}>
                <div className={Sc.settings}>
                    <div className={S.settings_container}>
                        <h3>Show decks cards</h3>
                        <div className={S.showDecks}>
                            {status === "loading"
                                ? <div><CircularProgress/></div>
                                : <>
                                    <div className={S.my} onClick={myModeHandler}>My</div>
                                    <div className={S.all} onClick={allModeHandler}>All</div>
                                    <div className={modeBlockStyle}>{filter}</div>
                                </>
                            }
                        </div>
                        <h3>Number of cards</h3>
                        <div className={S.range}>
                            <MyDoubleRange
                                value={[minValue, maxValue]}
                                min={minCardsCount}
                                max={maxCardsCount}
                                onChangeRangeFirst={setMinValueHandler}
                                onChangeRangeSecond={setMaxValueHandler}
                                disabled={disabled}
                            />
                        </div>

                    </div>
                </div>
                <div className={Sc.list}>
                    <div className={S.list_container}>
                        <h2>Decks list</h2>
                        <Search onChange={searchHandler} />
                        <Table
                            columns={columns}
                            items={rowItems}
                            totalCount={totalCount}
                            visiblePage={visiblePage}
                            setPage={visibleDecksPageHandler}
                        />
                        <MyButton variant={"standard"} disabled={status === "loading"}
                                  onClick={createDeckHandler}>Add new deck</MyButton>
                    </div>
                </div>
            </div>
        </div>
    )
}