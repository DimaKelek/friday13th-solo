import React from "react";
import S from "./RecoveryPass.module.css"
import authS from "../AuthCommon/Styles/AuthBox.module.css";
import {Paper} from "@material-ui/core";
import {createField} from "../AuthCommon/Field/Field";
import CircularProgress from "@material-ui/core/CircularProgress";
import {NavLink} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {forgotPass} from "../../../../Store/recovery-pass-reducer";

type RecoveryPassPropsType = {}
type FormikErrorType = {
    email?: string
}
export const RecoveryPass: React.FC<RecoveryPassPropsType> = props => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const messageIsSand = useSelector<AppStoreType, boolean>(state => state.recovery.messageIsSand)
    const dispatch = useDispatch()

    const message = `<div style="background-color: lime; padding: 15px">
            password recovery link:	<a href='http://localhost:3000/#/new-password/$token$'>link</a>
            </div>`
    const formik = useFormik({
            initialValues: {
                email: "",
            },
            validate: (values) => {
                const errors: FormikErrorType = {};
                if (!values.email) {
                    errors.email = "Email is required"
                } else if (values.email.length < 11) {
                    errors.email = "Email should be more 10 symbols"
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(forgotPass({email: values.email, from: "kelek", message}))
                formik.resetForm()
            }
        }
    )
    return (
        <div className={`${S.recoveryPass} ${authS.authPageItem}`}>
            <Paper className={`${S.recoveryPass_form} ${authS.authPageForm}`}>
                {!messageIsSand
                    ? <>
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className={S.incubator}>It-incubator</h3>
                            <h3>Sign Up</h3>
                            <div className={authS.fields}>
                                {createField("email", formik.values.email, formik.handleChange,
                                    "light", "Email", "text", formik.handleBlur)}
                            </div>
                            <span className={S.instruction}>
                                Enter your email address and we will send you further instructions
                            </span>
                            <div className={S.button_box}>
                                {status === "loading"
                                    ? <CircularProgress/>
                                    : <MyButton variant="purple" type="submit">Send Instructions</MyButton>
                                }
                            </div>
                        </form>
                        <span className={S.rememberPass}>Did you remember your password?</span>
                        <NavLink to="/login"><span className={S.tryLogin}>Try logging in</span></NavLink>
                    </>
                    : <>
                        <img src="" alt=""/>
                    </>
                }
            </Paper>
        </div>
    )
}