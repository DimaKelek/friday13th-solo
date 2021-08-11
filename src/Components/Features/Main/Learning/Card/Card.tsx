import React, {useCallback, useState} from "react";
import S from "./Card.module.css"
import {CardType} from "../../../../../Api/api";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";

type CardProps = {
    card: CardType | undefined
    setCurrentCard: (card: CardType) => void
    getNewCard: (cards: CardType[]) => CardType
}

export const Card: React.FC<CardProps> = props => {
    const {card, getNewCard, setCurrentCard} = props
    const [rotated, setRotated] = useState<boolean>(false)
    const cards = useSelector<AppStoreType, CardType[] | null>(state => state.cards.cards)

    const onNextClick = useCallback(() => {
        if(cards) {
            setTimeout(() => {
                setCurrentCard(getNewCard(cards))
            }, 500)
        }
    }, [cards, getNewCard, setCurrentCard])

    return (
        <div className={S.card}>
            <div className={`${S.front} ${rotated && S.click}`} onClick={() => setRotated(true)}>
                <h3>Question</h3>
                <span>{card?.question}</span>
                <img src={"https://goo.su/5SAB"} alt="kappa"/>
            </div>
            <div className={`${S.back} ${rotated && S.click}`} onClick={() => setRotated(false)}>
                <h3>Answer</h3>
                <div className={S.answer_container}><p>{card?.answer}</p></div>
                <div className={S.rating}>
                    <MyButton variant={"standard"}>Terrible</MyButton>
                    <MyButton variant={"standard"}>Bad</MyButton>
                    <MyButton variant={"standard"}>+ / -</MyButton>
                    <MyButton variant={"standard"}>Good</MyButton>
                    <MyButton variant={"standard"}>Excellent</MyButton>
                </div>
                <MyButton onClick={onNextClick} variant={"purple"}>Next</MyButton>
            </div>
        </div>
    )
}