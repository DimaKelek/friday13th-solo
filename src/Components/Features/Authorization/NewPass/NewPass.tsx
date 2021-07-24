import React from "react";
import S from "./NewPass.module.css"

type NewPassPropsType = {

}

export const NewPass: React.FC<NewPassPropsType> = props => {
    return (
        <div className={S.newPass}>
            <h2>New Password page</h2>
        </div>
    )
}