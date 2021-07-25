import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {RegistrationActionsType, registrationReducer} from "./registration-reducer";
import {RecoveryPassActionsType, recoveryPassReducer} from "./recovery-pass-reducer";
import {AppActionsType, appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    registration: registrationReducer,
    recovery: recoveryPassReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// types
export type AppStoreType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AllAppActionsType>
export type AllAppActionsType =
    ProfileActionsType
    | AuthActionsType
    | RegistrationActionsType
    | RecoveryPassActionsType
    | AppActionsType

//@ts-ignore
window.store = store