import React from "react";
import {Registration} from "./Registration";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {useActions} from "../../../Common/Hooks/hooks";
import {registerActions, selectRegister, selectStatus} from ".";

export type RegisterFormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegistrationContainer = () => {
    const status = useSelector(selectStatus)
    const register = useSelector(selectRegister)
    const {registration} = useActions(registerActions)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: RegisterFormikErrorType = {};
            if (formik.touched.email && !values.email) {
                errors.email = "Email is required"
            } else if (formik.touched.email && values.email.length < 11) {
                errors.email = "Email should be more 10 symbols"
            } else if (formik.touched.password && !values.password) {
                errors.password = 'Password is required'
            } else if (formik.touched.password && values.password.length < 8) {
                errors.password = 'Password must be at least 8 symbols'
            } else if (formik.touched.confirmPassword && (values.password && !values.confirmPassword)) {
                errors.confirmPassword = 'Confirm your password'
            } else if (formik.touched.confirmPassword && (values.password !== values.confirmPassword)) {
                errors.confirmPassword = 'You entered two different passwords.'
            }
            return errors;
        },
        onSubmit: values => {
            if (values.password === values.confirmPassword) {
                registration({email: values.email, password: values.password})
                formik.resetForm()
            }
        }
    })
    if (register) {
        return <Redirect to="/login"/>
    }

    const getDisabled = (errors: RegisterFormikErrorType, values = formik.values) => {
        const {email, password, confirmPassword} = values
        if(email === "" || password === "" || confirmPassword === "") return true
        else return !!(errors.email || errors.password || errors.confirmPassword);
    }

    return (
        <Registration
            disabled={getDisabled(formik.errors)}
            getFieldProps={formik.getFieldProps}
            submit={formik.handleSubmit}
            errors={formik.errors}
            status={status}
        />
    )
}