import React, {ChangeEventHandler, FocusEventHandler} from "react";
import S from "./NewPass.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"
import {createField} from "../AuthCommon/Field/Field";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {NavLink} from "react-router-dom";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {NewPassFormikErrorType} from "./NewPassContainer";

type NewPassPropsType = {
    submit: FocusEventHandler<HTMLFormElement>
    changeHandler: ChangeEventHandler<HTMLInputElement>
    passwordValue: string
    status: RequestStatusType
    errors: NewPassFormikErrorType
}

export const NewPass: React.FC<NewPassPropsType> = React.memo(props => {
    const {submit, passwordValue, changeHandler, status, errors} = props
    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Create new password</h4>
                <form onSubmit={submit}>
                    <div className={Sc.fields}>
                        {createField("password", passwordValue, errors.password, changeHandler, "light", "Password", "password")}
                    </div>
                    <span className={S.instruction}>
                        Create new password and we will send you further instructions to email
                    </span>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <MyButton variant="purple" type="submit">Create new password</MyButton>
                        }
                    </div>
                </form>
                <div className={Sc.link_box}>
                    <span className={Sc.title}>Did you remember your password?</span>
                    <NavLink to="/login"><span className={Sc.link}>Try logging in</span></NavLink>
                </div>
            </div>
        </div>
    )
})