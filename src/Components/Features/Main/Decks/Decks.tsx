import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {useSelector} from "react-redux";
import {CallType, Table} from "../Table/Table";
import {createTimer} from "../MainCommon/utils/dataHandlers";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {Search} from "../Table/Search/Search";
import {CircularProgress} from "@material-ui/core";
import {CommonModalDeckForm} from "../../ModalWindows/CommonModalDeckForm/CommonModalDeckFrom";
import {CreateDeckRequestData, UpdateDeckRequestData} from "../../../../Api/api";
import {WorkSpace} from "../MainCommon/StyledComponents/WorkSpace";
import {useActions, useModal} from "../../../Common/Hooks/hooks";
import {decksActions, getDecksRequestDC, requestStart, selectDeckState, selectStatus, selectUserID} from ".";
import {DataForRequest} from "../MainCommon/utils/dataHandlersTypes";
import { getRowItems } from "./utils/callbacks";

type SetStateType<T> = (v: T) => void

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
    const addDeckModal = useModal(false)
    const editDeckModal = useModal(false)

    const dataForRequest: DataForRequest = {
        filter: filter,
        pageNumber: visiblePage,
        user_id: userID,
        min: minValue,
        max: maxValue,
        packName
    }

    const requestTimer = createTimer(getDecksRequestDC(dataForRequest), getDecks, setTimeID, 1000)

    useEffect(() => {
        requestStart(requestTimer, timeID, status)
    }, [filter, visiblePage, minValue, maxValue, packName, userID])

    // handlers
    const decksFilter = useCallback((filter: "My" | "All") => {
        changeDecksFilter(filter)
    }, [changeDecksFilter])
    const setRangeValue = useCallback(([setValue, changeSelectedValue]: SetStateType<number>[]) => {
        return (value: number) => {
            setValue(value)
            changeSelectedValue(value)
        }
    }, [])

    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.target.value)
    }, [])

    const createDeckHandler = useCallback(async (name: string, privacy: boolean) => {
        let data: CreateDeckRequestData = {
            cardsPack: {name, private: privacy}
        }
        await createDeck(data)
        addDeckModal.close()
    }, [createDeck])
    const editDeckHandler = useCallback(async (name: string, privacy: boolean) => {
        if (selectedDeckID) {
            let data: UpdateDeckRequestData = {
                cardsPack: {_id: selectedDeckID, name, private: privacy}
            }
            await updateDeck(data)
        }
        editDeckModal.close()
    }, [updateDeck, selectedDeckID])
    // data for table
    const columns: CallType[] = [
        {title: "name", width: "230px"},
        {title: "count", width: "80px"},
        {title: "last update", width: "120px"},
        {title: "maker", width: "170px"},
        {title: "actions", width: "220px"},
    ]
    const rows = getRowItems(decks, editDeckModal.changeVisible)
    const modeBlockStyle = `${S.onBlock} ${filter === "My" ? S.myMode : S.allMode}`
    const disabled = timeID !== null || (decks?.length === 0 && filter === "My")
        || decks === null || (minValue === 0 && maxValue === 0)
    return (
        <>
            {addDeckModal.visible &&
            <CommonModalDeckForm title="Add new Deck" type="Add"
                                 setShow={addDeckModal.changeVisible} submit={createDeckHandler}/>}
            {editDeckModal.visible &&
            <CommonModalDeckForm title="Edit Deck" type="Edit"
                                 setShow={editDeckModal.changeVisible} submit={editDeckHandler}/>}
            <WorkSpace>
                <div className={Sc.settings}>
                    <div className={S.settings_container}>
                        <h3>Show decks cards</h3>
                        <div className={S.showDecks}>
                            {status === "loading"
                                ? <div><CircularProgress/></div>
                                : <>
                                    <div className={S.my} onClick={() => decksFilter("My")}>My</div>
                                    <div className={S.all} onClick={() => decksFilter("All")}>All</div>
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
                                onChangeRangeFirst={setRangeValue([setMinValue, changeMinSelected])}
                                onChangeRangeSecond={setRangeValue([setMaxValue, changeMaxSelected])}
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
                                      onClick={addDeckModal.open}>Add new deck</MyButton>
                        </div>
                        <div className={S.table_container}>
                            <Table
                                columns={columns}
                                items={rows}
                                totalCount={totalCount}
                                visiblePage={visiblePage}
                                setPage={changeVisibleDecksPage}
                            />
                        </div>
                    </div>
                </div>
            </WorkSpace>
        </>
    )
})