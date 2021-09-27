import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "../../Api/api"
import {getCards} from "./cards-actions";

export const initialState = {
    cards: null as CardType[] | null,
    cardsTotalCount: 0,
    visiblePage: 1,
    packUserId: "",
    deckID: "",
    selectedCardID: ""
}

export const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        changeVisibleCardPage(state, action: PayloadAction<number>) {
            state.visiblePage = action.payload
        },
        setSelectedCardID(state, action: PayloadAction<string>) {
            state.selectedCardID = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.visiblePage = action.payload.page
            state.packUserId = action.payload.packUserId
        })
    }
})