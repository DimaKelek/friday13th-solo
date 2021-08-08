import {CardType, DeckType, GetDecksRequestDataType} from "../../../../../Api/api";
import {ShowDecksModeType} from "../../../../../Store/decks-reducer";

export type RenderDeckType = {
    name: string
    cards: number
    lastUpdate: string
    created: string
    makerDeckID?: string
    deckID?: string
}
export const getDecksForUI = (decks: DeckType[] | null | undefined) => {
    let decksForUI: RenderDeckType[] | null = null
    if(decks) {
        decksForUI = decks.map(d => {
            const lastUpdate = (function (lastUpdate: string) {
                let temp = lastUpdate.split("")
                temp.splice(10)
                return temp.join("")
            }(d.updated))
            const userName = (function (created: string) {
                let temp = created.split("")
                if(temp.length > 15)
                    temp.splice(10)
                return temp.join("")
            }(d.user_name))
            return {
                name: d.name,
                cards: d.cardsCount,
                lastUpdate: lastUpdate,
                created: userName,
                makerDeckID: d.user_id,
                deckID: d._id
            }
        })
    }
    return decksForUI
}

export type DataForRequest = GetDecksRequestDataType & {
    filter: ShowDecksModeType
}

export const getDecksRequestDC = (data: DataForRequest) => {
    const {filter, max, min, pageNumber, user_id, packName} = data
    return filter === "My"
        ? {pageNumber, user_id, min, max, packName}
        : {pageNumber, min, max, packName}
}

export type RenderCardType = {
    answer: string
    question: string
    lastUpdate: string
    grade: number
    cardID: string
}

export const getCardsForUI = (cards: CardType[] | null) => {
    let cardsForUI: RenderCardType[] | null = null
    if(cards) {
        cardsForUI = cards.map(c => {
            const lastUpdate = (function (lastUpdate: string) {
                let temp = lastUpdate.split("")
                temp.splice(10)
                return temp.join("")
            }(c.updated))
            return {
                answer: c.answer,
                question: c.question,
                lastUpdate: lastUpdate,
                grade: c.grade,
                cardID: c._id
            }
        })
    }
    return cardsForUI
}