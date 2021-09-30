import {RequestStatusType} from "../../../../../Store/App/app-reducer";

export const stringShortener = (str: string, n?: number) => {
    const temp = str.split("")
    temp.splice(n ?? 10)
    return temp.join("")
}

export const createTimer = (requestData: any, requestFunc: any, setTimeID: (v: number | null) => void) => () => {
    const id = setTimeout(async () => {
        await requestFunc(requestData)
        setTimeID(null)
    }, 1000)
    setTimeID(+id)
}
export const requestStart = (requestTimer: () => void, timeID: number | null, status: RequestStatusType) => {
    if (timeID && status !== "loading") {
        clearTimeout(timeID)
        requestTimer()
    } else if (status !== "loading") {
        requestTimer()
    }
}