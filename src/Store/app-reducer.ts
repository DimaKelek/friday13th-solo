const initialState = {

}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        default: return state
    }
}

// actions

// thunks

// types
type AppStateType = typeof initialState
export type AppActionsType = any