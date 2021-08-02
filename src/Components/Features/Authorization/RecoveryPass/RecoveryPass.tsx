import React, {ChangeEventHandler, FocusEventHandler} from "react";
import S from "./RecoveryPass.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css";
import {createField} from "../AuthCommon/Field/Field";
import CircularProgress from "@material-ui/core/CircularProgress";
import {NavLink} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {RecoveryFormikErrorType} from "./RecoveryContainer";
import message from "./message.svg"

type RecoveryPassPropsType = {
    submit: FocusEventHandler<HTMLFormElement>
    changeHandler: ChangeEventHandler<HTMLInputElement>
    emailValue: string
    status: RequestStatusType
    errors: RecoveryFormikErrorType
    isSand: boolean
}

export const RecoveryPass: React.FC<RecoveryPassPropsType> = React.memo(props => {
    const {submit, emailValue, changeHandler, status, errors, isSand} = props

    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                {!isSand
                    ? <div>
                        <h4>Recovery password</h4>
                        <form onSubmit={submit}>
                            <div className={Sc.fields}>
                                {createField("email", emailValue, errors.email, changeHandler, "light", "Email", "text")}
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
                        <div className={Sc.link_box}>
                            <span className={Sc.title}>Did you remember your password?</span>
                            <NavLink to="/login"><span className={Sc.link}>Try logging in</span></NavLink>
                        </div>
                    </div>
                    : <Message email={emailValue}/>
                }
            </div>
        </div>
    )
})

type MessagePropsType = {
    email: string
}

const Message = (props: MessagePropsType) => {
    return (
        <div className={S.message}>
            <img src={message} alt="message"/>
            <h4>Check your Email</h4>
            <span className={S.instruction}>
                We’ve sent an Email with instructions to {props.email}
            </span>
        </div>
    )
}