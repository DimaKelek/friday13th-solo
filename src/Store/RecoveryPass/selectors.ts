import {AppStoreType} from "../store";

export const selectIsRecovered = (state: AppStoreType) => state.recovery.passIsRecovered
export const selectIsSand = (state: AppStoreType) => state.recovery.messageIsSand