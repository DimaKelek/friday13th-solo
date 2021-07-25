import {Dispatch} from "redux"
import {AppActionsType, setAppStatus, setError} from "../../../../../Store/app-reducer";

export const handleServerNetworkError = (e: any, dispatch: ErrorUtilsDispatchType) => {
    const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
    dispatch(setError(error))
    dispatch(setAppStatus("failed"))
    console.log('Error: ', {...e})
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>