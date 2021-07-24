import React from "react";
import S from "./Registration.module.css"

type RegistrationPropsType = {

}

export const Registration: React.FC<RegistrationPropsType> = props => {
    return (
        <div className={S.registration}>
            <h2>Registration page</h2>
        </div>
    )
}