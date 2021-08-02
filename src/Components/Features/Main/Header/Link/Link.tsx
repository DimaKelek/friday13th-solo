import React from "react";
import {NavLink} from "react-router-dom";
import S from "./Link.module.css";

type LinkType = {
    path: string
    icon: string
    title: string
}

export const Link: React.FC<LinkType> = props => {
    const {path, icon, title} = props
    return (
        <div className={S.link}>
            <NavLink to={`/app/${path}`} activeClassName={S.activeLink}>
                <div>
                    <img src={icon} alt={`${path}`}/>
                    {title}
                    <span className={S.line}/>
                </div>
            </NavLink>
        </div>

    )
}