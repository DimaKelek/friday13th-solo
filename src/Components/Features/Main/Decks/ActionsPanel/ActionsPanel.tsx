import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {NavLink} from "react-router-dom";
import {useActions} from "../../../../Common/Hooks/hooks";
import {decksActions, selectDecks, selectUserID, setModeStart} from "..";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
    setEdit: (value: boolean) => void
}

export const ActionsPanel: React.FC<ActionsPanelType> = React.memo(props => {
    const {deckID, makerDeckID, setEdit} = props
    const userID = useSelector(selectUserID)
    const decks = useSelector(selectDecks)
    const {removeDeck, setDeckID} = useActions(decksActions)

    let deck = decks && decks.find(d => d._id === deckID)

    const deleteButtonHandler = useCallback(() => {
        if (deckID) {
            removeDeck(deckID)
        }
    }, [removeDeck, deckID])
    const editButtonHandler = useCallback(() => {
        setEdit(true)
        setDeckID(deckID ?? "")
    }, [setEdit, setDeckID, deckID])
    const changeLearnMode = useCallback(() => setModeStart(false), [])
    return (
        <div className={S.buttonsPanel}>
            {userID === makerDeckID && <>
                <MyButton onClick={deleteButtonHandler} className={S.deleteButton}>Delete</MyButton>
                <MyButton onClick={editButtonHandler} className={S.editButton} variant={"standard"}>Edit</MyButton>
            </>
            }
            <NavLink to={`/app/learning/${deckID}`}>
                <MyButton onClick={changeLearnMode}
                          variant={"purple"} className={S.learnButton}
                          disabled={deck?.cardsCount === 0}
                >Learn</MyButton>
            </NavLink>
        </div>
    )
})