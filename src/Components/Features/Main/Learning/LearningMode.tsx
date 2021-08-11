import React, {useCallback, useEffect, useState} from "react";
import S from "./Learning.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {changeEntityStatus, LearningStatus, setModeStart} from "../../../../Store/learning-reducer";
import {CircularProgress} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {getCards} from "../../../../Store/cards-reducer";
import {CardType, GetCardsRequestDataType} from "../../../../Api/api";
import {MyButton} from "../../../Common/MyButton/MyButton";
import { Card } from "./Card/Card";

type LearningModeProps = {}

export const LearningMode: React.FC<LearningModeProps> = React.memo(props => {
    setTimeout(() => {
        dispatch(changeEntityStatus("succeeded"))
    }, 1000)
    const status = useSelector<AppStoreType, LearningStatus>(state => state.learning.entityStatus)
    const modeStart = useSelector<AppStoreType, boolean>(state => state.learning.modeStart)
    const cards = useSelector<AppStoreType, CardType[] | null>(state => state.cards.cards)
    const {deckID} = useParams<{ deckID: string }>()
    const dispatch = useDispatch()

    const [currentCard, setCurrentCard] = useState<CardType>()

    const getCard = useCallback((cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
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
                dispatch(getCards(requestData))
            }, 500)
        }
        if (deckID !== undefined) {
            requestStart()
        }
        return () => {
            dispatch(setModeStart(false))
        }
    }, [dispatch, deckID])
    useEffect(() => {
        if (cards) {
            setCurrentCard(getCard(cards))
        }
    }, [modeStart, cards])
    const onStartClick = () => {
        dispatch(changeEntityStatus("loading"))
        setTimeout(() => {
            dispatch(changeEntityStatus("succeeded"))
            dispatch(setModeStart(true))
        }, 1000)
    }

    return (
        <div className={S.learning}>
            {status === "loading" ? <CircularProgress/>
                : <div className={S.workSpace}>
                    <div className={S.workSpace_container}>
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
                    </div>
                </div>
            }
        </div>
    )
})

