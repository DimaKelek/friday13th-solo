import React, {useCallback} from "react";
import S from "./Profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../Store/store";
import {changeLoginStatus, logout, setUserData, UserDataType} from "../../../Store/auth-reducer";
import {Redirect} from "react-router-dom";
import {MyButton} from "../../Common/MyButton/MyButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {RequestStatusType} from "../../../Store/app-reducer";

type ProfilePropsType = {

}

export const Profile: React.FC<ProfilePropsType> = props => {
    const userData = useSelector<AppStoreType, UserDataType | null>(state => state.auth.userData)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    if(userData === null) {
        return <Redirect to="/login"/>
    }

    return (
        <div className={S.profile}>
            <h2>Profile page</h2>
            {status === "loading"
                ? <CircularProgress/>
                : <MyButton onClick={logoutHandler}>Log out</MyButton>
            }
        </div>
    )
}