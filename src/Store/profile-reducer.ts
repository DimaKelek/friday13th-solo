const initialState = {

}

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        default: return state
    }
}

// actions

// thunks

// types
type ProfileStateType = typeof initialState
export type ProfileActionsType = any