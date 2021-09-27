import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApiType} from "../store";
import {setAppStatus, setError} from "../App/app-reducer";
import {authAPI} from "../../Api/api";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {
    ForgotPasswordRequest,
    RecoveryRequestType,
    setStatusPassRecovery,
    setStatusSendingMessage
} from "./recovery-pass-reducer";

export const forgotPass = createAsyncThunk<void, ForgotPasswordRequest, ThunkApiType>("recovery/forgot",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await authAPI.forgot(data)
            dispatch(setStatusSendingMessage(true))
            dispatch(setError(""))
            dispatch(setAppStatus("succeeded"))
        } catch (e) {
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
    })
export const recovery = createAsyncThunk<void, RecoveryRequestType, ThunkApiType>("recovery/recovery",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await authAPI.recoveryPass(data)
            dispatch(setStatusPassRecovery(true))
            dispatch(setStatusSendingMessage(false))
            dispatch(setError(""))
            dispatch(setAppStatus("succeeded"))
        } catch (e) {
            return rejectWithValue(handleServerNetworkError(e, dispatch))
        }
    })