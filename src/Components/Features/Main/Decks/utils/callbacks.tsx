import {DeckType} from "../../../../../Api/api";
import {DataForRequest, RenderDeckType} from "../../MainCommon/utils/dataHandlersTypes";
import {stringShortener} from "../../MainCommon/utils/dataHandlers";
import {NavLink} from "react-router-dom";
import {ActionsPanel} from "../ActionsPanel/ActionsPanel";
import React from "react";

export const getDecksForUI = (decks: DeckType[] | null | undefined): RenderDeckType[] => {
    if (decks) {
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
export const getRowItems = (decks: DeckType[] | null, openEditModal: (value: boolean) => void) => {
    const createRow = (deck: RenderDeckType, openModal: (value: boolean) => void) => {
        return [
            <NavLink to={`/app/cards/${deck.deckID}`}>{deck.name}</NavLink>,
            deck.cards,
            deck.lastUpdate,
            deck.created,
            <ActionsPanel makerDeckID={deck.makerDeckID} deckID={deck.deckID} setEdit={openModal}/>
        ]
    }
    return getDecksForUI(decks)?.map(d => createRow(d, openEditModal))
}