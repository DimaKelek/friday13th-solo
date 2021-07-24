const initialState = {

}

export const newPassReducer = (state: NewPassStateType = initialState, action: NewPassActionsType): NewPassStateType => {
    switch (action.type) {
        default: return state
    }
}

// actions

// thunks

// types
type NewPassStateType = typeof initialState
export type NewPassActionsType = any