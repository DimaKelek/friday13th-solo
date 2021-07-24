import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Profile} from "../Components/Features/Profile/Profile";
import {Login} from "../Components/Features/Authorization/Login/Login";
import {Registration} from "../Components/Features/Authorization/Registration/Registration";
import {RecoveryPass} from "../Components/Features/Authorization/RecoveryPass/RecoveryPass";
import {NewPass} from "../Components/Features/Authorization/NewPass/NewPass";
import {SandBox} from "../Components/Common/SandBox/SandBox";
import {Page404} from "../Components/Common/Page404/Page404";

export const Routes: React.FC<any> = props => {
    return (
        <div>
            <Switch>
                <Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>
                <Route path={"/profile"} render={() => <Profile/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/registration"} render={() => <Registration/>}/>
                <Route path={"/recovery"} render={() => <RecoveryPass/>}/>
                <Route path={"/new-password"} render={() => <NewPass/>}/>
                <Route path={"/sand-box"} render={() => <SandBox/>}/>
                <Route path={"/404"} render={() => <Page404/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </div>
    )
}