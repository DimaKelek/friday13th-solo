import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../Store/store";
import {useCallback, useMemo, useState} from "react";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";

export const useMyDispatch = () => useDispatch<AppDispatchType>()

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useMyDispatch()
    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}

export const useModal = (initValue: boolean) => {
    const [visible, setVisible] = useState<boolean>(initValue)

    const open = useCallback(() => {
        setVisible(true)
    }, [])

    const close = useCallback(() => {
        setVisible(false)
    }, [])

    const changeVisible = useCallback((value: boolean) => {
        setVisible(value)
    }, [])

    return {visible, open, close, changeVisible}
}