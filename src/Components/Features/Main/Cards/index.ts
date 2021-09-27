import { selectStatus } from "../../../../Store/App/selectors";
import { selectUserID } from "../../../../Store/Auth/selectors";
import * as cardsAsyncActions from "../../../../Store/Cards/cards-actions"
import * as cardsTypes from "../../../../Store/Cards/cards-types"
import {cardsSlice} from "../../../../Store/Cards/cards-reducer";

const cardsActions = {
    ...cardsAsyncActions,
    ...cardsSlice.actions
}

export {
    selectStatus,
    selectUserID,
    cardsActions,
    cardsTypes
}