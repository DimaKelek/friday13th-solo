import {RequestStatusType} from "../../../../../Store/App/app-reducer";

export const requestStart = (requestTimer: () => void, timeID: number | null, status: RequestStatusType) => {
    if (timeID && status !== "loading") {
        clearTimeout(timeID)
        requestTimer()
    } else if (status !== "loading") {
        requestTimer()
    }
}