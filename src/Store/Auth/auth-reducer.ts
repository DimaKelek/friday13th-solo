import {authAPI, UserDataType} from "../../Api/api";
import {ThunkApiType} from "../store";
import {setAppStatus, setError, setInitialized} from "../App/app-reducer";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {setStatusPassRecovery} from "../RecoveryPass/recovery-pass-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: null as UserDataType | null,
    isLoggedIn: false
}

export const checkingAuthorization = createAsyncThunk<AuthStateType, void, ThunkApiType>("auth/checkAuth",
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            const response = await authAPI.checkingAuth()
            dispatch(setError(""))
            dispatch(setInitialized(true))
            dispatch(setAppStatus("succeeded"))
            return {userData: {...response.data}, isLoggedIn: true}
        } catch (e) {
            dispatch(setInitialized(true))
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
    })

export const login = createAsyncThunk<AuthStateType, AuthDataType, ThunkApiType>("auth/checkAuth",
    async (authData, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            const response = await authAPI.login(authData)
            dispatch(setStatusPassRecovery(false))
            dispatch(setError(""))
            dispatch(setInitialized(true))
            dispatch(setAppStatus("succeeded"))
            return {userData: {...response.data}, isLoggedIn: true}
        } catch (e) {
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
    })

export const logout = createAsyncThunk<AuthStateType, void, ThunkApiType>("auth/checkAuth",
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await authAPI.logout()
            dispatch(setError(""))
            dispatch(setAppStatus("succeeded"))
            return {userData: null, isLoggedIn: false}
        } catch (e) {
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
    })

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