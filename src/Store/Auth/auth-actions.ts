import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApiType} from "../store";
import {setAppStatus, setError, setInitialized} from "../App/app-reducer";
import {authAPI} from "../../Api/api";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {setStatusPassRecovery} from "../RecoveryPass/recovery-pass-reducer";
import {AuthDataType, AuthStateType} from "./auth-reducer";

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