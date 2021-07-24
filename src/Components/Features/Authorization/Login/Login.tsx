import React from "react";
import S from "./Login.module.css"

type LoginPropsType = {

}

export const Login: React.FC<LoginPropsType> = props => {
    return (
        <div className={S.login}>
            <h2>Login page</h2>
        </div>
    )
}