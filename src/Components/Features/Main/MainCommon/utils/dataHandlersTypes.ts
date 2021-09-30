import {GetDecksRequestDataType} from "../../../../../Api/api";
import {ShowDecksModeType} from "../../../../../Store/Decks/decks-reducer";

export type RenderDeckType = {
    name: string
    cards: number
    lastUpdate: string
    created: string
    makerDeckID?: string
    deckID?: string
}

export type DataForRequest = GetDecksRequestDataType & {
    filter: ShowDecksModeType
}

export type RenderCardType = {
    answer: string
    question: string
    lastUpdate: string
    grade: number
    cardID: string
}