import {
    recoveryPassReducer,
    RecoveryPassStateType,
    setStatusPassRecovery,
    setStatusSendingMessage
} from "../Store/recovery-pass-reducer";

let startState: RecoveryPassStateType;
beforeEach(() => {
    startState = {
        passIsRecovered: false,
        messageIsSand: false
    }
})

test("message should be sanded", () => {
    const endState = recoveryPassReducer(startState, setStatusSendingMessage(true))
    expect(endState.messageIsSand).toBe(true)
})

test("Password should be recovered", () => {
    const endState = recoveryPassReducer(startState, setStatusPassRecovery(true))
    expect(endState.messageIsSand).toBe(true)
})