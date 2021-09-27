import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../Store/store";
import {useMemo} from "react";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";

export const useMyDispatch = () => useDispatch<AppDispatchType>()

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useMyDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}