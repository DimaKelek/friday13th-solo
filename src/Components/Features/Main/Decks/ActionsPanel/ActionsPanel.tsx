import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";
import {removeDeck, setDeckID} from "../../../../../Store/decks-reducer";
import S from "./ActionsPanel.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {NavLink} from "react-router-dom";
import {setModeStart} from "../../../../../Store/learning-reducer";
import {DeckType} from "../../../../../Api/api";

type ActionsPanelType = {
    makerDeckID: string | undefined
    deckID: string | undefined
    setEdit: (value: boolean) => void
}

export const ActionsPanel: React.FC<ActionsPanelType> = props => {
    const {deckID, makerDeckID, setEdit} = props
    const userID = useSelector<AppStoreType, string | undefined>(state => state.auth.userData?._id)
    const decks = useSelector<AppStoreType, DeckType[] | null>(state => state.decks.decks)
    const dispatch = useDispatch()

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
}
