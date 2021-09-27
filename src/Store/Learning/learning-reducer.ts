import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    entityStatus: "loading" as LearningStatus,
    modeStart: false,
    selectedCardID: ""
}

export const learningSlice = createSlice({
    name: "learning",
    initialState: initialState,
    reducers: {
        changeEntityStatus(state, action: PayloadAction<LearningStatus>) {
            state.entityStatus = action.payload
        },
        setModeStart(state, action: PayloadAction<boolean>) {
            state.modeStart = action.payload
        },
        setSelectedCardID(state, action: PayloadAction<string>) {
            state.selectedCardID = action.payload
        }
    }
})

// types
export type LearningActionsType = any
export type LearningStatus = "idle" | "loading" | "failed" | "succeeded"