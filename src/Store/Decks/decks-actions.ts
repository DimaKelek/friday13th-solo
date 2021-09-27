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
import {DataForRequest, getDecksRequestDC} from "../../Components/Features/Main/MainCommon/utils/dataHandlers";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";
import {changeMinCount} from "./decks-reducer";

export const getDecks = createAsyncThunk<DeckResponseType, GetDecksRequestDataType, ThunkApiType>("decks/getDecks",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            const response = await decksAPI.getDecks(data)
            dispatch(changeMinCount(response.data.minCardsCount))
            dispatch(changeMinCount(response.data.maxCardsCount))
            dispatch(setAppStatus("succeeded"))
            return response.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error, dispatch))
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