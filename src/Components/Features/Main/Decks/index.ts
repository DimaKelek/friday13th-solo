import { selectUserID } from "../../../../Store/Auth/selectors";
import * as decksAsyncActions from "../../../../Store/Decks/decks-actions"
import {decksSlice} from "../../../../Store/Decks/decks-reducer";
import { selectDecks } from "../../../../Store/Decks/selectors";
import { learningSlice } from "../../../../Store/Learning/learning-reducer";

const decksActions = {
    ...decksAsyncActions,
    ...decksSlice.actions
}

const setModeStart = learningSlice.actions.setModeStart

export {
    decksActions,
    selectUserID,
    selectDecks,
    setModeStart
}