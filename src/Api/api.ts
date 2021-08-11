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
type RegistrationResponseType = { addedUser: {} } & {
    error?: string
}

export const decksAPI = {
    getDecks(data: GetDecksRequestDataType) {
        let id = data.user_id ? `&user_id=${data.user_id}` : ""
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
export type DeckDataType = {
    name: string
    private: boolean
}

export type UpdateDeckRequestData = {
    cardsPack: {
        _id: string
        name: string
        private: boolean
    }
}

export const cardsAPI = {
    getCards(data: GetCardsRequestDataType) {
        let id = data.cardsPack_id ? `&cardsPack_id=${data.cardsPack_id}` : ""
        let min = data.min ? `&min=${data.min}` : ""
        let max = data.max ? `&max=${data.max}` : ""
        let cardAnswer = data.cardAnswer ? `&cardAnswer=${data.cardAnswer}` : ""
        let cardQuestion = data.cardQuestion ? `&cardQuestion=${data.cardQuestion}` : ""
        return instanse.get<GetCardsResponseType>(`/cards/card?pageCount=7&page=${data.pageNumber}${id}${min}${max}${cardAnswer}${cardQuestion}`)
    },
    createCard(data: CreateCardDataType) {
        return instanse.post(`/cards/card`, {card: data})
    },
    removeCard(id: string) {
        return instanse.delete(`/cards/card?id=${id}`)
    },
    updateCard(data: UpdateCardRequestType) {
        return instanse.put(`/cards/card`, {card: data})
    },
    updateRating(data: UpdateRatingType) {
        return instanse.put(`/cards/grade`, data)
    }
}

export type GetCardsRequestDataType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    pageNumber?: number
}
export type GetCardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    _id: string
}

export type CreateCardDataType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
export type UpdateCardRequestType = {
    _id: string
    question?: string
    answer?: string
}

export type UpdateRatingType = {
    grade: GradeType
    card_id: string
}

export type GradeType = 1 | 2 | 3 | 4 | 5