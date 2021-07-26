import {appReducer, AppStateType, setAppStatus, setError, setInitialized} from "../Store/app-reducer";

let startState: AppStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})

test("App status should be changed", () => {
    const endState = appReducer(startState, setAppStatus("loading"))
    expect(endState.status).toBe("loading")
})

test("Error should be added", () => {
    const error = "some error"
    const endState = appReducer(startState, setError(error))
    expect(endState.error).toBe("some error")
})

test("App should be initialize", () => {
    const endState = appReducer(startState, setInitialized())
    expect(endState.isInitialized).toBe(true)
})
