import React, {useCallback, useState} from "react";
import S from "./Profile.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {logout, UserDataType} from "../../../../Store/auth-reducer";
import {Redirect} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {MyModal} from "../../ModalWindows/Modal/MyModal"

type ProfilePropsType = {}

export const Profile: React.FC<ProfilePropsType> = props => {
    const userData = useSelector<AppStoreType, UserDataType | null>(state => state.auth.userData)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    if (userData === null) {
        return <Redirect to="/login"/>
    }

    return (
        <>
            {show &&
                <MyModal closeModal={setShow} title={"Are you sure you want to get out?"}>
                    <div>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <div className={S.modalButtons}>
                                <MyButton variant={"purple"} onClick={() => setShow(false)}>Stay more ^^</MyButton>
                                <MyButton  onClick={logoutHandler}>Log out</MyButton>
                            </div>
                        }
                    </div>
                </MyModal>
            }
            <div className={Sc.workSpace}>
                <div className={Sc.workSpace_container}>
                    <div className={S.profile}>
                        <h2>Profile page</h2>
                        <div>Welcome {userData.name}</div>
                        <MyButton onClick={() => setShow(true)}>Log out</MyButton>
                    </div>
                </div>
            </div>
        </>

    )
}