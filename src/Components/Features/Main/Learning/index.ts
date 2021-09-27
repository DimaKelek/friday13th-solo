import { selectCards } from "../../../../Store/Cards/selectors"
import { selectLearningStatus, selectModeStart } from "../../../../Store/Learning/selectors"
import * as learningAsyncActions from "../../../../Store/Learning/learning-actions"
import {learningSlice} from "../../../../Store/Learning/learning-reducer"
import {getCards} from "../../../../Store/Cards/cards-actions"

const learningActions = {
    ...learningAsyncActions,
    ...learningSlice.actions
}

export {
    selectLearningStatus,
    selectModeStart,
    selectCards,
    learningActions,
    getCards
}