import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";
import {removeDeck, updateDeck} from "../../../../../Store/decks-reducer";
import {UpdateDeckRequestData} from "../../../../../Api/api";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
}

export const ActionsPanel: React.FC<ActionsPanelType> = props => {
    const {deckID, makerDeckID} = props
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const dispatch = useDispatch()

    const deleteButtonHandler = () => {
        if (userID === makerDeckID && deckID) {
            dispatch(removeDeck(deckID))
        }

    }
    const editButtonHandler = () => {
        if (userID === makerDeckID && deckID) {
            let data: UpdateDeckRequestData = {
                cardsPack: {
                    _id: deckID,
                    name: "New name Kelek Deck"
                }
            }
            dispatch(updateDeck(data))
        }
    }
    return (
        <div className={S.buttonsPanel}>
            {userID === makerDeckID && <>
                <MyButton onClick={deleteButtonHandler} className={S.deleteButton}>Delete</MyButton>
                <MyButton onClick={editButtonHandler} variant={"standard"}>Edit</MyButton></>
            }
            <MyButton onClick={() => alert("Coming soon bro))")} variant={"purple"}>Learn</MyButton>
        </div>
    )
}
