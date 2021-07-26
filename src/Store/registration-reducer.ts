import {AppThunk} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";

const initialState = {
    register: false
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        case registerActionVariables.CHANGE_REGISTER_STATUS:
            return {...state, register: action.status}
        default: return state
    }
}

// actions
export const changeRegisterStatus = (status: boolean) => ({type: registerActionVariables.CHANGE_REGISTER_STATUS, status} as const)
// thunks
export const registration = (registerData: RegisterDataType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        await authAPI.registration(registerData)
        dispatch(changeRegisterStatus(true))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
// types
export type RegisterDataType = {
    email: string
    password: string
}
export type RegistrationStateType = typeof initialState
export type RegistrationActionsType = ReturnType<typeof changeRegisterStatus>

// variables
const registerActionVariables = {
    CHANGE_REGISTER_STATUS: "REGISTER/CHANGE-REGISTER-STATUS"
}