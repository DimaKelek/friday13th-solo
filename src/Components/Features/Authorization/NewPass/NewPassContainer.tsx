import React from "react";
import {NewPass} from "./NewPass";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import {recovery} from "../../../../Store/RecoveryPass/recovery-pass-reducer";
import {Redirect, useParams} from "react-router-dom";
import {selectStatus} from "../../../../Store/App/selectors";
import {selectIsRecovered} from "../../../../Store/RecoveryPass/selectors";
import {useMyDispatch} from "../../../Common/Hooks/myDispatch";

export type NewPassFormikErrorType = {
    password?: string
}

export const NewPassContainer = () => {
    const status = useSelector(selectStatus)
    const isRecovered = useSelector(selectIsRecovered)
    const dispatch = useMyDispatch()
    const {token} = useParams<{token: string}>()

    const formik = useFormik({
            initialValues: {
                password: "",
            },
            validate: values => {
                const errors: NewPassFormikErrorType = {}
                if (!values.password) {
                    errors.password = "Password is required"
                } else if (values.password.length < 7) {
                    errors.password = "Password should be more 6 symbols"
                }
                return errors
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
            getFieldProps={formik.getFieldProps}
            submit={formik.handleSubmit}
            status={status}
            errors={formik.errors}
            passwordValue={formik.values.password}
        />
    )
}