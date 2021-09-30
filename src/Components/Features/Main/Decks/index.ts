import {selectUserID} from "../../../../Store/Auth/selectors";
import {selectStatus} from "../../../../Store/App/selectors";
import * as decksAsyncActions from "../../../../Store/Decks/decks-actions"
import {decksSlice} from "../../../../Store/Decks/decks-reducer";
import {selectDecks, selectDeckState} from "../../../../Store/Decks/selectors";
import {learningSlice} from "../../../../Store/Learning/learning-reducer";
import { requestStart } from "./utils/callbacks";

const decksActions = {
    ...decksAsyncActions,
    ...decksSlice.actions
}

const setModeStart = learningSlice.actions.setModeStart

export {
    decksActions,
    setModeStart,
    selectUserID,
    selectDecks,
    selectDeckState,
    selectStatus,
    requestStart
}