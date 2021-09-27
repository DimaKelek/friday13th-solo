import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    register: false
}

export const registerSlice = createSlice({
    name: "registration",
    initialState: initialState,
    reducers: {
        changeRegisterStatus(state, action: PayloadAction<boolean>) {
            state.register = action.payload
        }
    }
})

export const {changeRegisterStatus} = registerSlice.actions

// types
export type RegisterDataType = {
    email: string
    password: string
}
export type RegistrationStateType = typeof initialState