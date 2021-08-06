import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    cardsAPI,
    CardType, CreateCardDataType,
    CreateDeckRequestData,
    decksAPI,
    GetCardsRequestDataType,
    GetCardsResponseType, UpdateCardRequestType, UpdateDeckRequestData
} from "../Api/api"
import {setAppStatus} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {ThunkApiType} from "./store";
import {DataForRequest, getDecksRequestDC} from "../Components/Features/Main/MainCommon/utils/dataHandlers";
import {getDecks} from "./decks-reducer";

const initialState = {
    cards: null as CardType[] | null,
    cardsTotalCount: 0,
    visiblePage: 1,
    packUserId: "",
    deckID: ""
}

export const getCards = createAsyncThunk<GetCardsResponseType, GetCardsRequestDataType, ThunkApiType>("cards/getCards",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            const response = await cardsAPI.getCards(data)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const createCard = createAsyncThunk<void, CreateCardDataType, ThunkApiType>("cards/createCard",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            await cardsAPI.createCard(data)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            let requestData: GetCardsRequestDataType = {
                cardsPack_id: thunkAPI.getState().decks.selectedDeckID,
                pageNumber: thunkAPI.getState().cards.visiblePage
            }
            thunkAPI.dispatch(getCards(requestData))
        } catch (error) {
            thunkAPI.dispatch(setAppStatus("failed"))
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const removeCard = createAsyncThunk<void, string, ThunkApiType>("cards/removeCard",
    async (id, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            await cardsAPI.removeCard(id)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            let requestData: GetCardsRequestDataType = {
                cardsPack_id: thunkAPI.getState().decks.selectedDeckID,
                pageNumber: thunkAPI.getState().cards.visiblePage
            }
            thunkAPI.dispatch(getCards(requestData))
        } catch (error) {
            thunkAPI.dispatch(setAppStatus("failed"))
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const updateCard = createAsyncThunk<void, UpdateCardRequestType, ThunkApiType>("cards/updateCard",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus("loading"))
            await cardsAPI.updateCard(data)
            thunkAPI.dispatch(setAppStatus("succeeded"))
            let requestData: GetCardsRequestDataType = {
                cardsPack_id: thunkAPI.getState().decks.selectedDeckID,
                pageNumber: thunkAPI.getState().cards.visiblePage
            }
            thunkAPI.dispatch(getCards(requestData))
        } catch (error) {
            thunkAPI.dispatch(setAppStatus("failed"))
            return thunkAPI.rejectWithValue(handleServerNetworkError(error, thunkAPI.dispatch))
        }
    })

export const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        changeVisibleCardPage(state, action: PayloadAction<number>) {
            state.visiblePage = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.visiblePage = action.payload.page
            state.packUserId = action.payload.packUserId
        })
    }
})
export const {changeVisibleCardPage} = cardsSlice.actions
// thunks

// types
export type CardsStateType = typeof initialState
export type CardsActionsType = any