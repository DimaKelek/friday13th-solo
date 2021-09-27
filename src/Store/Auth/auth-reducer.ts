import {UserDataType} from "../../Api/api";
import {createSlice} from "@reduxjs/toolkit";
import {checkingAuthorization, login, logout} from "./auth-actions";

const initialState = {
    userData: null as UserDataType | null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(logout.fulfilled || login.fulfilled || checkingAuthorization.fulfilled, (state, action) => {
            state.userData = action.payload.userData
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

// types
export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type AuthStateType = typeof initialState