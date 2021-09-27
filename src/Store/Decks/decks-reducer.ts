import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DeckType} from "../../Api/api";
import {getDecks} from "./decks-actions";

const initialState = {
    decks: null as DeckType[] | null,
    filter: "All" as ShowDecksModeType,
    visiblePage: 1,
    totalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 1000000,
    selectedDeckID: "",
    minSelectedCardsCount: null as number | null,
    maxSelectedCardsCount: null as number | null
}

export const decksSlice = createSlice({
    name: "decks",
    initialState: initialState,
    reducers: {
        changeDecksFilter(state, action: PayloadAction<ShowDecksModeType>) {
            state.filter = action.payload
        },
        changeVisibleDecksPage(state, action: PayloadAction<number>) {
            state.visiblePage = action.payload
        },
        setDeckID(state, action: PayloadAction<string>) {
            state.selectedDeckID = action.payload
        },
        changeMinSelected(state, action: PayloadAction<number>) {
            state.minSelectedCardsCount = action.payload
        },
        changeMaxSelected(state, action: PayloadAction<number>) {
            state.maxSelectedCardsCount = action.payload
        },
        changeMinCount(state, action: PayloadAction<number>) {
            state.minCardsCount = action.payload
        },
        changeMaxCount(state, action: PayloadAction<number>) {
            state.maxCardsCount = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getDecks.fulfilled, (state, action) => {
            state.decks = action.payload.cardPacks
            state.totalCount = action.payload.cardPacksTotalCount
            state.minCardsCount = action.payload.minCardsCount
            state.maxCardsCount = action.payload.maxCardsCount
        })
    }
})

// types
export type DecksStateType = typeof initialState
export type ShowDecksModeType = "My" | "All"
