import React, {useState} from "react";
import S from "./Decks.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {MyDoubleRange} from "../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {DecksTable} from "./Table/DecksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../Store/store";
import {RequestStatusType} from "../../../../Store/app-reducer";
import {CircularProgress} from "@material-ui/core";
import {createDeck, DecksStateType} from "../../../../Store/decks-reducer";
import {CreateDeckRequest, DeckDataType} from "../../../../Api/api";

type ShowDecksModeType = "My" | "All"

export const Decks: React.FC = props => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const decksState = useSelector<AppStoreType, DecksStateType>(state => state.decks)
    const dispatch = useDispatch()

    const [showDecksMode, setShowDecksMode] = useState<ShowDecksModeType>("All")
    const [minValue, setMinValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(decksState.maxCardsCount)

    const showDecksModeHandler = () => {
        setShowDecksMode(showDecksMode === "My" ? "All": "My")
    }
    const createDeckHandler = () => {
        let data: CreateDeckRequest = {
            cardsPack: {
                name: "Kelek Deck",
                private: false,
                deckCover: ""
            }
        }
        dispatch(createDeck(data))
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
                            max={decksState.maxCardsCount}
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
                        <MyButton disabled={status === "loading"} onClick={createDeckHandler}>
                            Add new deck</MyButton>
                    </div>
                    <DecksTable status={status} decks={decksState.decks} totalCount={decksState.totalCount}/>
                </div>
            </div>
        </div>
    )
}

