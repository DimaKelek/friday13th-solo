import React, {ChangeEvent, ReactNode, useCallback, useEffect, useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {
    changeDecksFilter,
    changeMaxSelected,
    changeMinSelected,
    changeVisibleDecksPage,
    createDeck,
    DecksStateType,
    getDecks,
    updateDeck
} from "../../../../Store/decks-reducer";
import {CallType, Table} from "../Table/Table";
import {DataForRequest, getDecksForUI, getDecksRequestDC} from "../MainCommon/utils/dataHandlers";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {RequestStatusType, setNeedUpdate} from "../../../../Store/app-reducer";
import {Search} from "../Table/Search/Search";
import {CircularProgress} from "@material-ui/core";
import {ActionsPanel} from "./ActionsPanel/ActionsPanel";
import {NavLink} from "react-router-dom";
import {CommonModalDeckForm} from "../../ModalWindows/CommonModalDeckForm/CommonModalDeckFrom";
import {CreateDeckRequestData, UpdateDeckRequestData} from "../../../../Api/api";

export const Decks: React.FC = props => {
    const decksState = useSelector<AppStoreType, DecksStateType>(state => state.decks)
    const userID     = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const status     = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const needUpdate = useSelector<AppStoreType, boolean>(state => state.app.needUpdate)
    const dispatch   = useDispatch()

    const {decks, filter, totalCount, visiblePage, minCardsCount, maxCardsCount, selectedDeckID} = decksState

    const [minValue, setMinValue] = useState<number>(minCardsCount)
    const [maxValue, setMaxValue] = useState<number>(maxCardsCount)
    const [packName, setPackName] = useState<string>("")
    const [timeID, setTimeID]     = useState<number | null>(null)
    const [showAdd, setShowAdd]   = useState<boolean>(false)
    const [showEdit, setShowEdit]   = useState<boolean>(false)

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
        }, 1000)
        setTimeID(+id)
    }

    useEffect(() => {
        if (needUpdate && status !== "loading") {
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
    useEffect(() => {
        if (timeID && status !== "loading") {
            clearTimeout(timeID)
            requestStart()
        } else if (status !== "loading") {
            requestStart()
        } else {
            dispatch(setNeedUpdate(true))
        }
    }, [filter, visiblePage, dispatch, minValue, maxValue, packName, userID])

    // handlers

    const myModeHandler = useCallback(() => {
        dispatch(changeDecksFilter("My"))
    }, [dispatch])
    const allModeHandler = useCallback(() => {
        dispatch(changeDecksFilter("All"))
    }, [dispatch])
    const visibleDecksPageHandler = useCallback((page: number) => {
        dispatch(changeVisibleDecksPage(page))
    }, [dispatch])
    const setMinValueHandler = useCallback((value: number) => {
        setMinValue(value)
        dispatch(changeMinSelected(value))
    }, [dispatch])
    const setMaxValueHandler = useCallback((value: number) => {
        setMaxValue(value)
        dispatch(changeMaxSelected(value))
    }, [dispatch])
    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.target.value)
    }, [])
    const onCreateDeckClick = useCallback(() => {
        setShowAdd(true)
    }, [])

    const createDeckHandler = useCallback(async (name: string, privacy: boolean) => {
        let data: CreateDeckRequestData = {
            cardsPack: {
                name,
                private: privacy
            }
        }
        await dispatch(createDeck(data))
        setShowAdd(false)
    }, [dispatch])
    const editDeckHandler = useCallback(async (name: string, privacy: boolean) => {
        if (selectedDeckID) {
            let data: UpdateDeckRequestData = {
                cardsPack: {
                    _id: selectedDeckID,
                    name,
                    private: privacy
                }
            }
            await dispatch(updateDeck(data))
        }
        setShowEdit(false)
    }, [dispatch, selectedDeckID])
    // data for table
    const columns: CallType[] = [
        {title: "name", width: "230px"},
        {title: "count", width: "80px"},
        {title: "last update", width: "120px"},
        {title: "maker", width: "170px"},
        {title: "actions", width: "220px"},
    ]
    const rowItems: (Array<string | number | boolean | ReactNode>)[] = []
    getDecksForUI(decks)?.forEach(o => {
        rowItems.push(
            [<NavLink to={`/app/cards/${o.deckID}`}>{o.name}</NavLink>,
                o.cards, o.lastUpdate, o.created,
                <ActionsPanel makerDeckID={o.makerDeckID} deckID={o.deckID} setEdit={setShowEdit}/>
            ]
        )
    })

    const modeBlockStyle = `${S.onBlock} ${filter === "My" ? S.myMode : S.allMode}`
    const disabled = timeID !== null
        || (decks?.length === 0 && filter === "My")
        || decks === null
        || (minValue === 0 && maxValue === 0)
    return (
        <>
            {showAdd && <CommonModalDeckForm title="Add new Deck"
                                             type="Add"
                                             setShow={setShowAdd}
                                             submit={createDeckHandler}
            />}
            {showEdit && <CommonModalDeckForm title="Edit Deck"
                                              type="Edit"
                                              setShow={setShowEdit}
                                              submit={editDeckHandler}
            />}
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
                            <div className={S.search_container}>
                                <Search onChange={searchHandler}/>
                                <MyButton variant={"standard"} disabled={status === "loading"}
                                          onClick={onCreateDeckClick}>Add new deck</MyButton>
                            </div>
                            <div className={S.table_container}><Table
                                columns={columns}
                                items={rowItems}
                                totalCount={totalCount}
                                visiblePage={visiblePage}
                                setPage={visibleDecksPageHandler}
                            /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}