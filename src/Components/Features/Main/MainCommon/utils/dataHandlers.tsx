import {CardType, DeckType} from "../../../../../Api/api";
import {DataForRequest, RenderCardType, RenderDeckType} from "./dataHandlersTypes";
import {NavLink} from "react-router-dom";
import {ActionsPanel} from "../../Decks/ActionsPanel/ActionsPanel";
import React from "react";

export const stringShortener = (str: string, n?: number) => {
    const temp = str.split("")
    temp.splice(n ?? 10)
    return temp.join("")
}
export const getDecksForUI = (decks: DeckType[] | null | undefined): RenderDeckType[] => {
    if(decks) {
        return decks.map(d => {
            return {
                name: stringShortener(d.name, 15),
                cards: d.cardsCount,
                lastUpdate: stringShortener(d.updated),
                created: stringShortener(d.user_name),
                makerDeckID: d.user_id,
                deckID: d._id
            }
        })
    } else return []
}
export const getDecksRequestDC = (data: DataForRequest) => {
    const {filter, max, min, pageNumber, user_id, packName} = data
    return filter === "My" ? {pageNumber, user_id, min, max, packName} : {pageNumber, min, max, packName}
}
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
export const getRowItems = (decks: DeckType[] | null, openEditModal: (value: boolean) => void) => {
    return getDecksForUI(decks)?.map(d => createRow(d, openEditModal))
}
const createRow = (deck: RenderDeckType, openModal: (value: boolean) => void) => {
    return [
        <NavLink to={`/app/cards/${deck.deckID}`}>{deck.name}</NavLink>,
        deck.cards,
        deck.lastUpdate,
        deck.created,
        <ActionsPanel makerDeckID={deck.makerDeckID} deckID={deck.deckID} setEdit={openModal}/>
    ]
}