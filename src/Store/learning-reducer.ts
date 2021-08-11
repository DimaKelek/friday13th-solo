import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    entityStatus: "loading" as LearningStatus,
    modeStart: false
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
        }
    }
})

export const {changeEntityStatus, setModeStart} = learningSlice.actions

// thunks

// types
type LearningStateType = typeof initialState
export type LearningActionsType = any
export type LearningStatus = "idle" | "loading" | "failed" | "succeeded"