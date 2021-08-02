import React from "react";
import S from "./FrontEndMan.module.css";
import chakres from "../Images/chakres.png";
import iconReact from "../Images/react.svg";
import iconTS from "../Images/typescript.svg";
import iconRedux from "../Images/redux.svg";
import iconHTML from "../Images/html5.svg";
import iconCSS from "../Images/css3.svg";
import iconJest from "../Images/jest.png";

export const FrontEndMan: React.FC<any> = props => {
    return (
        <div className={S.chakres_box}>
            <img className={S.chakres} src={chakres} alt="chakres"/>
            <div className={S.redux}><img src={iconRedux} alt="Redux"/></div>
            <div className={S.react}><img src={iconReact} alt="React"/></div>
            <div className={S.ts}><img src={iconTS} alt="TS"/></div>
            <div className={S.jest}><img src={iconJest} alt="Jest"/></div>
            <div className={S.html5}><img src={iconHTML} alt="HTML"/></div>
            <div className={S.css3}><img src={iconCSS} alt="CSS"/></div>
        </div>
    )
}