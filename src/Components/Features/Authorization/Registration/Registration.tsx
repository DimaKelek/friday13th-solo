import React, {FocusEventHandler} from "react";
import S from "./Registration.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"
import CircularProgress from "@material-ui/core/CircularProgress";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {NavLink} from "react-router-dom";
import {RegisterFormikErrorType} from "./RegistrationContainer";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {FieldInputProps} from "formik/dist/types";

type RegistrationProps = {
    getFieldProps: (nameOrOptions: string) => FieldInputProps<any>
    submit: FocusEventHandler<HTMLFormElement>
    status: RequestStatusType
    errors: RegisterFormikErrorType
    disabled: boolean
}

export const Registration: React.FC<RegistrationProps> = React.memo(props => {
    const {submit, status, errors, getFieldProps, disabled} = props

    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Sign Up</h4>
                <form onSubmit={submit}>
                    <div className={Sc.fields}>
                        <MyTextInput variant={"light"} type={"Text"}  error={errors.email}
                                     {...getFieldProps("email")} placeholder={"Email"} style={{minWidth: 300}}/>
                        <MyTextInput variant={"light"} type={"Password"}  error={errors.password}
                                     {...getFieldProps("password")} placeholder={"Password"} style={{minWidth: 300}}/>
                        <MyTextInput variant={"light"} type={"Password"} error={errors.confirmPassword} style={{minWidth: 300}}
                                     {...getFieldProps("confirmPassword")} placeholder={"Confirm Password"} />
                    </div>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <>
                                <NavLink to="/login">
                                    <MyButton className={S.cancel} variant="light" type="button">Cancel</MyButton>
                                </NavLink>
                                <MyButton variant="purple"
                                          type="submit"
                                          disabled={disabled}
                                >Registration</MyButton>
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