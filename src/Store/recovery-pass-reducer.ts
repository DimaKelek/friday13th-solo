import {AppThunk} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";

const initialState = {
    messageIsSand: false
}

export const recoveryPassReducer = (state: RecoveryPassStateType = initialState, action: RecoveryPassActionsType): RecoveryPassStateType => {
    switch (action.type) {
        case recoveryActionVariables.SET_SEND_MESSAGE:
            return {...state, messageIsSand: action.status}
        default: return state
    }
}

// actions
export const setStatusSendingMessage = (status: boolean) => ({type: recoveryActionVariables.SET_SEND_MESSAGE, status})
// thunks
export const forgotPass = (data: ForgotPasswordRequest): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        await authAPI.forgot(data)
        dispatch(setStatusSendingMessage(true))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}
// types
export type ForgotPasswordRequest = {
    email: string
    from: string
    message: string
}
type RecoveryPassStateType = typeof initialState
export type RecoveryPassActionsType = ReturnType<typeof setStatusSendingMessage>

// variables
const recoveryActionVariables = {
    SET_SEND_MESSAGE: "RECOVERY/SET-STATUS-SEND-MESSAGE"
}