import React, {ChangeEvent, ReactNode, useEffect, useState} from "react";
import S from "./Cards.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {CallType, Table} from "../Table/Table";
import {Search} from "../Table/Search/Search";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {CardsStateType, changeVisibleCardPage, createCard, getCards} from "../../../../Store/cards-reducer";
import {getCardsForUI} from "../MainCommon/utils/dataHandlers";
import {CreateCardDataType, GetCardsRequestDataType} from "../../../../Api/api";
import {NavLink, Redirect} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {CardActionsPanel} from "./ActionsPanel/ActionsPanel";

export const Cards: React.FC = props => {
    const {cards, cardsTotalCount, visiblePage, packUserId
    } = useSelector<AppStoreType, CardsStateType>(state => state.cards)
    const deckID = useSelector<AppStoreType, string>(state => state.decks.selectedDeckID)
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()
    const [question, setQuestion] = useState<string>("")
    const [timeID, setTimeID] = useState<number | null>(null)
    const requestStart = () => {
        let id = setTimeout(async () => {
            let requestData: GetCardsRequestDataType = {
                cardQuestion: question,
                cardsPack_id: deckID,
                pageNumber: visiblePage
            }
            dispatch(getCards(requestData))
            setTimeID(null)
        }, 500)
        setTimeID(+id)
    }
    useEffect(() => {
        if(deckID !== "") {
            if (timeID) {
                clearTimeout(timeID)
                requestStart()
            } else {
                requestStart()
            }
        }
    }, [deckID, visiblePage, dispatch, question])

    const visibleCardPageHandler = (page: number) => {
        dispatch(changeVisibleCardPage(page))
    }
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value)
    }
    const addNewCardHandler = () => {
        let requestData: CreateCardDataType = {
            card: {
                answer: "Kelek answer",
                question: "Kelek question",
                cardsPack_id: deckID,
                grade: 0,
                answerImg: "",
                answerVideo: "",
                questionImg: "",
                questionVideo: "",
                rating: 0,
                shots: 0,
                type: "card"
            }
        }
        dispatch(createCard(requestData))
    }
    // data for table
    const columns: CallType[] = [
        {title: "question", width: "2.5fr"},
        {title: "Answer", width: "2.5fr"},
        {title: "last update", width: "1.5fr"},
        {title: "grade", width: "1.5fr"},
        {title: "actions", width: "1.5fr"},
    ]
    const rows: (Array<string | number | boolean | ReactNode>)[] = []
    getCardsForUI(cards)?.forEach(c => {
        rows.push([c.question, c.answer, c.lastUpdate, c.grade,
            <CardActionsPanel makerDeckID={packUserId} deckID={deckID} cardID={c.cardID}/>])
    })

    if(deckID === "") {
        return <Redirect to={"/app/decks"}/>
    }
    return (
        <div className={Sc.workSpace}>
            <div className={Sc.workSpace_container}>
                <div className={S.cards}>
                    <h2>Cards list</h2>
                    <Search onChange={searchHandler}/>
                    <Table
                        columns={columns}
                        items={rows}
                        totalCount={cardsTotalCount}
                        visiblePage={visiblePage}
                        setPage={visibleCardPageHandler}
                    />
                    <NavLink className={S.arrow} to={"/app/decks"}>&#129044;</NavLink>
                    {userID === packUserId &&
                        <MyButton onClick={addNewCardHandler} className={S.button} variant={"standard"}
                                  disabled={status === "loading"}>Add New Card</MyButton>
                    }
                </div>
            </div>
        </div>
    )
}