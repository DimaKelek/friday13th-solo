import {RenderDeckType} from "../../MainCommon/utils/dataHandlers";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";
import {removeDeck, updateDeck} from "../../../../../Store/decks-reducer";
import {UpdateDeckRequestData} from "../../../../../Api/api";
import S from "./DeckItem.module.css";
import Sr from "../TableHeader/TableHeader.module.css"
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {CallStyleType} from "../Table";


type DeckItemPropsType = RenderDeckType & {
    index: number
    callStyle: CallStyleType
}
export const DeckItem: React.FC<DeckItemPropsType> = props => {
    const {name, cards, lastUpdate, created, index, makerDeckID, deckID, callStyle} = props
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
    const color = index === 0 || index % 2 !== 1 ? "deckItemGray" : "deckItemWhite"
    return (
        <div className={`${S.deckItem} ${S[color]}`} style={callStyle}>
            <div className={Sr.row}>{name}</div>
            <div className={Sr.row}>{cards}</div>
            <div className={Sr.row}>{lastUpdate}</div>
            <div className={Sr.row}>{created}</div>
            <div className={Sr.row}>
                <div className={S.buttonsPanel}>
                    {userID === makerDeckID && <>
                        <MyButton onClick={deleteButtonHandler} className={S.deleteButton}>Delete</MyButton>
                        <MyButton onClick={editButtonHandler} variant={"standard"}>Edit</MyButton></>
                    }
                    <MyButton onClick={() => alert("Coming soon bro))")} variant={"purple"}>Learn</MyButton>
                </div>
            </div>
        </div>
    )

}