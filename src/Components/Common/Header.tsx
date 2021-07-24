import React from 'react'
import {NavLink} from "react-router-dom";
import S from "./Header.module.css"

export const Header: React.FC<any> = props => {
    return (
        <div className={S.menu}>
            <div className={S.menu_container}>
                <div className={S.bubble}/>
                <NavLink to={"/profile"} activeClassName={S.active}>
                    <div className={S.button}>Profile</div>
                </NavLink>
                <NavLink to={"/login"} activeClassName={S.active}>
                    <div className={S.button}>Login</div>
                </NavLink>
                <NavLink to={"/registration"} activeClassName={S.active}>
                    <div className={S.button}>Registration</div>
                </NavLink>
                <NavLink to={"/recovery"} activeClassName={S.active}>
                    <div className={S.button}>Recovery</div>
                </NavLink>
                <NavLink to={"/new-password"} activeClassName={S.active}>
                    <div className={S.button}>NewPass</div>
                </NavLink>
                <NavLink to={"/sand-box"} activeClassName={S.active}>
                    <div className={S.button}>SandBox</div>
                </NavLink>
            </div>
        </div>
    )
}