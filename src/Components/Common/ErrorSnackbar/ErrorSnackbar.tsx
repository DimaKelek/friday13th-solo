import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../Store/store";
import {setAppStatus} from "../../../Store/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
type ErrorSnackbarPropsType = {
    error?: string
}
export const ErrorSnackbar: React.FC<ErrorSnackbarPropsType> = props => {
    const appError = useSelector<AppStoreType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppStatus("idle"))
    }
    const openValidate = appError !== "you are not authorized /ᐠ-ꞈ-ᐟ\\" && (appError !== null || props.error !== null)
    return (
        <Snackbar open={openValidate} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {appError || props.error}
            </Alert>
        </Snackbar>
    )
}
