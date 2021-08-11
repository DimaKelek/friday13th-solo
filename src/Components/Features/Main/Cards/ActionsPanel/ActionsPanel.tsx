import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {removeCard, setSelectedCardID} from "../../../../../Store/cards-reducer";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
    cardID: string | undefined
    setEdit: (value: boolean) => void
}

export const CardActionsPanel: React.FC<ActionsPanelType> = props => {
    const {deckID, makerDeckID, cardID, setEdit} = props
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const dispatch = useDispatch()

    const deleteButtonHandler = useCallback(() => {
        if(deckID && cardID) {
            dispatch(removeCard({cardID, deckID}))
        }
    }, [dispatch, cardID, deckID])
    const editButtonHandler = useCallback(() => {
        dispatch(setSelectedCardID(cardID ?? ""))
        setEdit(true)
    }, [dispatch, setEdit, cardID])

    return (
        <div className={S.buttonsPanel}>
            {userID === makerDeckID ? <>
                    <MyButton onClick={deleteButtonHandler} className={S.deleteButton}>Delete</MyButton>
                    <MyButton onClick={editButtonHandler} variant={"standard"}>Edit</MyButton></> :
                <div>This is not your deck man</div>
            }
        </div>
    )
}
