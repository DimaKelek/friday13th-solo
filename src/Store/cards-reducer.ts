import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    cardsAPI,
    CardType,
    CreateCardDataType,
    GetCardsRequestDataType,
    GetCardsResponseType,
    UpdateCardRequestType
} from "../Api/api"
import {setAppStatus} from "./app-reducer";
import {handleServerNetworkError} from "../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {ThunkApiType} from "./store";

const initialState = {
    cards: null as CardType[] | null,
    cardsTotalCount: 0,
    visiblePage: 1,
    packUserId: "",
    deckID: "",
    selectedCardID: ""
}

export const getCards = createAsyncThunk<GetCardsResponseType, GetCardsRequestDataType, ThunkApiType>("cards/getCards",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            const response = await cardsAPI.getCards(data)
            dispatch(setAppStatus("succeeded"))
            return response.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })

export type CreateCardData = {
    data: CreateCardDataType
    deckID: string
}

export const createCard = createAsyncThunk<void, CreateCardData, ThunkApiType>("cards/createCard",
    async (params, {dispatch, getState, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await cardsAPI.createCard(params.data)
            dispatch(setAppStatus("succeeded"))
            dispatch(getCards({cardsPack_id: params.deckID, pageNumber: getState().cards.visiblePage}))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })

export type RemoverCardData = {
    cardID: string,
    deckID: string
}

export const removeCard = createAsyncThunk<void, RemoverCardData, ThunkApiType>("cards/removeCard",
    async (params, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(setAppStatus("loading"))
            await cardsAPI.removeCard(params.cardID)
            dispatch(setAppStatus("succeeded"))
            dispatch(getCards({cardsPack_id: params.deckID, pageNumber: getState().cards.visiblePage}))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })

type UpdateCardDataType = {
    data: UpdateCardRequestType,
    deckID: string
}
export const updateCard = createAsyncThunk<void, UpdateCardDataType, ThunkApiType>("cards/updateCard",
    async (params, {dispatch, getState, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await cardsAPI.updateCard(params.data)
            dispatch(setAppStatus("succeeded"))
            dispatch(getCards({cardsPack_id: params.deckID, pageNumber: getState().cards.visiblePage}))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })

export const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        changeVisibleCardPage(state, action: PayloadAction<number>) {
            state.visiblePage = action.payload
        },
        setSelectedCardID(state, action: PayloadAction<string>) {
            state.selectedCardID = action.payload
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
export const {changeVisibleCardPage, setSelectedCardID} = cardsSlice.actions
// thunks

// types
export type CardsStateType = typeof initialState
export type CardsActionsType = any