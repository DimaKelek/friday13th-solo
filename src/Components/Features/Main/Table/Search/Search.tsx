import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import S from "./Search.module.css";
import {MyTextInput} from "../../../../Common/MyTextInput/MyTextInput";

type SearchWithButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onEnter?: () => void
}

export const Search: React.FC<SearchWithButtonPropsType> = props => {
    return (
        <div className={S.search_box}>
            <MyTextInput
                variant={"light"}
                placeholder={"Search..."}
                style={{width: "450px", marginRight: "20px"}}
                {...props}
            />
        </div>
    )
}