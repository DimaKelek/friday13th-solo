import axios from "axios"
import {UserDataType} from "../Store/auth-reducer";

const instanse = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})

export const authAPI = {
    login(authData: AuthDataType) {
        return instanse.post<LoginResponseType>(`/auth/login`, authData)
    },
    // registration(registerData: RegisterDataType) {
    //     return instanse.post<RegistrationResponseType>(`/auth/register`, registerData)
    // }
}

// types

//login
export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginResponseType = UserDataType & {
    error?: string
}
//register
// type RegisterDataType = {
//     email: string
//     password: string
// }
// type ErrorResponseType = {
//     error: string
//     in: string
//     isPassValid: boolean
//     isEmailValid: boolean
//     emailRegExp: {}
//     passwordRegExp: string
// }
// type SuccessResponseType = {
//     addedUser: {}
// }
// type RegistrationResponseType = SuccessResponseType | ErrorResponseType