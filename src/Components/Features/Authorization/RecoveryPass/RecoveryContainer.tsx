import React from "react";
import {RecoveryPass} from "./RecoveryPass";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {useActions} from "../../../Common/Hooks/hooks";
import {recoveryActions, selectIsSand, selectStatus} from ".";

export type RecoveryFormikErrorType = {
    email?: string
}

export const RecoveryContainer = () => {
    const status = useSelector(selectStatus)
    const isSand = useSelector(selectIsSand)
    const {forgotPass} = useActions(recoveryActions)

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
                forgotPass({email: values.email, from: "kelek", message})
            }
        }
    )

    return (
        <RecoveryPass
            getFieldProps={formik.getFieldProps}
            errors={formik.errors}
            emailValue={formik.values.email}
            submit={formik.handleSubmit}
            status={status}
            isSand={isSand}
        />
    )
}