import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApiType} from "../store";
import {setAppStatus, setError} from "../App/app-reducer";
import {authAPI} from "../../Api/api";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {changeRegisterStatus, RegisterDataType} from "./registration-reducer";

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