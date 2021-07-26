import React from "react";
import {Login} from "./Login";
import {useFormik} from "formik";
import {login} from "../../../../Store/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";

export type LoginFormikErrorType = {
    email?: string
    password?: string
}

export const LoginContainer = () => {
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: LoginFormikErrorType = {};
            if(!values.email) {
                errors.email = "Email is required"
            } else if(!values.password) {
                errors.password = "Password is required"
            } else if(values.password.length < 7) {
                errors.password = "Password should be more 7 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        }
    })
    return (
        <Login
            submit={formik.handleSubmit}
            emailValue={formik.values.email}
            passwordValue={formik.values.password}
            rememberMeValue={formik.values.rememberMe}
            changeHandler={formik.handleChange}
            isLoggedIn={isLoggedIn}
            status={status}
            errors={formik.errors}
        />
    )
}