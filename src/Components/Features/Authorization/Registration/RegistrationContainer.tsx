import React from "react";
import {Registration} from "./Registration";
import {useFormik} from "formik";
import {registration} from "../../../../Store/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {Redirect} from "react-router-dom";
import {RequestStatusType} from "../../../../Store/app-reducer";

export type RegisterFormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegistrationContainer = () => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const register = useSelector<AppStoreType, boolean>(state => state.registration.register)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: RegisterFormikErrorType = {};
            if (!values.email) {
                errors.email = "Email is required"
            } else if (values.email.length < 11) {
                errors.email = "Email should be more 10 symbols"
            } else if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 symbols'
            } else if (values.password && !values.confirmPassword) {
                errors.confirmPassword = 'Confirm your password'
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'You entered two different passwords.'
            }
            return errors;
        }
        ,
        onSubmit: values => {
            if (values.password === values.confirmPassword) {
                dispatch(registration({email: values.email, password: values.password}))
                formik.resetForm()
            }
        }
    })

    if (register) {
        return <Redirect to="/login"/>
    }
    return (
        <Registration
            changeHandler={formik.handleChange}
            passwordValue={formik.values.password}
            submit={formik.handleSubmit}
            errors={formik.errors}
            status={status}
            confPassValue={formik.values.confirmPassword}
            emailValue={formik.values.email}
        />
    )
}