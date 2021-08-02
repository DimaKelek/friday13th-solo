import {AppThunk} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    register: false
}

export const registerSlice = createSlice({
    name: "registration",
    initialState: initialState,
    reducers: {
        changeRegisterStatus(state, action: PayloadAction<boolean>) {
            state.register = action.payload
        }
    }
})

export const {changeRegisterStatus} = registerSlice.actions

// thunks
export const registration = (registerData: RegisterDataType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus("loading"))
        await authAPI.registration(registerData)
        dispatch(changeRegisterStatus(true))
        dispatch(setError(""))
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