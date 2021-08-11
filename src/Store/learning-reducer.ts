import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkApiType} from "./store";
import {setAppStatus} from "./app-reducer";
import {cardsAPI, GradeType} from "../Api/api";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";

const initialState = {
    entityStatus: "loading" as LearningStatus,
    modeStart: false,
    selectedCardID: ""
}

export const updateRating = createAsyncThunk<void, GradeType, ThunkApiType>("learning/updateRating",
    async (grade, {dispatch, getState, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await cardsAPI.updateRating({card_id: getState().learning.selectedCardID, grade})
            dispatch(setAppStatus("succeeded"))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })

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

export const {changeEntityStatus, setModeStart, setSelectedCardID} = learningSlice.actions

// thunks

// types
export type LearningActionsType = any
export type LearningStatus = "idle" | "loading" | "failed" | "succeeded"