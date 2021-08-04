import React from "react";
import S from "./Main.module.css"
import Sc from "./MainCommon/Styles/MainCommon.module.css"
import {Header} from "./Header/Header";
import {HashRouter, Route} from "react-router-dom";
import {Profile} from "./Profile/Profile";
import {Decks} from "./Decks/Decks";
import {Cards} from "./Cards/Cards";

export const Main: React.FC = props => {
    return (
        <div className={S.main}>
            <Header />
            <div className={S.content}>
                <HashRouter>
                    <Route path={"/app/profile"} render={() => <Profile />}/>
                    <Route path={"/app/decks"} render={() => <Decks />}/>
                    <Route path={"/app/cards"} render={() => <Cards />}/>
                </HashRouter>
            </div>
        </div>
    )
}