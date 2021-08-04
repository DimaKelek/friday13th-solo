import axios from "axios"
import {AuthDataType, UserDataType} from "../Store/auth-reducer";
import {RegisterDataType} from "../Store/registration-reducer";
import {ForgotPasswordRequest, RecoveryRequestType} from "../Store/recovery-pass-reducer";

const instanse = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})

export const authAPI = {
    login(authData: AuthDataType) {
        return instanse.post<LoginResponseType>(`/auth/login`, authData)
    },
    registration(registerData: RegisterDataType) {
        return instanse.post<RegistrationResponseType>(`/auth/register`, registerData)
    },
    checkingAuth() {
        return instanse.post<LoginResponseType>(`/auth/me`, {})
    },
    logout() {
        return instanse.delete<ResponseType>(`/auth/me`, {})
    },
    forgot(data: ForgotPasswordRequest) {
        return instanse.post<ResponseType>(`/auth/forgot`, data)
    },
    recoveryPass(data: RecoveryRequestType) {
        return instanse.post<ResponseType>(`/auth/set-new-password`, data)
    }
}

// types
type LoginResponseType = UserDataType & {
    error?: string
}
type ResponseType = {
    info?: string
    error?: string
}
type RegistrationResponseType = {addedUser: {}} & {
    error?: string
}

export const decksAPI = {
    getDecks(data: GetDecksRequestDataType) {
        let id = data.user_id ? `&user_id=${data.user_id}`: ""
        let min = data.min ? `&min=${data.min}` : ""
        let max = data.max ? `&max=${data.max}` : ""
        let packName = data.packName ? `&packName=${data.packName}` : ""
        return instanse.get<DeckResponseType>(`/cards/pack?pageCount=7&page=${data.pageNumber}${id}${min}${max}${packName}`)
    },
    createDeck(data: CreateDeckRequestData) {
        return instanse.post(`/cards/pack`, data)
    },
    removeDeck(id: string) {
        return instanse.delete(`/cards/pack?id=${id}`)
    },
    updateDeck(data: UpdateDeckRequestData) {
        return instanse.put(`/cards/pack`, data)
    }
}

export type DeckType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
export type GetDecksRequestDataType = {
    pageNumber: number
    page?: number
    user_id?: string
    min?: number
    max?: number
    packName?: string
}
export type DeckResponseType = {
    cardPacks: DeckType[]
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}

export type CreateDeckRequestData = {
    cardsPack: DeckDataType
}
export type DeckDataType<T = "pack"> = {
    name: string
    private: boolean
    type?: T
    deckCover?: string
}

export type UpdateDeckRequestData = {
    cardsPack: {
        _id: string
        name: string
    }
}