import {authAPI, AuthDataType} from "../Api/api";
import {AppThunk} from "./store";

const initialState = {
    userData: null as UserDataType | null,
    error: null as string | null
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case actionVariables.SET_USERDATA:
            return {...state, userData: action.userData}
        case actionVariables.SER_ERROR:
            return {...state, error: action.error}
        default: return state
    }
}

// actions
export const setUserData = (userData: UserDataType) => ({type: actionVariables.SET_USERDATA, userData} as const)
export const setError = (error: string) => ({type: actionVariables.SER_ERROR, error} as const)

// thunks
export const login = (authData: AuthDataType): AppThunk => async (dispatch) => {
    try {
        const response = await authAPI.login(authData)
        const storedData: UserDataType = {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            avatar: response.data.avatar || null,
            publicCardPacksCount: response.data.publicCardPacksCount
        }
        dispatch(setUserData(storedData))
        dispatch(setError(""))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setError(error))
        console.log('Error: ', {...e})
    }
}
// types
export type AuthStateType = typeof initialState
export type AuthActionsType = ReturnType<typeof setUserData> | ReturnType<typeof setError>
export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string | null
    publicCardPacksCount: number
}

// variables
export const actionVariables = {
    SET_USERDATA: "LOGIN/SET-USER-DATA" as const,
    SER_ERROR: "LOGIN/SER_ERROR" as const
}