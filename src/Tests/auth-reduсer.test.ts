import {authReducer, AuthStateType, setUserData, UserDataType} from "../Store/auth-reducer";

let startState: AuthStateType;
beforeEach(() => {
    startState = {
        userData: null,
        error: null
    }
})

test("User data should be added", () => {
    const userData: UserDataType = {
        _id: "123",
        email: "123",
        name: "123",
        publicCardPacksCount: 0
    }
    const endState = authReducer(startState, setUserData(userData))
    expect(endState.userData?._id).toBe("123")
})