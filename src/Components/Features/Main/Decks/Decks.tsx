import React, {ChangeEvent, ReactNode, useCallback, useEffect, useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {changeDecksFilter, createDeck, DecksStateType, getDecks} from "../../../../Store/decks-reducer";
import {CallType, Table} from "../Table/Table";
import {DataForRequest, getDecksForUI, getDecksRequestDC} from "../MainCommon/utils/dataHandlers";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {CreateDeckRequestData} from "../../../../Api/api";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {Search} from "../Table/Search/Search";
import {CircularProgress} from "@material-ui/core";
import {ActionsPanel} from "./ActionsPanel/ActionsPanel";
import { NavLink } from "react-router-dom";

export const Decks: React.FC = props => {
    const {decks, filter, totalCount, visiblePage, minCardsCount, maxCardsCount
    } = useSelector<AppStoreType, DecksStateType>(state => state.decks)

    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()
    const [minValue, setMinValue] = useState<number>(25)
    const [maxValue, setMaxValue] = useState<number>(75)
    const [packName, setPackName] = useState<string>("")
    useEffect(() => {
        let dataForRequest: DataForRequest = {
            filter: filter,
            pageNumber: visiblePage,
            user_id: userID,
            packName
        }
        let requestData = getDecksRequestDC(dataForRequest)
        dispatch(getDecks(requestData))
    }, [visiblePage, filter, dispatch])

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
    //sort decks by cards count
    const sortHandler = useCallback(() => {
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
        },
        [dispatch, filter, userID, visiblePage, minValue, maxValue, packName])
    //search sort
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.target.value)
    }
    const enter = () => {
        let dataForRequest: DataForRequest = {
            filter: filter,
            pageNumber: visiblePage,
            user_id: userID,
            packName
        }
        let requestData = getDecksRequestDC(dataForRequest)
        dispatch(getDecks(requestData))
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
        rowItems.push([<NavLink to={"/app/cards"}>{o.name}</NavLink>, o.cards, o.lastUpdate,
            o.created, <ActionsPanel makerDeckID={o.makerDeckID} deckID={o.deckID}/>])
    })

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
                                onChangeRangeFirst={setMinValue}
                                onChangeRangeSecond={setMaxValue}
                            />
                            <MyButton disabled={status === "loading"}
                                      onClick={sortHandler} variant={"standard"}>Sort</MyButton>
                        </div>

                    </div>
                </div>
                <div className={Sc.list}>
                    <div className={S.list_container}>
                        <h2>Decks list</h2>
                        <Search onChange={searchHandler} onEnter={enter}/>
                        <Table
                            columns={columns}
                            items={rowItems}
                            totalCount={totalCount}
                        />
                        <MyButton variant={"standard"} disabled={status === "loading"}
                                  onClick={createDeckHandler}>Add new deck</MyButton>
                    </div>
                </div>
            </div>
        </div>
    )
}