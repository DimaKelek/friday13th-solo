import {Dispatch} from "redux"
import {AppActionsType, setAppStatus, setError} from "../../../../../Store/app-reducer";

export const handleServerNetworkError = (error: any, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setError(error.response.data.error || (error.message + ', more details in the console')))
    dispatch(setAppStatus("failed"))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>