import {changeRegisterStatus, registrationReducer, RegistrationStateType} from "../Store/registration-reducer";

let startState: RegistrationStateType;
beforeEach(() => {
    startState = {
        register: false
    }
})

test("User should be registered", () => {
    const endState = registrationReducer(startState, changeRegisterStatus(true))
    expect(endState.register).toBe(true)
})