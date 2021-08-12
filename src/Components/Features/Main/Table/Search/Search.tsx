import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import S from "./Search.module.css";
import {MyTextInput} from "../../../../Common/MyTextInput/MyTextInput";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../Store/store";
import {RequestStatusType} from "../../../../../Store/app-reducer";

type SearchWithButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onEnter?: () => void
}

export const Search: React.FC<SearchWithButtonPropsType> = props => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    return (
        <div className={S.search_box}>
            <MyTextInput
                variant={"light"}
                placeholder={"Search..."}
                className={S.search}
                disabled={status === "loading"}
                {...props}
            />
        </div>
    )
}