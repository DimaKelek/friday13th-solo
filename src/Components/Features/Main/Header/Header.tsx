import React from "react";
import S from "./Header.module.css";
import {Link} from "./Link/Link";
import decksIcon from "../MainCommon/Icons/decks.svg";
import profileIcon from "../MainCommon/Icons/profileIcon.svg";

export const Header: React.FC = props => {
    return (
        <div className={S.header_container}>
            <div className={S.nav_container}>
                <h2>It-incubator</h2>
                <nav>
                    <Link path={"decks"} icon={decksIcon} title={"Decks List"}/>
                    <Link path={"profile"} icon={profileIcon} title={"Profile"}/>
                </nav>
            </div>
        </div>
    )
}