import {createSlice} from "@reduxjs/toolkit";

const initialState = {

}

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {

    }
})

// thunks

// types
type ProfileStateType = typeof initialState
export type ProfileActionsType = any