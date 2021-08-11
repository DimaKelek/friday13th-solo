import React from "react";
import S from "./Rating.module.css"
import star from "../star.png"

type RatingProps = {
    grade: number
}

export const Rating: React.FC<RatingProps> = props => {
    const {grade} = props

    let stars = []
    for(let i = 0; i < grade; i++) {
        stars.push(<img key={i} src={star} alt="star"/>)
    }

    return (
        <div className={S.rating}>
            <div className={S.star_container}>{stars.length === 0 ? "No information" : stars}</div>
        </div>
    )
}