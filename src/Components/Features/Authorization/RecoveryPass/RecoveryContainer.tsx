import React from "react";
import {RecoveryPass} from "./RecoveryPass";
import {useFormik} from "formik";
import {forgotPass} from "../../../../Store/recovery-pass-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";

export type RecoveryFormikErrorType = {
    email?: string
}

export const RecoveryContainer = () => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const isSand = useSelector<AppStoreType, boolean>(state => state.recovery.messageIsSand)
    const dispatch = useDispatch()

    const message = `<div style="background-color: lime; padding: 15px">
            password recovery link:	<a href='https://dimakelek.github.io/friday13th-kelek/#/new-password/$token$'>link</a>
            </div>`

    const formik = useFormik({
            initialValues: {
                email: "",
            },
            validate: (values) => {
                const errors: RecoveryFormikErrorType = {};
                if (!values.email) {
                    errors.email = "Email is required"
                } else if (values.email.length < 11) {
                    errors.email = "Email should be more 10 symbols"
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(forgotPass({email: values.email, from: "kelek", message}))
            }
        }
    )

    return (
        <RecoveryPass
            errors={formik.errors}
            emailValue={formik.values.email}
            submit={formik.handleSubmit}
            status={status}
            changeHandler={formik.handleChange}
            isSand={isSand}
        />
    )
}