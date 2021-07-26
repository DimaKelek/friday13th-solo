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