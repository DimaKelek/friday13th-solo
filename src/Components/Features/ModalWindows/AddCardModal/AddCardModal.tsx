import React from "react";
import S from "./AddCardModal.module.css"
import {useFormik} from "formik";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyTextarea} from "../../../Common/MyTextarea/MyTextarea";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {MyModal} from "../Modal/MyModal";
import {useDispatch, useSelector} from "react-redux";
import {createCard, CreateCardData} from "../../../../Store/cards-reducer";
import {useParams} from "react-router-dom";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";

type errorsAddCardFormType = {
    question?: string
    answer?: string
}

type AddCardModalProps = {
    setShowAdd: (value: boolean) => void
}

export const AddCardModal: React.FC<AddCardModalProps> = props => {
    const {setShowAdd} = props
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const {deckID} = useParams<{deckID: string}>()
    const dispatch = useDispatch()

    const onAddCardClick = async (question: string, answer: string) => {
        const params: CreateCardData = {
            data: {
                question,
                answer,
                cardsPack_id: deckID,
                grade: 0,
                answerImg: "",
                answerVideo: "",
                questionImg: "",
                questionVideo: "",
                rating: 0,
                shots: 0,
                type: "card"
            },
            deckID
        }
        await dispatch(createCard(params))
        setShowAdd(false)
    }

    const addCardForm = useFormik({
        initialValues: {
            question: "",
            answer: ""
        },
        validate: values => {
            const errors: errorsAddCardFormType = {}
            if(!values.question) {
                errors.question = "Question is required!"
            }
            if(!values.answer) {
                errors.answer = "Answer is  required"
            }
            return errors
        },
        onSubmit: values => {
            onAddCardClick(values.question, values.answer)
            addCardForm.resetForm()
        }
    })

    return (
        <MyModal closeModal={() => setShowAdd(false)}
                 title={"Add new Card"} width="350px" height="450px"
        >
            <form onSubmit={addCardForm.handleSubmit}>
                <MyTextInput
                    {...addCardForm.getFieldProps("question")}
                    style={{width: "300px"}}
                    placeholder="Question ..."
                    error={addCardForm.touched.question ? addCardForm.errors.question : null}
                />
                <MyTextarea
                    {...addCardForm.getFieldProps("answer")}
                    placeholder="Answer ..."
                    error={addCardForm.touched.answer ? addCardForm.errors.answer : null}
                />
                <div className={S.addCard}>
                    {status === "loading"
                        ? <CircularProgress/>
                        : <MyButton variant="purple" type="submit">Add Card</MyButton>
                    }
                </div>
            </form>
        </MyModal>
    )
}