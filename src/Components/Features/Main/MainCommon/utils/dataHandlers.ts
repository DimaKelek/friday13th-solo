import {DeckType, GetDecksRequestDataType} from "../../../../../Api/api";
import {ShowDecksModeType} from "../../../../../Store/decks-reducer";

export type RenderDeckType = {
    name: string
    cards: number
    lastUpdate: string
    created: string
    makerDeckID?: string
    deckID?: string
}
export const getDecksForUI = (decks: DeckType[] | null | undefined) => {
    let decksForUI: RenderDeckType[] | null = null
    if(decks) {
        decksForUI = decks.map(d => {
            const lastUpdate = (function (lastUpdate: string) {
                let temp = lastUpdate.split("")
                temp.splice(10)
                return temp.join("")
            }(d.updated))
            const userName = (function (created: string) {
                let temp = created.split("")
                if(temp.length > 15)
                    temp.splice(10)
                return temp.join("")
            }(d.user_name))
            return {
                name: d.name,
                cards: d.cardsCount,
                lastUpdate: lastUpdate,
                created: userName,
                makerDeckID: d.user_id,
                deckID: d._id
            }
        })
    }
    return decksForUI
}

export type DataForRequest = GetDecksRequestDataType & {
    filter: ShowDecksModeType
}

export const getDecksRequestDC = (data: DataForRequest) => {
    const {filter, max, min, pageNumber, user_id, packName, page} = data
    return filter === "My"
        ? {pageNumber, user_id, min, max, packName, page}
        : {pageNumber, min, max, packName, page}
}