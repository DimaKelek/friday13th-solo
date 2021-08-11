import {authAPI} from "../Api/api";
import {AppThunk} from "./store";
import {setAppStatus, setError, setInitialized} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {setStatusPassRecovery} from "./recovery-pass-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    userData: null as UserDataType | null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserDataType | null>) {
            state.userData = action.payload
        },
        changeLoginStatus(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        }
    }
})

export const {setUserData, changeLoginStatus} = authSlice.actions


// thunks
export const checkingAuthorization = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        const response = await authAPI.checkingAuth()
        const storedData: UserDataType = {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            avatar: response.data.avatar || null,
            publicCardPacksCount: response.data.publicCardPacksCount
        }
        dispatch(setUserData(storedData))
        dispatch(changeLoginStatus(true))
        dispatch(setError(""))
        dispatch(setInitialized(true))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setInitialized(true))
    }
}
export const login = (authData: AuthDataType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        const response = await authAPI.login(authData)
        const storedData: UserDataType = {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            avatar: response.data.avatar || null,
            publicCardPacksCount: response.data.publicCardPacksCount
        }
        dispatch(setUserData(storedData))
        dispatch(setStatusPassRecovery(false))
        dispatch(changeLoginStatus(true))
        dispatch(setError(""))
        dispatch(setInitialized(true))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    try {
        dispatch({type: "jfjdkfjd", bbb: "jdjdsnjd"})
        dispatch(setAppStatus("loading"))
        await authAPI.logout()
        dispatch(changeLoginStatus(false))
        dispatch(setError(""))
        dispatch(setUserData(null))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

// types
export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string | null
    publicCardPacksCount: number
}
export type AuthStateType = typeof initialState
export type AuthActionsType =
    ReturnType<typeof setUserData>
    | ReturnType<typeof changeLoginStatus>
    | ReturnType<typeof setInitialized>