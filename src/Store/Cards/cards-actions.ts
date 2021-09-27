import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApiType} from "../store";
import {setAppStatus} from "../App/app-reducer";
import {cardsAPI, GetCardsRequestDataType, GetCardsResponseType} from "../../Api/api";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {CreateCardData, RemoverCardData, UpdateCardData} from "./cards-types";

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

export const updateCard = createAsyncThunk<void, UpdateCardData, ThunkApiType>("cards/updateCard",
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