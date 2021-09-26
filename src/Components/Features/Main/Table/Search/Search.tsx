import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import S from "./Search.module.css";
import {MyTextInput} from "../../../../Common/MyTextInput/MyTextInput";
import {useSelector} from "react-redux";
import {selectStatus} from "../../../../../Store/App/selectors";

type SearchWithButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onEnter?: () => void
}

export const Search: React.FC<SearchWithButtonPropsType> = React.memo(props => {
    const status = useSelector(selectStatus)
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
})