import React from "react";
import S from "./Profile.module.css"

type ProfilePropsType = {

}

export const Profile: React.FC<ProfilePropsType> = props => {
    return (
        <div className={S.profile}>
            <h2>Profile page</h2>
        </div>
    )
}