import React from "react";
import S from "./Page404.module.css"
import {FrontEndMan} from "./FrontEndMan/FrontEndMan";

type Page404PropsType = {}

export const Page404: React.FC<Page404PropsType> = props => {
    return (
        <div className={S.page404_box}>
            <div className={S.man}>
                <span>Error 404</span>
                <FrontEndMan/>
            </div>
        </div>
    )
}