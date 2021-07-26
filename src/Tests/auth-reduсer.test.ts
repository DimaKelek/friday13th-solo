import {authReducer, AuthStateType, changeLoginStatus, setUserData, UserDataType} from "../Store/auth-reducer";

let startState: AuthStateType;
beforeEach(() => {
    startState = {
        userData: null,
        isLoggedIn: false
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
    let keys;
    if(endState.userData) {
        keys = Object.keys(endState.userData)
    }
    expect(endState.userData?._id).toBe("123")
    expect(keys && keys.length).toBe(4)
})

test("User should be logged", () => {
    const endState = authReducer(startState, changeLoginStatus(true))
    expect(endState.isLoggedIn).toBe(true)
})