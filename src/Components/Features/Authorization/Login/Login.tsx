import React from "react";
import S from "./Login.module.css"
import authS from "../AuthCommon/Styles/AuthBox.module.css"
import {MyCheckbox} from "../../../Common/MyCheckbox/MyCheckbox";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../../Store/auth-reducer";
import {AppStoreType} from "../../../../Store/store";
import {Redirect} from "react-router-dom";
import {RequestStatusType} from "../../../../Store/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {createField} from "../AuthCommon/Field/Field";
import {ErrorSnackbar} from "../../../Common/ErrorSnackbar/ErrorSnackbar";

type LoginPropsType = {}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login: React.FC<LoginPropsType> = props => {
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
            const errors: FormikErrorType = {};
            if(values.password.length < 7) {
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
        debugger
        return <Redirect to="/profile"/>
    }
    return (
        <div className={`${S.login} ${authS.authPageItem}`}>
            <form onSubmit={formik.handleSubmit} className={`${S.login_form} ${authS.authPageForm}`}>
                <h3>Login</h3>
                {createField("email", formik.values.email, formik.handleChange, "light", "Email")}
                {createField("password", formik.values.password, formik.handleChange, "light", "Password", "password")}
                <div className={S.check}>
                    <MyCheckbox
                        {...formik.getFieldProps("rememberMe")}
                    >Remember me</MyCheckbox>
                </div>
                <div className={S.button}>
                    {status === "loading"
                        ? <CircularProgress/>
                        : <MyButton variant="purple" type="submit">Log in</MyButton>
                    }
                </div>
            </form>
            {formik.errors.password && formik.touched.password && <ErrorSnackbar error={formik.errors.password}/>}
            {formik.errors.email && formik.touched.email && <ErrorSnackbar error={formik.errors.email}/>}
        </div>
    )
}

