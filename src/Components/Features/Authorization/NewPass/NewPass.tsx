import React, {FocusEventHandler} from "react";
import S from "./NewPass.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"
import CircularProgress from "@material-ui/core/CircularProgress";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {NavLink} from "react-router-dom";
import {RequestStatusType} from "../../../../Store/App/app-reducer";
import {NewPassFormikErrorType} from "./NewPassContainer";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {FieldInputProps} from "formik/dist/types";

type NewPassProps = {
    getFieldProps: (nameOrOptions: string) => FieldInputProps<any>
    submit: FocusEventHandler<HTMLFormElement>
    status: RequestStatusType
    errors: NewPassFormikErrorType
    passwordValue: string
}

export const NewPass: React.FC<NewPassProps> = React.memo(props => {
    const {submit, status, errors, getFieldProps, passwordValue} = props

    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Create new password</h4>
                <form onSubmit={submit}>
                    <div className={Sc.fields}>
                       <MyTextInput variant={"light"} error={errors.password} type={"password"} style={{minWidth: 300}}
                                    placeholder={"New Password"} {...getFieldProps("password")}/>
                    </div>
                    <span className={S.instruction}>
                        Create new password and we will send you further instructions to email
                    </span>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <MyButton variant="purple" type="submit" disabled={!passwordValue || !!errors.password}>
                                Create new password</MyButton>
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