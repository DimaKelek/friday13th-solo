const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case appActionVariables.SET_STATUS:
            return {...state, status: action.status}
        case appActionVariables.SER_ERROR:
            return {...state, error: action.error}
        case appActionVariables.SET_INITIALIZED:
            return {...state, isInitialized: true}
        default: return state
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) => ({type: appActionVariables.SET_STATUS, status} as const)
export const setError = (error: string) => ({type: appActionVariables.SER_ERROR, error} as const)
export const setInitialized = () => ({type: appActionVariables.SET_INITIALIZED} as const)
// thunks

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppStateType = typeof initialState
export type AppActionsType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof setInitialized>

// variables
const appActionVariables = {
    SET_STATUS: "APP/SET-STATUS" as const,
    SER_ERROR: "APP/SET-ERROR" as const,
    SET_INITIALIZED: "APP/SET-INITIALIZED" as const,
}