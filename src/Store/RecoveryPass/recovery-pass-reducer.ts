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