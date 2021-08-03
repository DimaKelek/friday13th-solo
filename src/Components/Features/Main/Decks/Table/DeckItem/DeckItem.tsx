import {RenderDeckType} from "../../../MainCommon/utils/dataHandlers";
import React from "react";
import S from "./DeckItem.module.css";

type DeckItemPropsType = RenderDeckType & {
    index: number
}
export const DeckItem: React.FC<DeckItemPropsType> = props => {
    const {name, cards, lastUpdate, created, index} = props

    const color = index === 0 || index % 2 !== 1 ? "deckItemGray" : "deckItemWhite"
    return (
        <div className={`${S.deckItem} ${S[color]}`}>
            <div className={S.name}>{name}</div>
            <div className={S.cards}>{cards}</div>
            <div className={S.update}>{lastUpdate}</div>
            <div className={S.created}>{created}</div>
            <div className={S.actions}>Actions</div>
        </div>
    )
}