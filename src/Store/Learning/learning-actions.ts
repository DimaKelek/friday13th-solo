import {createAsyncThunk} from "@reduxjs/toolkit";
import {cardsAPI, GradeType} from "../../Api/api";
import {ThunkApiType} from "../store";
import {setAppStatus} from "../App/app-reducer";
import {handleServerNetworkError} from "../../Components/Features/Authorization/AuthCommon/utils/errorHandler";

export const updateRating = createAsyncThunk<void, GradeType, ThunkApiType>("learning/updateRating",
    async (grade, {dispatch, getState, rejectWithValue}) => {
        try {
            dispatch(setAppStatus("loading"))
            await cardsAPI.updateRating({card_id: getState().learning.selectedCardID, grade})
            dispatch(setAppStatus("succeeded"))
        } catch (error) {
            dispatch(setAppStatus("failed"))
            return rejectWithValue(handleServerNetworkError(error, dispatch))
        }
    })