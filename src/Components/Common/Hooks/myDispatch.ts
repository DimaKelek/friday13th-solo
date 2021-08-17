import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../Store/store";

export const useMyDispatch = () => useDispatch<AppDispatchType>()