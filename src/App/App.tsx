import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {Header} from "../Components/Common/Header";
import {useSelector} from "react-redux";
import {AppStoreType} from "../Store/store";
import {RequestStatusType} from "../Store/app-reducer";
import {ErrorSnackbar} from "../Components/Common/ErrorSnackbar/ErrorSnackbar";

export const App: React.FC<any> = props => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            {status === "failed" && <ErrorSnackbar/>}
            <HashRouter>
                <Header />
                <Routes />
            </HashRouter>
        </div>
    );
}