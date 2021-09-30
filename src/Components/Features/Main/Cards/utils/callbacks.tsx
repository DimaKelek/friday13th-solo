import {CardType} from "../../../../../Api/api";
import {RenderCardType} from "../../MainCommon/utils/dataHandlersTypes";
import {stringShortener} from "../../MainCommon/utils/dataHandlers";
import S from "../Cards.module.css";
import {Rating} from "../Rating/Rating";
import {CardActionsPanel} from "../ActionsPanel/ActionsPanel";
import React from "react";

export const getCardsForUI = (cards: CardType[] | null): RenderCardType[]  => {
    if(cards) {
        return cards.map(c => {
            return {
                answer: c.answer,
                question: c.question,
                lastUpdate: stringShortener(c.updated),
                grade: c.grade,
                cardID: c._id
            }
        })
    } else return []
}
export const getRowCardItems = (cards: CardType[] | null, showAnswer: (answer: string) => void,
                         setShow: (v: boolean) => void, userId: string, deckID: string) => {
    const createCardRow = (cards: RenderCardType) => {
        return [
            cards.question,
            <span onClick={() => showAnswer(cards.answer)} className={S.showAnswer}>Show</span>,
            cards.lastUpdate,
            <Rating grade={Math.floor(cards.grade)}/>,
            <CardActionsPanel setEdit={setShow} makerDeckID={userId} deckID={deckID} cardID={cards.cardID}/>
        ]
    }
    return getCardsForUI(cards)?.map(c => createCardRow(c))
}