import {AppStoreType} from "../store";

export const selectLearningStatus = (state: AppStoreType) => state.learning.entityStatus
export const selectModeStart = (state: AppStoreType) => state.learning.modeStart