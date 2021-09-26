import {AppStoreType} from "../store";

export const selectDecks = (state: AppStoreType) => state.decks.decks
export const selectSelectedDeckID = (state: AppStoreType) => state.decks.selectedDeckID
export const selectDeckState = (state: AppStoreType) => state.decks