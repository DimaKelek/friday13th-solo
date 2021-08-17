import React from "react";
import Sc from "../Styles/MainCommon.module.css";

export const WorkSpace: React.FC = ({children}) => {
    return (
        <div className={Sc.workSpace}>
            <div className={Sc.workSpace_container}>
                {children}
            </div>
        </div>
    )
}