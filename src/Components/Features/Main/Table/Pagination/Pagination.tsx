import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import {useDispatch} from "react-redux";
import {changeVisiblePage} from "../../../../../Store/decks-reducer";

type PaginationPropsType = {
    page: number
    setPage?: (page: number) => void
    totalCount: number
}

export const PaginationControlled: React.FC<PaginationPropsType> = props => {
    const {page, totalCount} = props
    const dispatch = useDispatch()
    const count = Math.ceil(totalCount / 7)
    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changeVisiblePage(value))
    };

    return <Pagination count={count} page={page} onChange={handleChange}/>
}