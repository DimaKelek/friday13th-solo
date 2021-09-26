import React from "react";
import {Registration} from "./Registration";
import {useFormik} from "formik";
import {registration} from "../../../../Store/Registration/registration-reducer";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {useMyDispatch} from "../../../Common/Hooks/myDispatch";
import {selectStatus} from "../../../../Store/App/selectors";
import {selectRegister} from "../../../../Store/Registration/selectors";

export type RegisterFormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegistrationContainer = () => {
    const status = useSelector(selectStatus)
    const register = useSelector(selectRegister)
    const dispatch = useMyDispatch()

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
                dispatch(registration({email: values.email, password: values.password}))
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