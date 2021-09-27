import React, {ChangeEvent, ReactNode, useCallback, useEffect, useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {useSelector} from "react-redux";
import {CallType, Table} from "../Table/Table";
import {DataForRequest, getDecksForUI, getDecksRequestDC} from "../MainCommon/utils/dataHandlers";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {Search} from "../Table/Search/Search";
import {CircularProgress} from "@material-ui/core";
import {ActionsPanel} from "./ActionsPanel/ActionsPanel";
import {NavLink} from "react-router-dom";
import {CommonModalDeckForm} from "../../ModalWindows/CommonModalDeckForm/CommonModalDeckFrom";
import {CreateDeckRequestData, UpdateDeckRequestData} from "../../../../Api/api";
import {WorkSpace} from "../MainCommon/StyledComponents/WorkSpace";
import {selectStatus} from "../../../../Store/App/selectors";
import {selectUserID} from "../../../../Store/Auth/selectors";
import {selectDeckState} from "../../../../Store/Decks/selectors";
import {useActions} from "../../../Common/Hooks/hooks";
import {decksActions} from ".";

export const Decks = React.memo(() => {
    const decksState = useSelector(selectDeckState)
    const userID = useSelector(selectUserID)
    const status = useSelector(selectStatus)
    const {getDecks, createDeck, updateDeck, changeDecksFilter, changeVisibleDecksPage,
           changeMinSelected, changeMaxSelected} = useActions(decksActions)

    const {decks, filter, totalCount, visiblePage, minCardsCount, maxCardsCount, selectedDeckID} = decksState

    const [minValue, setMinValue] = useState<number>(minCardsCount)
    const [maxValue, setMaxValue] = useState<number>(maxCardsCount)
    const [packName, setPackName] = useState<string>("")
    const [timeID, setTimeID] = useState<number | null>(null)
    const [showAdd, setShowAdd] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)

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
            await getDecks(requestData)
            setTimeID(null)
        }, 1000)
        setTimeID(+id)
    }
    useEffect(() => {
        if (timeID && status !== "loading") {
            clearTimeout(timeID)
            requestStart()
        } else if (status !== "loading") {
            requestStart()
        }
    }, [filter, visiblePage, minValue, maxValue, packName, userID])

    // handlers
    const myModeHandler = useCallback(() => {
        changeDecksFilter("My")
    }, [changeDecksFilter])
    const allModeHandler = useCallback(() => {
        changeDecksFilter("All")
    }, [changeDecksFilter])
    const visibleDecksPageHandler = useCallback((page: number) => {
        changeVisibleDecksPage(page)
    }, [changeVisibleDecksPage])
    const setMinValueHandler = useCallback((value: number) => {
        setMinValue(value)
        changeMinSelected(value)
    }, [changeMinSelected])
    const setMaxValueHandler = useCallback((value: number) => {
        setMaxValue(value)
        changeMaxSelected(value)
    }, [changeMaxSelected])
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
        await createDeck(data)
        setShowAdd(false)
    }, [createDeck])
    const editDeckHandler = useCallback(async (name: string, privacy: boolean) => {
        if (selectedDeckID) {
            let data: UpdateDeckRequestData = {
                cardsPack: {
                    _id: selectedDeckID,
                    name,
                    private: privacy
                }
            }
            await updateDeck(data)
        }
        setShowEdit(false)
    }, [updateDeck, selectedDeckID])
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
            {showAdd &&
                <CommonModalDeckForm title="Add new Deck" type="Add"
                                     setShow={setShowAdd} submit={createDeckHandler}/>}
            {showEdit &&
                <CommonModalDeckForm title="Edit Deck" type="Edit"
                                     setShow={setShowEdit} submit={editDeckHandler}/>}
            <WorkSpace>
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
            </WorkSpace>
        </>
    )
})