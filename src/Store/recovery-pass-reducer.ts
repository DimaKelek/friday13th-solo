import {AppThunk} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    messageIsSand: false,
    passIsRecovered: false
}

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

// thunks
export const forgotPass = (data: ForgotPasswordRequest): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        await authAPI.forgot(data)
        dispatch(setStatusSendingMessage(true))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const recovery = (data: RecoveryRequestType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        await authAPI.recoveryPass(data)
        dispatch(setStatusPassRecovery(true))
        dispatch(setStatusSendingMessage(false))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
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
export type RecoveryPassActionsType =
    ReturnType<typeof setStatusSendingMessage>
    | ReturnType<typeof setStatusPassRecovery>