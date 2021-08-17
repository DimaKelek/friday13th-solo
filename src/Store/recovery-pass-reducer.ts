import {ThunkApiType} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    messageIsSand: false,
    passIsRecovered: false
}
export const forgotPass = createAsyncThunk<void, ForgotPasswordRequest, ThunkApiType>("recovery/forgot",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await authAPI.forgot(data)
            dispatch(setStatusSendingMessage(true))
            dispatch(setError(""))
            dispatch(setAppStatus("succeeded"))
        } catch (e) {
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
    })

export const recovery = createAsyncThunk<void, RecoveryRequestType, ThunkApiType>("recovery/recovery",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await authAPI.recoveryPass(data)
            dispatch(setStatusPassRecovery(true))
            dispatch(setStatusSendingMessage(false))
            dispatch(setError(""))
            dispatch(setAppStatus("succeeded"))
        } catch (e) {
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
    })

export const recoverySlice = createSlice({
    name: "recovery",
    initialState: initialState,
    reducers: {
        setStatusSendingMessage(state, action: PayloadAction<boolean>) {
            state.messageIsSand = action.payload
        },
        setStatusPassRecovery(state, action: PayloadAction<boolean>) {
            state.passIsRecovered = action.payload
        }
    }
})

export const {setStatusSendingMessage, setStatusPassRecovery} = recoverySlice.actions

// types
export type RecoveryRequestType = {
    password: string
    resetPasswordToken: string
}
export type ForgotPasswordRequest = {
    email: string
    from: string
    message: string
}
export type RecoveryPassStateType = typeof initialState