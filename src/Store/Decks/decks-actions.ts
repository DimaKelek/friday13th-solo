import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    CreateDeckRequestData,
    DeckResponseType,
    decksAPI,
    GetDecksRequestDataType,
    UpdateDeckRequestData
} from "../../Api/api";
import {ThunkApiType} from "../store";
import {setAppStatus} from "../App/app-reducer";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {DataForRequest} from "../../Components/Features/Main/MainCommon/utils/dataHandlersTypes";
import { getDecksRequestDC } from "../../Components/Features/Main/Decks";

export const getDecks = createAsyncThunk<DeckResponseType, GetDecksRequestDataType, ThunkApiType>("decks/getDecks",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            const response = await decksAPI.getDecks(data)
            dispatch(setAppStatus("succeeded"))
            return response.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })
export const createDeck = createAsyncThunk<void, CreateDeckRequestData, ThunkApiType>("decks/createDeck",
    async (data, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(setAppStatus("loading"))
            await decksAPI.createDeck(data)
            dispatch(setAppStatus("succeeded"))
            let dataForRequest: DataForRequest = {
                filter: getState().decks.filter,
                pageNumber: getState().decks.visiblePage,
                user_id: getState().auth.userData?._id,
            }
            let requestData = getDecksRequestDC(dataForRequest)
            dispatch(getDecks(requestData))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })
export const removeDeck = createAsyncThunk<void, string, ThunkApiType>("decks/removeDeck",
    async (id, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(setAppStatus("loading"))
            await decksAPI.removeDeck(id)
            dispatch(setAppStatus("succeeded"))
            let dataForRequest: DataForRequest = {
                filter: getState().decks.filter,
                pageNumber: getState().decks.visiblePage,
                user_id: getState().auth.userData?._id,
            }
            let requestData = getDecksRequestDC(dataForRequest)
            dispatch(getDecks(requestData))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })
export const updateDeck = createAsyncThunk<void, UpdateDeckRequestData, ThunkApiType>("decks/updateDeck",
    async (data, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(setAppStatus("loading"))
            await decksAPI.updateDeck(data)
            dispatch(setAppStatus("succeeded"))
            let dataForRequest: DataForRequest = {
                filter: getState().decks.filter,
                pageNumber: getState().decks.visiblePage,
                user_id: getState().auth.userData?._id,
            }
            let requestData = getDecksRequestDC(dataForRequest)
            dispatch(getDecks(requestData))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })