import {RequestStatusType} from "../../../../../Store/app-reducer";
import React from "react";
import {useDispatch} from "react-redux";
import {CreateDeckRequestData} from "../../../../../Api/api";
import {createDeck} from "../../../../../Store/decks-reducer";
import S from "./SearchWithButton.module.css";
import {MyTextInput} from "../../../../Common/MyTextInput/MyTextInput";
import {MyButton} from "../../../../Common/MyButton/MyButton";

type SearchWithButtonPropsType = {
    status: RequestStatusType
    buttonTitle: string
}
export const SearchWithButton: React.FC<SearchWithButtonPropsType> = props => {
    const {status, buttonTitle} = props
    const dispatch = useDispatch()
    const createDeckHandler = () => {
        let data: CreateDeckRequestData = {
            cardsPack: {
                name: "Kelek Deck",
                private: false,
                deckCover: ""
            }
        }
        dispatch(createDeck(data))
    }

    return (
        <div className={S.search_box}>
            <MyTextInput
                variant={"light"}
                placeholder={"Search..."}
                style={{width: "450px", marginRight: "20px"}}
            />
            <MyButton variant={"standard"} disabled={status === "loading"}
                      onClick={createDeckHandler}>{buttonTitle}</MyButton>
        </div>
    )
}