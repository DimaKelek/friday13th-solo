import React, {useEffect} from "react";
import {Login} from "./Login";
import {useFormik} from "formik";
import {login} from "../../../../Store/Auth/auth-reducer";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {useMyDispatch} from "../../../Common/Hooks/myDispatch";
import {changeRegisterStatus} from "../../../../Store/Registration/registration-reducer";
import {selectIsLoggedIn} from "../../../../Store/Auth/selectors";

export type LoginFormikErrorType = {
    email?: string
    password?: string
}

export const LoginContainer = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useMyDispatch()

    useEffect(() => {
        dispatch(changeRegisterStatus(false))
    }, [dispatch])

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

    if(isLoggedIn) {
        return <Redirect to="/app/profile"/>
    }
    return (
        <Login
            submit={formik.handleSubmit}
            errors={formik.errors}
            getFieldProps={formik.getFieldProps}
        />
    )
}