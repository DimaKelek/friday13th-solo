import {AppStoreType} from "../store";

export const selectIsLoggedIn = (state: AppStoreType) => state.auth.isLoggedIn
export const selectUserID = (state: AppStoreType) => state.auth.userData?._id
export const selectUserData = (state: AppStoreType) => state.auth.userData