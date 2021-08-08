import React from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {MyModal} from "../Modal/MyModal";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyTextarea} from "../../../Common/MyTextarea/MyTextarea";
import S from "./CommanModalFrom.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {useFormik} from "formik";
import {CardsStateType} from "../../../../Store/cards-reducer";
import {CardType} from "../../../../Api/api";

type CommonModalFormProps = {
    title: string
    setShow: (value: boolean) => void
    submitForm: (question: string, answer: string,
                 makerDeckID?: string | undefined, cardID?: string | undefined) => void
}
type errorsFormType = {
    question?: string
    answer?: string
}

export const CommonModalForm: React.FC<CommonModalFormProps> = props => {
    const {title, setShow, submitForm} = props
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const cardID = useSelector<AppStoreType, string>(state => state.cards.selectedCardID)
    const maker = useSelector<AppStoreType, string>(state => state.cards.packUserId)
    const cards = useSelector<AppStoreType, CardType[] | null>(state => state.cards.cards)
    const qa: string[] = []
    cards?.forEach(c => {
        if(c._id === cardID) {
            qa.push(c.question)
            qa.push(c.answer)
        }
    })
    const commonCardForm = useFormik({
        initialValues: {
            question: title === "Add new Card" ? "" : qa[0],
            answer: title === "Add new Card" ? "" : qa[1]
        },
        validate: values => {
            const errors: errorsFormType = {}
            if(!values.question) {
                errors.question = "Question is required!"
            }
            if(!values.answer) {
                errors.answer = "Answer is  required"
            }
            return errors
        },
        onSubmit: values => {
            if(title === "Edit Card") {
                submitForm(values.question, values.answer, maker, cardID)
            } else {
                submitForm(values.question, values.answer)
            }
            commonCardForm.resetForm()
        }
    })

    return (
        <MyModal closeModal={() => setShow(false)}
                 title={title} width="350px" height="450px"
        >
            <form onSubmit={commonCardForm.handleSubmit}>
                <MyTextInput
                    {...commonCardForm.getFieldProps("question")}
                    value={commonCardForm.values.question}
                    style={{width: "300px"}}
                    placeholder="Question ..."
                    error={commonCardForm.touched.question ? commonCardForm.errors.question : null}
                />
                <MyTextarea
                    {...commonCardForm.getFieldProps("answer")}
                    value={commonCardForm.values.answer}
                    placeholder="Answer ..."
                    error={commonCardForm.touched.answer ? commonCardForm.errors.answer : null}
                />
                <div className={S.addCard}>
                    {status === "loading"
                        ? <CircularProgress/>
                        : <MyButton variant="purple" type="submit">{title}</MyButton>
                    }
                </div>
            </form>
        </MyModal>
    )
}