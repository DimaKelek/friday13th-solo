import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {selectUserID} from "../../../../../Store/Auth/selectors";
import {useActions} from "../../../../Common/Hooks/hooks";
import {cardsActions} from "..";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
    cardID: string | undefined
    setEdit: (value: boolean) => void
}

export const CardActionsPanel: React.FC<ActionsPanelType> = React.memo(props => {
    const {deckID, makerDeckID, cardID, setEdit} = props
    const userID = useSelector(selectUserID)
    const {removeCard, setSelectedCardID} = useActions(cardsActions)

    const deleteButtonHandler = useCallback(() => {
        if(deckID && cardID) {
            removeCard({cardID, deckID})
        }
    }, [cardID, deckID, removeCard])
    const editButtonHandler = useCallback(() => {
        setSelectedCardID(cardID ?? "")
        setEdit(true)
    }, [setEdit, cardID, setSelectedCardID])

    return (
        <div className={S.buttonsPanel}>
            {userID === makerDeckID ? <>
                    <MyButton onClick={deleteButtonHandler} className={S.deleteButton}>Delete</MyButton>
                    <MyButton onClick={editButtonHandler} variant={"standard"}>Edit</MyButton></> :
                <div>This is not your deck man</div>
            }
        </div>
    )
})