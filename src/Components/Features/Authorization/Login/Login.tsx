import React from "react";
import S from "./Login.module.css"
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyCheckbox} from "../../../Common/MyCheckbox/MyCheckbox";
import {ElementColorVariants, MyButton} from "../../../Common/MyButton/MyButton";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../../Store/auth-reducer";
import {AppStoreType} from "../../../../Store/store";
import {Redirect} from "react-router-dom";
import {RequestStatusType} from "../../../../Store/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";

type LoginPropsType = {}

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
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        }
    })
    const createField = (name: string, variant?: ElementColorVariants, placeholder?: string, type?: string) => {
        return (
            <MyTextInput
                variant={variant}
                placeholder={placeholder}
                type={type}
                {...formik.getFieldProps(name)}
            />
        )
    }

    if(isLoggedIn) {
        return <Redirect to="/profile"/>
    }
    return (
        <div className={S.login}>
            <form onSubmit={formik.handleSubmit} className={S.login_form}>
                <h3>Login</h3>
                {createField("email", "light", "Email")}
                {createField("password", "light", "Password", "password")}
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
        </div>
    )
}