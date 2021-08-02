import React, {useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {DecksTable} from "./Table/DecksTable";

type ShowDecksModeType = "My" | "All"

export const Decks: React.FC = props => {
    const [showDecksMode, setShowDecksMode] = useState<ShowDecksModeType>("All")
    const [minValue, setMinValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(100)

    const showDecksModeHandler = () => {
        setShowDecksMode(showDecksMode === "My" ? "All": "My")
    }

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
                            onChangeRangeFirst={setMinValue}
                            onChangeRangeSecond={setMaxValue}
                        />
                    </div>
                </div>
            </div>
            <div className={Sc.list}>
                <div className={S.list_container}>
                    <h2>Decks list</h2>
                    <div className={S.search_box}>
                        <MyTextInput
                            variant={"light"}
                            placeholder={"Search..."}
                            style={{width: "450px", marginRight: "20px"}}
                        />
                        <MyButton>Add new deck</MyButton>
                    </div>
                    <DecksTable />
                </div>
            </div>
        </div>
    )
}

