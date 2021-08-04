import {Dispatch} from "redux"
import {AppActionsType, setAppStatus, setError} from "../../../../../Store/app-reducer";

export const handleServerNetworkError = (error: any, dispatch: ErrorUtilsDispatchType) => {
    const errorMessage = error.response.data.error || (error.message + ', more details in the console')
    dispatch(setError(errorMessage))
    dispatch(setAppStatus("failed"))
    return errorMessage
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>