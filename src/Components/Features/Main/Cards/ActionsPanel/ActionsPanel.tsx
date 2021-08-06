import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";
import {removeDeck, updateDeck} from "../../../../../Store/decks-reducer";
import {UpdateCardRequestType, UpdateDeckRequestData} from "../../../../../Api/api";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {removeCard, updateCard} from "../../../../../Store/cards-reducer";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
    cardID: string | undefined
}

export const CardActionsPanel: React.FC<ActionsPanelType> = props => {
    const {deckID, makerDeckID, cardID} = props
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const dispatch = useDispatch()

    const deleteButtonHandler = () => {
        if (userID === makerDeckID && deckID && cardID) {
            dispatch(removeCard(cardID))
        }

    }
    const editButtonHandler = () => {
        if (userID === makerDeckID && deckID) {
            let data: UpdateCardRequestType = {
                card: {
                    _id: cardID ?? "",
                    question: "New Kelek Question"
                }
            }
            dispatch(updateCard(data))
        }
    }
    return (
        <div className={S.buttonsPanel}>
            {userID === makerDeckID ? <>
                <MyButton onClick={deleteButtonHandler} className={S.deleteButton}>Delete</MyButton>
                <MyButton onClick={editButtonHandler} variant={"standard"}>Edit</MyButton></> : <div>This is not your deck man</div>
            }
        </div>
    )
}
