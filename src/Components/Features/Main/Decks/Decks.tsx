import React, {useEffect, useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {DecksStateType, getDecks} from "../../../../Store/decks-reducer";
import {CallType, Table} from "../Table/Table";
import {getDecksForUI} from "../MainCommon/utils/dataHandlers";

type ShowDecksModeType = "My" | "All"

export const Decks: React.FC = props => {
    const decksState = useSelector<AppStoreType, DecksStateType>(state => state.decks)
    const dispatch = useDispatch()

    const [showDecksMode, setShowDecksMode] = useState<ShowDecksModeType>("All")
    const [minValue, setMinValue] = useState<number>(() => decksState.minCardsCount)
    const [maxValue, setMaxValue] = useState<number>(() => decksState.maxCardsCount)
    const [visiblePage, setVisiblePage] = useState<number>(1)

    useEffect(() => {
        dispatch(getDecks(visiblePage))
    }, [visiblePage, dispatch])

    const showDecksModeHandler = () => {
        setShowDecksMode(showDecksMode === "My" ? "All": "My")
    }

    const columns: CallType[] = [
        {title: "name", width: "2fr"},
        {title: "count", width: "1fr"},
        {title: "last update", width: "2fr"},
        {title: "maker", width: "2fr"},
        {title: "actions", width: "220px"},
    ]
    const items = getDecksForUI(decksState.decks)

    return (
        <div className={Sc.workSpace}>
            <div className={Sc.settings}>
                <div className={S.settings_container}>
                    <h3>Show decks cards</h3>
                    <div className={S.showDecks}>
                        <div
                            className={showDecksMode === "My" ? S.modeOn : ""}
                            onClick={showDecksModeHandler}
                        >My
                        </div>
                        <div
                            className={showDecksMode === "All" ? S.modeOn : ""}
                            onClick={showDecksModeHandler}
                        >All
                        </div>
                    </div>
                    <h3>Number of cards</h3>
                    <div className={S.range}>
                        <MyDoubleRange
                            value={[minValue, maxValue]}
                            min={decksState.minCardsCount}
                            max={decksState.maxCardsCount}
                            onChangeRangeFirst={setMinValue}
                            onChangeRangeSecond={setMaxValue}
                        />
                    </div>
                </div>
            </div>
            <div className={Sc.list}>
                <div className={S.list_container}>
                    <Table
                        title={"Decks list"}
                        columns={columns}
                        items={items}
                        totalCount={decksState.totalCount}
                        visiblePage={visiblePage}
                        setVisiblePage={setVisiblePage}
                    />
                </div>
            </div>
        </div>
    )
}