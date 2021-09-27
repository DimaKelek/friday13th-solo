import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {useSelector} from "react-redux";
import {ErrorSnackbar} from "../Components/Common/ErrorSnackbar/ErrorSnackbar";
import {CircularProgress} from "@material-ui/core";
import {useMyDispatch} from "../Components/Common/Hooks/hooks";
import {selectors} from ".";
import {checkingAuthorization} from "../Store/Auth/auth-actions";

export const App: React.FC<any> = props => {
    const status = useSelector(selectors.selectStatus)
    const isInitialized = useSelector(selectors.selectIsInitialized)
    const dispatch = useMyDispatch()

    useEffect(() => {
        dispatch(checkingAuthorization())
    }, [dispatch])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '50%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            {status === "failed" && <ErrorSnackbar/>}
            <HashRouter>
                <Routes />
            </HashRouter>
        </div>
    );
}