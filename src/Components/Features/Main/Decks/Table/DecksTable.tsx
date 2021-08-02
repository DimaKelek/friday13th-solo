import Pagination from "@material-ui/lab/Pagination";
import React, {useState} from "react";
import S from "./DecksTable.module.css"

export const DecksTable: React.FC = props => {
    const [decks, setDecks] = useState<DeckType[]>([
        {name: "New Deck0", cards: 25, lastUpdate: "27.09.2021", created: "Kelek"},
        {name: "New Deck1", cards: 25, lastUpdate: "27.09.2021", created: "Kelek"},
        {name: "New Deck2", cards: 25, lastUpdate: "27.09.2021", created: "Kelek"},
        {name: "New Deck3", cards: 25, lastUpdate: "27.09.2021", created: "Kelek"},
        {name: "New Deck4", cards: 25, lastUpdate: "27.09.2021", created: "Kelek"},
        {name: "New Deck5", cards: 25, lastUpdate: "27.09.2021", created: "Kelek"},
        {name: "New Deck6", cards: 25, lastUpdate: "27.09.2021", created: "Kelek"},
    ])
    const deckItems = decks.map((d, i) => {
        return (
            <DeckItem
                key={i}
                name={d.name}
                cards={d.cards}
                lastUpdate={d.lastUpdate}
                created={d.created}
                index={i}
            />
        )
    })

    return (
        <>
            <div className={S.table}>
                <div className={S.header}>
                    <div className={S.name}>Name</div>
                    <div className={S.cards}>Cards</div>
                    <div className={S.update}>Last Update</div>
                    <div className={S.created}>Created by</div>
                    <div className={S.actions}>Actions</div>
                </div>
                {deckItems}
            </div>
            <PaginationControlled/>
        </>
    )
}

type DeckType = {
    name: string
    cards: number
    lastUpdate: string
    created: string
}

type DeckItemPropsType = DeckType & {
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

export const PaginationControlled = () => {
    const [page, setPage] = useState(1);
    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={S.pagination}>
            <Pagination count={10} page={page} onChange={handleChange} />
        </div>
    );
}