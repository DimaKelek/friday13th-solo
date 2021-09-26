import {AppStoreType} from "../store";

export const selectStatus = (state: AppStoreType) => state.app.status
export const selectIsInitialized = (state: AppStoreType) => state.app.isInitialized