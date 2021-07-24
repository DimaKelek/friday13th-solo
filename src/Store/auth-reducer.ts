const initialState = {

}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        default: return state
    }
}

// actions

// thunks

// types
type AuthStateType = typeof initialState
export type AuthActionsType = any