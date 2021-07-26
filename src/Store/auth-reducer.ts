import {authAPI} from "../Api/api";
import {AppThunk} from "./store";
import {setAppStatus, setError, setInitialized} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {setStatusPassRecovery} from "./recovery-pass-reducer";

const initialState = {
    userData: null as UserDataType | null,
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case authActionVariables.SET_USERDATA:
            return {...state, userData: action.userData}
        case authActionVariables.CHANGE_LOGIN_STATUS:
            return {...state, isLoggedIn: action.loginStatus}
        default:
            return state
    }
}

// actions
export const setUserData = (userData: UserDataType | null) => ({
    type: authActionVariables.SET_USERDATA, userData} as const)
export const changeLoginStatus = (loginStatus: boolean) => ({
    type: authActionVariables.CHANGE_LOGIN_STATUS, loginStatus} as const)

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
        dispatch(setInitialized())
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setInitialized())
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
        dispatch(checkingAuthorization())
        dispatch(setStatusPassRecovery(false))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
export const logout = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        await authAPI.logout()
        dispatch(changeLoginStatus(false))
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

// variables
const authActionVariables = {
    SET_USERDATA: "LOGIN/SET-USER-DATA" as const,
    CHANGE_LOGIN_STATUS: "LOGIN/CHANGE-LOGIN-STATUS" as const,
}