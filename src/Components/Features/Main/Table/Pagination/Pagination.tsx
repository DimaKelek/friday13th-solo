import React, {ChangeEvent} from "react";
import Pagination from "@material-ui/lab/Pagination";

type PaginationPropsType = {
    page: number
    setPage?: (page: number) => void
    totalCount: number
}
export const PaginationControlled: React.FC<PaginationPropsType> = React.memo(props => {
    const {page, totalCount, setPage} = props

    const count = Math.ceil(totalCount / 7)
    const handleChange = (e: ChangeEvent<unknown>, value: number) => {
        setPage && setPage(value)
    };

    return <Pagination count={count} page={page} onChange={handleChange}/>
})