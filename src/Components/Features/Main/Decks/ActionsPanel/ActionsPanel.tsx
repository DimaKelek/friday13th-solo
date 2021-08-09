import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";
import {removeDeck, setDeckID, updateDeck} from "../../../../../Store/decks-reducer";
import {UpdateDeckRequestData} from "../../../../../Api/api";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
    setEdit: (value: boolean) => void
}

export const ActionsPanel: React.FC<ActionsPanelType> = props => {
    const {deckID, makerDeckID, setEdit} = props
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const dispatch = useDispatch()

    const deleteButtonHandler = useCallback(() => {
        if (userID === makerDeckID && deckID) {
            dispatch(removeDeck(deckID))
        }
    }, [dispatch, makerDeckID, userID, deckID])
    const editButtonHandler = useCallback(() => {
        setEdit(true)
        dispatch(setDeckID(deckID ?? ""))
    }, [setEdit, dispatch, deckID])
    return (
        <div className={S.buttonsPanel}>
            {userID === makerDeckID && <>
                <MyButton onClick={deleteButtonHandler} className={S.deleteButton}>Delete</MyButton>
                <MyButton onClick={editButtonHandler} className={S.editButton} variant={"standard"}>Edit</MyButton>
            </>
            }
            <MyButton onClick={() => alert("Coming soon bro))")}
                      variant={"purple"} className={S.learnButton}>Learn</MyButton>
        </div>
    )
}
