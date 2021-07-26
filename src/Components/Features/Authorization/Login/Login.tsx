import React, {ChangeEventHandler, FocusEventHandler} from "react";
import S from "./Login.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"
import {MyCheckbox} from "../../../Common/MyCheckbox/MyCheckbox";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {NavLink} from "react-router-dom";
import {RequestStatusType} from "../../../../Store/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {createField} from "../AuthCommon/Field/Field";
import {LoginFormikErrorType} from "./LoginContainer";

type LoginPropsType = {
    submit: FocusEventHandler<HTMLFormElement>
    changeHandler: ChangeEventHandler<HTMLInputElement>
    emailValue: string
    passwordValue: string
    rememberMeValue: boolean
    status: RequestStatusType
    errors: LoginFormikErrorType
}

export const Login: React.FC<LoginPropsType> = React.memo(props => {
    const {submit, emailValue, passwordValue, rememberMeValue, changeHandler, status, errors} = props

    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Sign In</h4>
                <form onSubmit={submit}>
                    <div className={Sc.fields}>
                        {createField("email", emailValue, errors.email, changeHandler, "light", "Email")}
                        {createField("password", passwordValue, errors.password, changeHandler, "light", "Password", "password")}
                        <NavLink to="/recovery"><span className={S.forgot}>Forgot Password</span></NavLink>
                    </div>
                    <div className={S.checkbox}>
                        <MyCheckbox name="rememberMe" checked={rememberMeValue}
                                    onChange={changeHandler}>Remember me</MyCheckbox>
                    </div>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <MyButton className={S.button} variant="purple" type="submit">Log in</MyButton>
                        }
                    </div>
                </form>
                <div className={Sc.link_box}>
                    <span className={Sc.title}>Don't have an account?</span>
                    <NavLink to="/registration"><span className={Sc.link}>Sign Up</span></NavLink>
                </div>
            </div>
        </div>
    )
})