import React, {ChangeEvent, ReactNode, useEffect, useState} from "react";
import S from "./Cards.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {CallType, Table} from "../Table/Table";
import {Search} from "../Table/Search/Search";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {
    CardsStateType,
    changeVisibleCardPage,
    createCard,
    CreateCardData,
    getCards
} from "../../../../Store/cards-reducer";
import {getCardsForUI} from "../MainCommon/utils/dataHandlers";
import {GetCardsRequestDataType} from "../../../../Api/api";
import {NavLink, useParams} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {CardActionsPanel} from "./ActionsPanel/ActionsPanel";
import {MyModal} from "../../ModalWindows/Modal/MyModal";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyTextarea} from "../../../Common/MyTextarea/MyTextarea";
import {useFormik} from "formik";
import {AddCardModal} from "../../ModalWindows/AddCardModal/AddCardModal";



export const Cards: React.FC = () => {
    const {cards, cardsTotalCount, visiblePage, packUserId} = useSelector<AppStoreType, CardsStateType>(state => state.cards)
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const {deckID} = useParams<{deckID: string}>()
    const dispatch = useDispatch()

    const [question, setQuestion] = useState<string>("")
    const [timeID, setTimeID] = useState<number | null>(null)

    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>("")
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [showAdd, setShowAdd] = useState<boolean>(false)

    const requestStart = () => {
        let id = setTimeout(async () => {
            let requestData: GetCardsRequestDataType = {
                cardQuestion: question,
                cardsPack_id: deckID,
                pageNumber: visiblePage
            }
            await dispatch(getCards(requestData))
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
    }, [deckID, visiblePage, question])

    const visibleCardPageHandler = (page: number) => {
        dispatch(changeVisibleCardPage(page))
    }
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value)
    }
    const addNewCardHandler = () => {
        // const params: CreateCardData = {
        //     data: {
        //         answer: "Kelek answer",
        //         question: "Kelek question",
        //         cardsPack_id: deckID,
        //         grade: 0,
        //         answerImg: "",
        //         answerVideo: "",
        //         questionImg: "",
        //         questionVideo: "",
        //         rating: 0,
        //         shots: 0,
        //         type: "card"
        //     },
        //     deckID
        // }
        // dispatch(createCard(params))
        setShowAdd(true)
    }
    const showAnswerCallback = (answer: string) => {
        setShowAnswer(true)
        setAnswer(answer)
    }

    // data for table
    const columns: CallType[] = [
        {title: "question", width: "2fr"},
        {title: "Answer", width: "0.5fr"},
        {title: "last update", width: "0.5fr"},
        {title: "grade", width: "0.5fr"},
        {title: "actions", width: "1fr"},
    ]
    const rows: (Array<string | number | boolean | ReactNode>)[] = []
    getCardsForUI(cards)?.forEach(c => {
        rows.push([c.question, <span onClick={() => showAnswerCallback(c.answer)} className={S.showAnswer}>Show</span>, c.lastUpdate, c.grade,
            <CardActionsPanel setEdit={setShowEdit} makerDeckID={packUserId} deckID={deckID} cardID={c.cardID}/>])
    })

    return (
        <>
            {showAdd && <AddCardModal setShowAdd={setShowAdd}/>}
            {showAnswer &&
                <MyModal closeModal={() => setShowAnswer(false)}
                         title={"Answer for your question!!"} width="350px"
                >{answer}
                </MyModal>
            }
            {showEdit &&
                <MyModal closeModal={()=> setShowEdit(false)}
                         title={"Edit your card"} width="350px" height="450px"
                >edit card form
                </MyModal>
            }

            <div className={Sc.workSpace}>
                <div className={Sc.workSpace_container}>
                    <div className={S.cards}>
                        <div className={S.title}>
                            <NavLink to={"/app/decks"}>&#129044;</NavLink>
                            <h2>Cards list</h2>
                        </div>
                        <div className={S.search}>
                            <Search onChange={searchHandler}/>
                            {userID === packUserId &&
                            <MyButton onClick={addNewCardHandler} variant={"standard"}
                                      disabled={status === "loading"}>Add New Card</MyButton>
                            }
                        </div>
                        <Table
                            columns={columns}
                            items={rows}
                            totalCount={cardsTotalCount}
                            visiblePage={visiblePage}
                            setPage={visibleCardPageHandler}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}