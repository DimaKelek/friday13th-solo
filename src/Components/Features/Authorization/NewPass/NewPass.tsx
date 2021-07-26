import React from "react";
import S from "./NewPass.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"

type NewPassPropsType = {

}

export const NewPass: React.FC<NewPassPropsType> = props => {
    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Create new password</h4>
                <form>
                    <div className={Sc.fields}>

                    </div>
                </form>
            </div>
        </div>
    )
}