import {authAPI, AuthDataType} from "../Api/api";
import {AppThunk} from "./store";
import {setAppStatus, setError} from "./app-reducer";

const initialState = {
    userData: null as UserDataType | null,
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case authActionVariables.SET_USERDATA:
            return {...state, userData: action.userData}
        case authActionVariables.CHANGE_LOGIN_STATUS:
            return {...state, isLoggedIn: true}
        default: return state
    }
}

// actions
export const setUserData = (userData: UserDataType) => ({type: authActionVariables.SET_USERDATA, userData} as const)
export const changeLoginStatus = () => ({type: authActionVariables.CHANGE_LOGIN_STATUS} as const)

// thunks
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
        dispatch(changeLoginStatus())
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setError(error))
        dispatch(setAppStatus("failed"))
        console.log('Error: ', {...e})
    }
}
// types
export type AuthStateType = typeof initialState
export type AuthActionsType =
    ReturnType<typeof setUserData>
    | ReturnType<typeof changeLoginStatus>
export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string | null
    publicCardPacksCount: number
}

// variables
const authActionVariables = {
    SET_USERDATA: "LOGIN/SET-USER-DATA" as const,
    CHANGE_LOGIN_STATUS: "LOGIN/CHANGE-LOGIN-STATUS" as const,
}