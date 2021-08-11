import React from "react";
import {MyModal} from "../Modal/MyModal";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {useFormik} from "formik";
import {MyRadioButton} from "../../../Common/MyRadioButton/MyRadioButton";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import S from "./CommonModalDeckForm.module.css"
import {DeckType} from "../../../../Api/api";

type errorsDeckForm = {
    deckName?: string
}

type Option = "Public" | "Private"

type CommonModalDeckFromProps = {
    title: string
    type: "Add" | "Edit"
    setShow: (value: boolean) => void
    submit: (name: string, privacy: boolean) => void
}

export const CommonModalDeckForm: React.FC<CommonModalDeckFromProps> = props => {
    const {setShow, type, title, submit} = props
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const options: Option[] = ["Public", "Private"]
    const decks = useSelector<AppStoreType, DeckType[] | null>(state => state.decks.decks)
    const selectedDeckID = useSelector<AppStoreType, string>(state => state.decks.selectedDeckID)

    let name: string = ""
    decks && decks.forEach(d => {
        if(d._id === selectedDeckID) {
           name = d.name
        }
    })

    const commonDeckForm = useFormik({
        initialValues: {
            deckName: type === "Add" ? "" : name,
            privacy: "Public"
        },
        validate: values => {
            const errors: errorsDeckForm = {}
            if (!values.deckName) {
                errors.deckName = "Deck name is required!!"
            }
            return errors
        },
        onSubmit: values => {
            submit(values.deckName, values.privacy === "Private")
        }
    })

    return (
        <MyModal closeModal={setShow} title="Add new Deck" width="350px" height="310px">
            <form onSubmit={commonDeckForm.handleSubmit} className={S.form}>
                <MyTextInput
                    {...commonDeckForm.getFieldProps("deckName")}
                    placeholder="Deck name ..."
                    style={{width: "300px"}}
                    error={commonDeckForm.touched.deckName ? commonDeckForm.errors.deckName : null}
                />
                <div className={S.radio}>
                    <MyRadioButton
                        {...commonDeckForm.getFieldProps("privacy")}
                        options={options}
                    />
                </div>
                {status === "loading"
                    ? <CircularProgress/>
                    : <div className={S.buttonBox}><MyButton variant="purple" type="submit">{title}</MyButton></div>
                }
            </form>
        </MyModal>
    )
}