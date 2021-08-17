import {ThunkApiType} from "./store";
import {authAPI} from "../Api/api";
import {setAppStatus, setError} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    register: false
}

export const registration = createAsyncThunk<void, RegisterDataType, ThunkApiType>("register/registration",
    async (registerData, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await authAPI.registration(registerData)
            dispatch(changeRegisterStatus(true))
            dispatch(setError(""))
            dispatch(setAppStatus("succeeded"))
        } catch (e) {
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
})
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

// types
export type RegisterDataType = {
    email: string
    password: string
}
export type RegistrationStateType = typeof initialState