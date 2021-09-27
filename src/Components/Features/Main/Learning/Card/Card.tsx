import React, {useCallback, useState} from "react";
import S from "./Card.module.css"
import {CardType, GradeType} from "../../../../../Api/api";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import {useActions} from "../../../../Common/Hooks/hooks";
import {learningActions, selectCards, selectLearningStatus} from "..";

type CardProps = {
    card: CardType | undefined
    setCurrentCard: (card: CardType) => void
    getNewCard: (cards: CardType[]) => CardType
}

type RatingPanelDataType = {
    title: string
    grade: GradeType
}

export const Card: React.FC<CardProps> = React.memo(props => {
    const {card, getNewCard, setCurrentCard} = props
    const cards = useSelector(selectCards)
    const learnStatus = useSelector(selectLearningStatus)
    const {setSelectedCardID, updateRating} = useActions(learningActions)

    const [rotated, setRotated] = useState<boolean>(false)
    const [send, setSend] = useState<boolean>(false)

    const onNextClick = useCallback(() => {
        if (cards) {
            setTimeout(() => {
                setSend(false)
                let selectedCard = getNewCard(cards)
                setCurrentCard(selectedCard)
                setSelectedCardID(selectedCard._id)
            }, 500)
        }
        setRotated(false)
    }, [cards, getNewCard, setCurrentCard, setSelectedCardID])

    const ratingRequestHandler = async (grade: GradeType) => {
        await updateRating(grade)
        setSend(true)
    }

    const ratingPanelData: RatingPanelDataType[] = [
        {title: "Terrible", grade: 1},
        {title: "Bad", grade: 2},
        {title: "+ / -", grade: 3},
        {title: "Good", grade: 4},
        {title: "Excellent", grade: 5}
    ]
    const ratingPanel = ratingPanelData.map((rp, i) => {
        return <MyButton key={i}
                         variant={"standard"}
                         onClick={() => ratingRequestHandler(rp.grade)}
        >{rp.title}</MyButton>
    })
    
    return (
        <div className={S.card}>
            <div className={`${S.front} ${rotated && S.click}`} onClick={() => setRotated(true)}>
                <h3>Question</h3>
                <span>{card?.question}</span>
                <img src={"https://goo.su/5SAB"} alt="kappa"/>
            </div>
            <div className={`${S.back} ${rotated && S.click}`}>
                <h3>Answer</h3>
                <div className={S.answer_container}><p>{card?.answer}</p></div>
                <div className={`${S.rating} ${send && S.send}`}>
                    {!send 
                        ? (learnStatus === "loading" ? <div className={S.preloader}><CircularProgress/></div> : ratingPanel)
                        : (<div className={S.success}>
                                {learnStatus === "succeeded" ? "Success bro!!" : "Something went wrong bro!!"}
                        </div>)
                    }
                </div>
                <MyButton onClick={onNextClick}
                          variant={"purple"}
                          disabled={learnStatus === "loading"}
                >Next</MyButton>
            </div>
        </div>
    )
})