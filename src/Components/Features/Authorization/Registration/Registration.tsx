import React, {ChangeEventHandler, FocusEventHandler} from "react";
import S from "./Registration.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"
import CircularProgress from "@material-ui/core/CircularProgress";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {createField} from "../AuthCommon/Field/Field";
import {NavLink} from "react-router-dom";
import {RegisterFormikErrorType} from "./RegistrationContainer";

type RegistrationPropsType = {
    submit: FocusEventHandler<HTMLFormElement>
    changeHandler: ChangeEventHandler<HTMLInputElement>
    emailValue: string
    passwordValue: string
    confPassValue: string
    status: RequestStatusType
    errors: RegisterFormikErrorType
}

export const Registration: React.FC<RegistrationPropsType> = React.memo(props => {
    const {submit, changeHandler, emailValue, passwordValue, confPassValue, status, errors} = props

    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Sign Up</h4>
                <form onSubmit={submit}>
                    <div className={Sc.fields}>
                        {createField("email", emailValue, errors.email, changeHandler, "light", "Email", "text")}
                        {createField("password", passwordValue, errors.password, changeHandler, "light", "Password", "password")}
                        {createField("confirmPassword", confPassValue, errors.confirmPassword, changeHandler, "light", "Confirm Password", "password")}
                    </div>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <>
                                <NavLink to="/login">
                                    <MyButton className={S.cancel} variant="light" type="button">Cancel</MyButton>
                                </NavLink>
                                <MyButton variant="purple" type="submit">Registration</MyButton>
                            </>
                        }
                    </div>
                </form>
                <div className={Sc.link_box}>
                    <span className={Sc.title}>Are you already registered?</span>
                    <NavLink to="/login"><span className={Sc.link}>Sign In</span></NavLink>
                </div>
            </div>
        </div>
    )
})