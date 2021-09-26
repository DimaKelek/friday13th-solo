import {setAppStatus, setError} from "../../../../../Store/app-reducer";
import {AppDispatchType} from "../../../../../Store/store";

export const handleServerNetworkError = (error: any, dispatch: AppDispatchType) => {
    const errorMessage = error.response.data.error || (error.message + ', more details in the console')
    dispatch(setError(errorMessage))
    dispatch(setAppStatus("failed"))
    return errorMessage
}