import React from "react";
import S from "./RecoveryPass.module.css"

type RecoveryPassPropsType = {

}

export const RecoveryPass: React.FC<RecoveryPassPropsType> = props => {
    return (
        <div className={S.recoveryPass}>
            <h2>Restore Password page</h2>
        </div>
    )
}