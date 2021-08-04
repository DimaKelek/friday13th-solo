import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    CreateDeckRequestData,
    DeckResponseType,
    decksAPI,
    DeckType,
    GetDecksRequestDataType,
    UpdateDeckRequestData
} from "../Api/api";
import {setAppStatus} from "./app-reducer";
import {AppDispatchType, AppStoreType} from "./store";
import {DataForRequest, getDecksRequestDC} from "../Components/Features/Main/MainCommon/utils/dataHandlers";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";

const initialState = {
    decks: null as DeckType[] | null,
    filter: "All" as ShowDecksModeType,
    visiblePage: 1,
    totalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    minSelectedCards: 0,
    maxSelectedCards: 0
}

export const getDecks = createAsyncThunk<DeckResponseType, GetDecksRequestDataType, ThunkApiType>("decks/getDecks",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            const response = await decksAPI.getDecks(data)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const createDeck = createAsyncThunk<void, CreateDeckRequestData, ThunkApiType>("decks/createDeck",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            await decksAPI.createDeck(data)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            let dataForRequest: DataForRequest = {
                filter: thunkAPI.getState().decks.filter,
                pageNumber: thunkAPI.getState().decks.visiblePage,
                user_id: thunkAPI.getState().auth.userData?._id,
            }
            let requestData = getDecksRequestDC(dataForRequest)
            thunkAPI.dispatch(getDecks(requestData))
        } catch (error) {
            thunkAPI.dispatch(setAppStatus("failed"))
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const removeDeck = createAsyncThunk<void, string, ThunkApiType>("decks/removeDeck",
    async (id, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            await decksAPI.removeDeck(id)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            let dataForRequest: DataForRequest = {
                filter: thunkAPI.getState().decks.filter,
                pageNumber: thunkAPI.getState().decks.visiblePage,
                user_id: thunkAPI.getState().auth.userData?._id,
            }
            let requestData = getDecksRequestDC(dataForRequest)
            thunkAPI.dispatch(getDecks(requestData))
        } catch (error) {
            thunkAPI.dispatch(setAppStatus("failed"))
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const updateDeck = createAsyncThunk<void, UpdateDeckRequestData, ThunkApiType>("decks/updateDeck",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            await decksAPI.updateDeck(data)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            let dataForRequest: DataForRequest = {
                filter: thunkAPI.getState().decks.filter,
                pageNumber: thunkAPI.getState().decks.visiblePage,
                user_id: thunkAPI.getState().auth.userData?._id,
            }
            let requestData = getDecksRequestDC(dataForRequest)
            thunkAPI.dispatch(getDecks(requestData))
        } catch (error) {
            thunkAPI.dispatch(setAppStatus("failed"))
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const decksSlice = createSlice({
    name: "decks",
    initialState: initialState,
    reducers: {
        changeDecksFilter(state, action: PayloadAction<ShowDecksModeType>) {
            state.filter = action.payload
        },
        changeVisiblePage(state, action: PayloadAction<number>) {
            state.visiblePage = action.payload
        },
        changeMinCardsCount(state, action: PayloadAction<number>) {
            state.minSelectedCards = action.payload
        },
        changeMaxCardsCount(state, action: PayloadAction<number>) {
            state.maxSelectedCards = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getDecks.fulfilled, (state, action) => {
            state.decks = action.payload.cardPacks
            state.totalCount = action.payload.cardPacksTotalCount
            state.minCardsCount = action.payload.minCardsCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.minSelectedCards = action.payload.minCardsCount
            state.maxSelectedCards = action.payload.maxCardsCount
        })
    }
})

export const {changeDecksFilter, changeVisiblePage, changeMaxCardsCount, changeMinCardsCount} = decksSlice.actions


// types
export type DecksStateType = typeof initialState
export type DecksActionsType = any
export type ShowDecksModeType = "My" | "All"
type ThunkApiType = {
    dispatch: AppDispatchType,
    state: AppStoreType,
    rejectValue: string
}