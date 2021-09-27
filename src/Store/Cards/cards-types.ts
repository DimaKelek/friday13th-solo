import {CreateCardDataType, UpdateCardRequestType} from "../../Api/api";
import {initialState} from "./cards-reducer";

export type CreateCardData = {
    data: CreateCardDataType
    deckID: string
}
export type RemoverCardData = {
    cardID: string,
    deckID: string
}
export type UpdateCardData = {
    data: UpdateCardRequestType,
    deckID: string
}
export type CardsStateType = typeof initialState