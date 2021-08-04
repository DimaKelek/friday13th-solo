import React from "react";
import S from "./Cards.module.css"
import Sc from "../MainCommon/Styles/MainCommon.module.css"
import {CallType, Table} from "../Table/Table";
import {Search} from "../Table/Search/Search";

export const Cards: React.FC = props => {
    const columns: CallType[] = [
        {title: "question", width: "2.5fr"},
        {title: "Answer", width: "2.5fr"},
        {title: "last update", width: "1.5fr"},
        {title: "grade", width: "1.5fr"},
        {title: "actions", width: "1.5fr"},
    ]
    const rows: any[] = []
    return (
        <div className={Sc.workSpace}>
            <div className={Sc.workSpace_container}>
                <div className={S.cards}>
                    <h2>Cards list</h2>
                    <Search/>
                    <Table
                        columns={columns}
                        items={rows}
                        totalCount={0}
                    />
                </div>
            </div>
        </div>
    )
}