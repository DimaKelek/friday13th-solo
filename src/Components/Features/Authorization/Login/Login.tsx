import React from "react";
import S from "./Login.module.css"
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyCheckbox} from "../../../Common/MyCheckbox/MyCheckbox";
import {ElementColorVariants, MyButton} from "../../../Common/MyButton/MyButton";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import { login } from "../../../../Store/auth-reducer";

type LoginPropsType = {}

export const Login: React.FC<LoginPropsType> = props => {
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
    const createField = (nameField: string, variant?: ElementColorVariants, placeholder?: string, type?: string) => {
        return (
            <MyTextInput
                variant={variant}
                placeholder={placeholder}
                type={type}
                {...formik.getFieldProps(nameField)}
            />
        )
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
                <div className={S.button}><MyButton variant="purple" type="submit">Log in</MyButton></div>
            </form>
        </div>
    )
}