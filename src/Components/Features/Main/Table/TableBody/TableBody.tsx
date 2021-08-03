import React from "react";
import S from "./TableBody.module.css";
import {RenderDeckType} from "../../MainCommon/utils/dataHandlers";
import {DeckItem} from "../DeckItem/DeckItem";
import {CallStyleType} from "../Table";

type TableBodyPropsType = {
    callStyle: CallStyleType
    items: RenderDeckType[] | null
}
export const TableBody: React.FC<TableBodyPropsType> = props => {
    const {callStyle, items} = props
    const renderItems = items?.map((item, i) => {
        return (
            <DeckItem
                name={item.name}
                cards={item.cards}
                lastUpdate={item.lastUpdate}
                created={item.created}
                index={i}
                deckID={item.deckID}
                makerDeckID={item.makerDeckID}
                callStyle={callStyle}
            />
        )
    })

    return <div className={S.body}>{renderItems}</div>
}