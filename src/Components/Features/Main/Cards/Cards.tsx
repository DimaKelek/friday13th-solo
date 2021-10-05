import React, {useCallback, useEffect, useState} from "react";
import S from "./Cards.module.css"
import {CallType, Table} from "../Table/Table";
import {Search} from "../Table/Search/Search";
import {useSelector} from "react-redux";
import {GetCardsRequestDataType, UpdateCardRequestType} from "../../../../Api/api";
import {NavLink, useParams} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {MyModal} from "../../ModalWindows/Modal/MyModal";
import {CommonModalCardForm} from "../../ModalWindows/CommanModalCardFrom/CommanModalCardForm";
import {WorkSpace} from "../MainCommon/StyledComponents/WorkSpace";
import {useActions, useInput, useModal} from "../../../Common/Hooks/hooks";
import {
    cardsActions,
    cardsTypes,
    createTimer,
    getRowCardItems,
    requestStart,
    selectCardsState,
    selectStatus,
    selectUserID
} from ".";

export const Cards: React.FC = React.memo(() => {
    const cardsState = useSelector(selectCardsState)
    const userID = useSelector(selectUserID)
    const status = useSelector(selectStatus)
    const {getCards, createCard, updateCard, changeVisibleCardPage} = useActions(cardsActions)
    const {deckID} = useParams<{ deckID: string }>()

    const {cards, cardsTotalCount, visiblePage, packUserId} = cardsState

    const [timeID, setTimeID] = useState<number | null>(null)
    const [answer, setAnswer] = useState<string>("")
    const question = useInput()
    const answerModal = useModal(false)
    const addCardModal = useModal(false)
    const editCardModal = useModal(false)

    const requestData: GetCardsRequestDataType = {
        cardQuestion: question.value,
        cardsPack_id: deckID,
        pageNumber: visiblePage
    }
    const requestTimer = createTimer(requestData, getCards, setTimeID, 500)

    useEffect(() => {
        !!deckID && requestStart(requestTimer, timeID, status)
    }, [deckID, visiblePage, question])

    const showAnswerCallback = useCallback((answer: string) => {
        answerModal.open()
        setAnswer(answer)
    }, [answerModal])

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
        addCardModal.close()
    }, [deckID, createCard])

    const onEditCardClick = useCallback(
        async (question: string, answer: string, makerDeckID: string | undefined, cardID: string | undefined) => {
            if (userID === makerDeckID && deckID) {
                const data: UpdateCardRequestType = {_id: cardID ?? "", question, answer}
                await updateCard({data, deckID})
            }
            editCardModal.close()
        }, [deckID, userID])

    // data for table
    const columns: CallType[] = [
        {title: "question", width: "2fr"},
        {title: "Answer", width: "0.5fr"},
        {title: "last update", width: "0.6fr"},
        {title: "grade", width: "0.7fr"},
        {title: "actions", width: "1fr"},
    ]

    const rows = getRowCardItems(cards, showAnswerCallback, editCardModal.changeVisible, packUserId, deckID)

    return (
        <>
            {addCardModal.visible && <CommonModalCardForm title={"Add new Card"}
                                             setShow={addCardModal.close}
                                             submitForm={onAddCardClick}
                                             type="Add"
            />}
            {editCardModal.visible && <CommonModalCardForm title={"Edit Card"}
                                              setShow={editCardModal.close}
                                              submitForm={onEditCardClick}
                                              type="Edit"
            />}
            {answerModal.visible && <MyModal closeModal={answerModal.close}
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
                        <Search onChange={question.changeValue}/>
                        {userID === packUserId &&
                        <MyButton onClick={addCardModal.open} variant={"standard"}
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