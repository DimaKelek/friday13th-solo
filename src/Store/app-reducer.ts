import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        setInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
    }
})

export const {setAppStatus, setError, setInitialized} = appSlice.actions

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppStateType = typeof initialState
export type AppActionsType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof setInitialized>