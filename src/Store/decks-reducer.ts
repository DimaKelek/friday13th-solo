import {createSlice} from "@reduxjs/toolkit";

const initialState = {

}

export const decksSlice = createSlice({
    name: "decks",
    initialState: initialState,
    reducers: {

    }
})

// thunks

// types
type DecksStateType = typeof initialState
export type DecksActionsType = any