import React, {useCallback, useEffect, useState} from "react";
import S from "./Learning.module.css"
import {useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import {NavLink, useParams} from "react-router-dom";
import {CardType, GetCardsRequestDataType} from "../../../../Api/api";
import {Card} from "./Card/Card";
import {MyModal} from "../../ModalWindows/Modal/MyModal";
import dimych from "./dimych.jpg"
import {MyButton} from "../../../Common/MyButton/MyButton";
import {WorkSpace} from "../MainCommon/StyledComponents/WorkSpace";
import {useActions} from "../../../Common/Hooks/hooks";
import {getCards, learningActions, selectCards, selectLearningStatus, selectModeStart} from ".";

export const LearningMode: React.FC = React.memo(props => {
    setTimeout(() => {
        changeEntityStatus("succeeded")
    }, 1000)
    const status = useSelector(selectLearningStatus)
    const modeStart = useSelector(selectModeStart)
    const cards = useSelector(selectCards)
    const {changeEntityStatus, setModeStart, setSelectedCardID} = useActions(learningActions)
    const {deckID} = useParams<{deckID: string}>()

    const [currentCard, setCurrentCard] = useState<CardType>({} as CardType)
    const [showModal, setShowModal] = useState<boolean>(false)

    const getCard = useCallback((cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }, {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }, [])

    useEffect(() => {
        const requestStart = () => {
            setTimeout(() => {
                let requestData: GetCardsRequestDataType = {
                    cardsPack_id: deckID,
                    pageNumber: 1
                }
                getCards(requestData)
            }, 500)
        }
        if (deckID !== undefined) {
            requestStart()
        }
        return () => {
            setModeStart(false)
        }
    }, [setModeStart, deckID])
    useEffect(() => {
        if (cards) {
            let selectedCard = getCard(cards)
            setCurrentCard(selectedCard)
            setSelectedCardID(selectedCard._id)
        }
    }, [modeStart, cards, setSelectedCardID, getCard])
    const onStartClick = useCallback(() => {
        changeEntityStatus("loading")
        setTimeout(() => {
            changeEntityStatus("succeeded")
            setModeStart(true)
        }, 1000)
    }, [setModeStart, changeEntityStatus])

    const dimychHandler = useCallback(() => {
        setSelectedCardID("")
        setModeStart(false)
    }, [setSelectedCardID, setModeStart])

    return (
        <>
            {showModal &&
                <MyModal closeModal={setShowModal} width="320px" height="400px"
                         title="Ну шо ты бро всё выучил уже?">
                    <div className={S.modal_container}>
                        <img src={dimych} alt="dimych"/>
                    </div>
                    <NavLink to={"/app/decks"}>
                        <MyButton variant={"purple"} onClick={dimychHandler}>Летим 🚀</MyButton>
                    </NavLink>
                </MyModal>
            }
            <div className={S.learning}>
                {status === "loading" ? <CircularProgress/>
                    : <WorkSpace>
                        {!modeStart
                            ? <>
                                <h2>Welcome to learning mode with It-incubator bro!!</h2>
                                <div className={S.instruction}>
                                    <p>In this mode you can to learn indefinitely with cards prepared by you or your
                                        friends.</p>
                                    <p>If you are ready then press start!!!</p>
                                </div>
                                <span className={S.start} onClick={onStartClick}>Start</span>
                            </>
                            : <Card
                                card={currentCard}
                                setCurrentCard={setCurrentCard}
                                getNewCard={getCard}
                            />
                        }
                        {modeStart && <span className={S.exit} onClick={() => setShowModal(true)}>Exit</span>}
                    </WorkSpace>
                }
            </div>
        </>
    )
})

