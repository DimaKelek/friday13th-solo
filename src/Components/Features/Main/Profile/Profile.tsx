import React, {useCallback, useState} from "react";
import S from "./Profile.module.css"
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {MyButton} from "../../../Common/MyButton/MyButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MyModal} from "../../ModalWindows/Modal/MyModal"
import {WorkSpace} from "../MainCommon/StyledComponents/WorkSpace";
import {useActions} from "../../../Common/Hooks/hooks";
import {authActions, selectStatus, selectUserData} from ".";

export const Profile: React.FC = () => {
    const userData = useSelector(selectUserData)
    const status = useSelector(selectStatus)
    const {logout} = useActions(authActions)

    const [show, setShow] = useState<boolean>(false)

    const logoutHandler = useCallback(() => {
        logout()
    }, [logout])

    if (userData === null) {
        return <Redirect to={"/login"}/>
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
            <WorkSpace>
                <div className={S.profile}>
                    <h2>Profile page</h2>
                    <div>Welcome {userData.name}</div>
                    <MyButton onClick={() => setShow(true)}>Log out</MyButton>
                </div>
            </WorkSpace>
        </>

    )
}