import {combineReducers} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {ProfileActionsType, profileSlice} from "./profile-reducer";
import {AuthActionsType, authSlice} from "./auth-reducer";
import {registerSlice, RegistrationActionsType} from "./registration-reducer";
import {RecoveryPassActionsType, recoverySlice} from "./recovery-pass-reducer";
import {AppActionsType, appSlice} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {DecksActionsType, decksSlice} from "./decks-reducer";
import {CardsActionsType, cardsSlice} from "./cards-reducer";
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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AllAppActionsType>
export type AllAppActionsType =
    ProfileActionsType
    | AuthActionsType
    | RegistrationActionsType
    | RecoveryPassActionsType
    | AppActionsType
    | CardsActionsType
    | DecksActionsType

export type AppDispatchType = typeof store.dispatch
export type ThunkApiType = {
    dispatch: AppDispatchType,
    state: AppStoreType,
    rejectValue: string
}
//@ts-ignore
window.store = store