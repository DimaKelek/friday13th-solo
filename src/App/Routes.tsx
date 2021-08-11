import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {SandBox} from "../Components/Common/SandBox/SandBox";
import {Page404} from "../Components/Common/Page404/Page404";
import {LoginContainer} from "../Components/Features/Authorization/Login/LoginContainer";
import {RegistrationContainer} from "../Components/Features/Authorization/Registration/RegistrationContainer";
import {RecoveryContainer} from "../Components/Features/Authorization/RecoveryPass/RecoveryContainer";
import {NewPassContainer} from "../Components/Features/Authorization/NewPass/NewPassContainer";
import {Main} from "../Components/Features/Main/Main";

export const Routes: React.FC<any> = props => {
    return (
        <div>
            <Switch>
                <Route exact path={"/"} render={() => <Redirect to={"/app/profile"}/>}/>
                <Route path={"/app"} render={() => <Main />}/>
                <Route path={"/login"} render={() => <LoginContainer/>}/>
                <Route path={"/registration"} render={() => <RegistrationContainer/>}/>
                <Route path={"/recovery"} render={() => <RecoveryContainer/>}/>
                <Route path={"/new-password/:token"} render={() => <NewPassContainer/>}/>
                <Route path={"/sand-box"} render={() => <SandBox/>}/>
                <Route path={"/404"} render={() => <Page404/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </div>
    )
}