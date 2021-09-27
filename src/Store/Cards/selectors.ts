import {AppStoreType} from "../store";

export const selectCardID = (state: AppStoreType) => state.cards.selectedCardID
export const selectDeckMaker = (state: AppStoreType) => state.cards.packUserId
export const selectCards = (state: AppStoreType) => state.cards.cards
export const selectCardsState = (state: AppStoreType) => state.cards