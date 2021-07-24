import React, {useState} from "react";
import {MyTextInput} from "../MyTextInput/MyTextInput";
import S from "./SandBox.module.css"
import {MyButton} from "../MyButton/MyButton";
import {MyCheckbox} from "../MyCheckbox/MyCheckbox";
import {MyEditableSpan} from "../MyEditableSpan/MyEditableSpan";
import {MySelect} from "../MySelect/MySelect";
import {MyRadioButton} from "../MyRadioButton/MyRadioButton";
import {MyRange} from "../Ranges/MyRange/MyRange";
import {MyDoubleRange} from "../Ranges/MyDoubleRange/MyDoubleRange";

export const SandBox: React.FC = props => {
    const options = ["React", "Redux", "Typescript"]
    const [editLabel, setEditLabel] = useState<string>("Yooooooooo")
    const [select, setSelect] = useState<string>(options[0])
    const [text, setText] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)
    const [rangeStart, setRangeStart] = useState<number>(0)
    const [rangeEnd, setRangeEnd] = useState<number>(100)

    // const error = text ? '' : 'error'
    const error = ""
    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }
    const myButtonCallback = () => {
        alert("Здароукиииииииииииии!!")
    }
    const checkboxTestCallback = () => {
        alert("Value my checkbox: " + check)
    }

    return (
        <div className={S.sandBox_container}>
            <div className={S.textInput_box}>
                <span>Text Input</span>
                <div>
                    <MyTextInput
                        value={text}
                        onChangeText={setText}
                        onEnter={showAlert}
                        error={error}
                        variant={"light"}
                    />
                </div>
            </div>
            <div className={S.button_box}>
                <span>My Button</span>
                <div>
                    <MyButton
                        onClick={myButtonCallback}
                        variant={"light"}
                    >Button</MyButton>
                </div>
            </div>
            <div className={S.reactCheckbox_box}>
                <span>My ReactCheckbox</span>
                <div><MyCheckbox checked={check} onChangeChecked={setCheck}>Test Label</MyCheckbox></div>
                <div>
                    <MyButton
                        onClick={checkboxTestCallback}
                        variant={"dark"}
                    >Test</MyButton>
                </div>
            </div>
            <div className={S.editableSpan_box}>
                <span>My EditableSpan</span>
                <div>
                    <MyEditableSpan
                        value={editLabel}
                        onChangeText={setEditLabel}
                        spanProps={{children: editLabel ? undefined : 'enter text...'}}
                    />
                </div>
            </div>
            <div className={S.mySelect_box}>
                <span>My Select</span>
                <div>
                    <MySelect
                        options={options}
                        value={select}
                        onChangeOption={setSelect}
                    />
                </div>
            </div>
            <div className={S.radio_box}>
                <span>My Radio Button</span>
                <div>
                    <MyRadioButton
                        name={'radio'}
                        options={options}
                        value={select}
                        onChangeOption={setSelect}
                    />
                </div>
            </div>
            <div className={S.range}>
                <span>My Ranges</span>
                <div>
                    <span>Start value: {rangeStart}</span>
                    <span>End value: {rangeEnd}</span>
                    <MyRange
                        value={rangeStart}
                        onChangeRange={setRangeStart}
                    />
                    <MyDoubleRange
                        value={[rangeStart, rangeEnd]}
                        onChangeRangeFirst={setRangeStart}
                        onChangeRangeSecond={setRangeEnd}
                    />
                </div>
            </div>
        </div>
    )
}