const initialState = {

}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        default: return state
    }
}

// actions

// thunks

// types
type RegistrationStateType = typeof initialState
export type RegistrationActionsType = any