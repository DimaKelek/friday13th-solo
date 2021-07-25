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
import {Paper} from "@material-ui/core";
import {NavLink} from "react-router-dom";

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
        return <Redirect to="/profile"/>
    }
    return (
        <div className={`${S.login} ${authS.authPageItem}`}>
            <Paper className={`${S.login_form} ${authS.authPageForm}`}>
                <form onSubmit={formik.handleSubmit}>
                    <h3 className={S.incubator}>It-incubator</h3>
                    <h3>Sign In</h3>
                    <div className={authS.fields}>
                        {createField("email", formik.values.email, formik.handleChange, "light", "Email")}
                        {createField("password", formik.values.password, formik.handleChange, "light", "Password", "password")}
                        <div className={S.check}>
                            <MyCheckbox
                                {...formik.getFieldProps("rememberMe")}
                            >Remember me</MyCheckbox>
                        </div>
                        <NavLink to="/recovery"><span className={S.forgot}>Forgot Password</span></NavLink>
                    </div>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <MyButton className={S.button} variant="purple" type="submit">Log in</MyButton>
                        }
                    </div>
                </form>
                <span>Don't have an account?</span>
                <NavLink to="/registration"><span className={S.signUp}>Sign Up</span></NavLink>
            </Paper>

            {formik.errors.password && formik.touched.password && <ErrorSnackbar error={formik.errors.password}/>}
            {formik.errors.email && formik.touched.email && <ErrorSnackbar error={formik.errors.email}/>}
        </div>
    )
}

