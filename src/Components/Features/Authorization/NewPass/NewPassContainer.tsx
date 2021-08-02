import React from "react";
import {NewPass} from "./NewPass";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {useFormik} from "formik";
import {recovery} from "../../../../Store/recovery-pass-reducer";
import {Redirect, useParams} from "react-router-dom";

export type NewPassFormikErrorType = {
    password?: string
}

export const NewPassContainer = () => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const isRecovered = useSelector<AppStoreType, boolean>(state => state.recovery.passIsRecovered)
    const dispatch = useDispatch()
    const {token} = useParams<{token: string}>()

    const formik = useFormik({
            initialValues: {
                password: "",
            },
            validate: (values) => {
                const errors: NewPassFormikErrorType = {};
                if (!values.password) {
                    errors.password = "Password is required"
                } else if (values.password.length < 7) {
                    errors.password = "Password should be more 6 symbols"
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(recovery({password: values.password, resetPasswordToken: token}))
                formik.resetForm()
            }
        }
    )

    if(isRecovered) {
        return <Redirect to="/login" />
    }
    return (
        <NewPass
            submit={formik.handleSubmit}
            changeHandler={formik.handleChange}
            passwordValue={formik.values.password}
            status={status}
            errors={formik.errors}
        />
    )
}