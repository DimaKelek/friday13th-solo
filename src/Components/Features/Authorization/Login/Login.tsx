import React, {FocusEventHandler} from "react";
import S from "./Login.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"
import {MyCheckbox} from "../../../Common/MyCheckbox/MyCheckbox";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {NavLink} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {LoginFormikErrorType} from "./LoginContainer";
import {useSelector} from "react-redux";
import {FieldInputProps} from "formik/dist/types";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {selectStatus} from "../../../../Store/App/selectors";

type LoginProps = {
    getFieldProps: (nameOrOptions: string) => FieldInputProps<any>
    submit: FocusEventHandler<HTMLFormElement>
    errors: LoginFormikErrorType
}

export const Login: React.FC<LoginProps> = React.memo(props => {
    const {submit, getFieldProps, errors} = props
    const status = useSelector(selectStatus)

    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Sign In</h4>
                <form onSubmit={submit}>
                    <div className={Sc.fields}>
                        <MyTextInput variant={"light"} error={errors.email} type={"Text"}
                                     placeholder={"Email"} {...getFieldProps("email")} style={{minWidth: 300}}/>
                        <MyTextInput variant={"light"} error={errors.password} type={"Password"}
                                     placeholder={"Password"} {...getFieldProps("password")} style={{minWidth: 300}}/>
                        <NavLink to="/recovery"><span className={S.forgot}>Forgot Password</span></NavLink>
                    </div>
                    <div className={S.checkbox}>
                        <MyCheckbox {...getFieldProps("rememberMe")}>Remember me</MyCheckbox>
                    </div>
                    <div className={S.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <MyButton className={S.button}
                                        variant="purple"
                                        type="submit"
                                        disabled={!!(errors.email || errors.password)}
                            >Log in</MyButton>
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