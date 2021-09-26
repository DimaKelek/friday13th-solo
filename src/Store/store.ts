import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {profileSlice} from "./profile-reducer";
import {authSlice} from "./Auth/auth-reducer";
import {registerSlice} from "./Registration/registration-reducer";
import {recoverySlice} from "./RecoveryPass/recovery-pass-reducer";
import {appSlice} from "./App/app-reducer";
import {decksSlice} from "./Decks/decks-reducer";
import {cardsSlice} from "./Cards/cards-reducer";
import {learningSlice} from "./learning-reducer";

const rootReducer = combineReducers({
    profile: profileSlice.reducer,
    auth: authSlice.reducer,
    registration: registerSlice.reducer,
    recovery: recoverySlice.reducer,
    app: appSlice.reducer,
    decks: decksSlice.reducer,
    cards: cardsSlice.reducer,
    learning: learningSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// types
export type AppStoreType = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch
export type ThunkApiType = {
    dispatch: AppDispatchType,
    state: AppStoreType,
    rejectValue: string
}
//@ts-ignore
window.store = store