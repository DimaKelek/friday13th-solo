import {DeckType} from "../../../../../Api/api";

export type RenderDeckType = {
    name: string
    cards: number
    lastUpdate: string
    created: string
}
export const getDecksForUI = (decks: DeckType[] | null) => {
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
            return {name: d.name, cards: d.cardsCount, lastUpdate: lastUpdate, created: userName}
        })
    }
    return decksForUI
}