import {AppThunk} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";

const initialState = {
    register: false
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        case registerActionVariables.CHANGE_REGISTER_STATUS:
            return {...state, register: true}
        default: return state
    }
}

// actions
export const changeRegisterStatus = () => ({type: registerActionVariables.CHANGE_REGISTER_STATUS} as const)
// thunks
export const registration = (registerData: RegisterDataType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        await authAPI.registration(registerData)
        dispatch(changeRegisterStatus())
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
type RegistrationStateType = typeof initialState
export type RegistrationActionsType = ReturnType<typeof changeRegisterStatus>

// variables
const registerActionVariables = {
    CHANGE_REGISTER_STATUS: "REGISTER/CHANGE-REGISTER-STATUS"
}