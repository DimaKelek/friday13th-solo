import {createSlice} from "@reduxjs/toolkit";

const initialState = {

}

export const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {

    }
})

// thunks

// types
type CardsStateType = typeof initialState
export type CardsActionsType = any