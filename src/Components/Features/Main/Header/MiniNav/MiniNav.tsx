import React from "react";
import S from "./MiniNav.module.css"
import decks from "../../MainCommon/Icons/decks.svg"
import profile from "../../MainCommon/Icons/profileIcon.svg"
import { NavLink } from "react-router-dom";

export function MiniNav() {
    return (
        <div className={`${S.miniNav} `}>
            <NavLink to="/app/decks">
                <div className={`${S.menuItem} ${S.home}`}>
                    <img src={decks} alt=""/>
                </div>
            </NavLink>
            <NavLink to="/app/profile">
                <div className={`${S.menuItem} ${S.about}`}>
                    <img src={profile} alt=""/>
                </div>
            </NavLink>
        </div>
    );
}