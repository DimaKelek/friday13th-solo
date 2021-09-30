import React, {ChangeEvent, ReactNode, useCallback, useEffect, useState} from "react";
import S from "./Cards.module.css"
import {CallType, Table} from "../Table/Table";
import {Search} from "../Table/Search/Search";
import {useSelector} from "react-redux";
import {getCardsForUI} from "../MainCommon/utils/dataHandlers";
import {GetCardsRequestDataType, UpdateCardRequestType} from "../../../../Api/api";
import {NavLink, useParams} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {CardActionsPanel} from "./ActionsPanel/ActionsPanel";
import {MyModal} from "../../ModalWindows/Modal/MyModal";
import {CommonModalCardForm} from "../../ModalWindows/CommanModalCardFrom/CommanModalCardForm";
import {Rating} from "./Rating/Rating";
import {WorkSpace} from "../MainCommon/StyledComponents/WorkSpace";
import {useActions} from "../../../Common/Hooks/hooks";
import {cardsActions, cardsTypes, selectStatus, selectUserID} from ".";
import {selectCardsState} from "../../../../Store/Cards/selectors";

export const Cards: React.FC = React.memo(() => {
    const cardsState = useSelector(selectCardsState)
    const userID = useSelector(selectUserID)
    const status = useSelector(selectStatus)
    const {getCards, createCard, updateCard, changeVisibleCardPage} = useActions(cardsActions)
    const {deckID} = useParams<{ deckID: string }>()

    const {cards, cardsTotalCount, visiblePage, packUserId} = cardsState

    const [question, setQuestion] = useState<string>("")
    const [timeID, setTimeID] = useState<number | null>(null)

    const [answer, setAnswer] = useState<string>("")
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [showAdd, setShowAdd] = useState<boolean>(false)

    const requestStart = () => {
        let id = setTimeout(async () => {
            let requestData: GetCardsRequestDataType = {
                cardQuestion: question,
                cardsPack_id: deckID,
                pageNumber: visiblePage
            }
            await getCards(requestData)
            setTimeID(null)
        }, 500)
        setTimeID(+id)
    }
    useEffect(() => {
        if (deckID !== "") {
            if (timeID) {
                clearTimeout(timeID)
                requestStart()
            } else {
                requestStart()
            }
        }
    }, [deckID, visiblePage, question])

    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value)
    }, [])
    const addNewCardHandler = useCallback(() => {
        setShowAdd(true)
    }, [])
    const showAnswerCallback = useCallback((answer: string) => {
        setShowAnswer(true)
        setAnswer(answer)
    }, [])

    const onAddCardClick = useCallback((question: string, answer: string) => {
        const params: cardsTypes.CreateCardData = {
            data: {
                question,
                answer,
                cardsPack_id: deckID,
                grade: 0,
                answerImg: "",
                answerVideo: "",
                questionImg: "",
                questionVideo: "",
                rating: 0,
                shots: 0,
                type: "card"
            },
            deckID
        }
        createCard(params)
        setShowAdd(false)
    }, [deckID, createCard])
    const onEditCardClick = useCallback(
        async (question: string, answer: string, makerDeckID: string | undefined, cardID: string | undefined) => {
            if (userID === makerDeckID && deckID) {
                let data: UpdateCardRequestType = {
                    _id: cardID ?? "",
                    question,
                    answer
                }
                await updateCard({data, deckID})
            }
            setShowEdit(false)
        }, [deckID, userID])

    // data for table
    const columns: CallType[] = [
        {title: "question", width: "2fr"},
        {title: "Answer", width: "0.5fr"},
        {title: "last update", width: "0.6fr"},
        {title: "grade", width: "0.7fr"},
        {title: "actions", width: "1fr"},
    ]
    const rows: (Array<string | number | boolean | ReactNode>)[] = []
    getCardsForUI(cards)?.forEach(c => {
        rows.push([c.question, <span onClick={() => showAnswerCallback(c.answer)} className={S.showAnswer}>Show</span>,
            c.lastUpdate, <Rating grade={Math.floor(c.grade)}/>,
            <CardActionsPanel setEdit={setShowEdit} makerDeckID={packUserId} deckID={deckID} cardID={c.cardID}/>
        ])
    })

    return (
        <>
            {showAdd && <CommonModalCardForm title={"Add new Card"}
                                             setShow={setShowAdd}
                                             submitForm={onAddCardClick}
                                             type="Add"
            />}
            {showEdit && <CommonModalCardForm title={"Edit Card"}
                                              setShow={setShowEdit}
                                              submitForm={onEditCardClick}
                                              type="Edit"
            />}
            {showAnswer && <MyModal closeModal={() => setShowAnswer(false)}
                                    title={"Answer for your question!!"} width="350px">
                <div>{answer}</div>
            </MyModal>}

            <WorkSpace>
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
                    <div className={S.table_container}>
                        <Table
                            columns={columns}
                            items={rows}
                            totalCount={cardsTotalCount}
                            visiblePage={visiblePage}
                            setPage={changeVisibleCardPage}
                        />
                    </div>
                </div>
            </WorkSpace>
        </>
    )
})