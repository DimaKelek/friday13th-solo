import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {removeDeck, setDeckID} from "../../../../../Store/Decks/decks-reducer";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {NavLink} from "react-router-dom";
import {setModeStart} from "../../../../../Store/learning-reducer";
import {selectUserID} from "../../../../../Store/Auth/selectors";
import {selectDecks} from "../../../../../Store/Decks/selectors";
import {useMyDispatch} from "../../../../Common/Hooks/myDispatch";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
    setEdit: (value: boolean) => void
}

export const ActionsPanel: React.FC<ActionsPanelType> = React.memo(props => {
    const {deckID, makerDeckID, setEdit} = props
    const userID = useSelector(selectUserID)
    const decks = useSelector(selectDecks)
    const dispatch = useMyDispatch()

    let deck = decks && decks.find(d => d._id === deckID)

    const deleteButtonHandler = useCallback(() => {
        if (deckID) {
            dispatch(removeDeck(deckID))
        }
    }, [dispatch, deckID])
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
            <NavLink to={`/app/learning/${deckID}`}>
                <MyButton onClick={() => dispatch(setModeStart(false))}
                          variant={"purple"} className={S.learnButton}
                          disabled={deck?.cardsCount === 0}
                >Learn</MyButton>
            </NavLink>
        </div>
    )
})