import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CreateDeckRequest, decksAPI, DeckType} from "../Api/api";
import {setAppStatus} from "./app-reducer";

const initialState = {
    decks: null as DeckType[] | null,
    totalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0
}

export const getDecks = createAsyncThunk("decks/getDecks", async (pageNumber: number, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus("loading"))
        const response = await decksAPI.getDecks(pageNumber)
        thunkAPI.dispatch(setAppStatus("succeeded"))
        return response
    } catch (error) {
        thunkAPI.dispatch(setAppStatus("failed"))
        return thunkAPI.rejectWithValue("some error")
    }
})

export const createDeck = createAsyncThunk("decks/createDeck", async (data: CreateDeckRequest, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus("loading"))
        await decksAPI.createDeck(data)
        thunkAPI.dispatch(setAppStatus("succeeded"))
        thunkAPI.dispatch(getDecks(1))
    } catch (error) {
        thunkAPI.dispatch(setAppStatus("failed"))
        return thunkAPI.rejectWithValue("some error")
    }
})

export const decksSlice = createSlice({
    name: "decks",
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getDecks.fulfilled, (state, action) => {
            state.decks = action.payload.data.cardPacks
            state.totalCount = action.payload.data.cardPacksTotalCount
            state.minCardsCount = action.payload.data.minCardsCount
            state.maxCardsCount = action.payload.data.maxCardsCount
        })
    }
})

// thunks

// types
export type DecksStateType = typeof initialState
export type DecksActionsType = any