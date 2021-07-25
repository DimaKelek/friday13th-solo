import React from "react";
import S from "./Registration.module.css"
import authS from "../AuthCommon/Styles/AuthBox.module.css"
import CircularProgress from "@material-ui/core/CircularProgress";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {useFormik} from "formik";
import {createField} from "../AuthCommon/Field/Field";
import {Redirect} from "react-router-dom";
import {registration} from "../../../../Store/registration-reducer";
import {ErrorSnackbar} from "../../../Common/ErrorSnackbar/ErrorSnackbar";
import {Paper} from "@material-ui/core";
import {NavLink} from "react-router-dom";

type RegistrationPropsType = {}
type FormikErrorType = {
    email?: string
    password?: string
}

export const Registration: React.FC<RegistrationPropsType> = props => {
    const register = useSelector<AppStoreType, boolean>(state => state.registration.register)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.password.length < 7) {
                errors.password = "Password should be more 6 symbols"
            } else if (values.password !== values.confirmPassword) {
                errors.password = "Password is not confirmed"
            } else if (!values.email) {
                errors.email = "Email is required"
            } else if (values.email.length < 11) {
                errors.email = "Email should be more 10 symbols"
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
    return (
        <div className={`${S.registration} ${authS.authPageItem}`}>
            <Paper className={`${S.registration_form} ${authS.authPageForm}`}>
                <form onSubmit={formik.handleSubmit}>
                    <h3 className={S.incubator}>It-incubator</h3>
                    <h3>Sign Up</h3>
                    <div className={authS.fields}>
                        {createField("email", formik.values.email, formik.handleChange,
                            "light", "Email", "text", formik.handleBlur)}
                        {createField("password", formik.values.password, formik.handleChange,
                            "light", "Password", "password", formik.handleBlur)}
                        {createField("confirmPassword", formik.values.confirmPassword, formik.handleChange,
                            "light", "Confirm Password", "password", formik.handleBlur)}
                    </div>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <>
                                <NavLink to="/login"><MyButton variant="light" type="button">Cancel</MyButton></NavLink>
                                <MyButton variant="purple" type="submit">Registration</MyButton>
                            </>
                        }
                    </div>
                </form>
            </Paper>
            {formik.errors.email && formik.touched.email && <ErrorSnackbar error={formik.errors.email}/>}
            {formik.errors.password && formik.touched.password && formik.touched.confirmPassword &&
            <ErrorSnackbar error={formik.errors.password}/>}
        </div>
    )
}