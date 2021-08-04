import React, {ChangeEvent} from "react";
import S from "./MyRangeDouble.module.css";
import {Slider} from "@material-ui/core";

type SuperDoubleRangePropsType = {
    onChangeRangeFirst?: (value: number) => void
    onChangeRangeSecond?: (value: number) => void
    value: [number, number]
    disabled?: boolean
    min?: number
    max?: number
    onClickHandler?: (e: ChangeEvent<{}>) => void
}

export const MyDoubleRange: React.FC<SuperDoubleRangePropsType> = props => {
    const {onChangeRangeFirst, onChangeRangeSecond, value, disabled, min, max, onClickHandler} = props
    const onChangeDoubleRange = (value: [number, number]) => {
        onChangeRangeFirst && onChangeRangeFirst(value[0])
        onChangeRangeSecond && onChangeRangeSecond(value[1])
    }

    const onChangeCallback = (e: ChangeEvent<{}>, value: number | number[]) => {
        onChangeDoubleRange(value as [number, number])
    }

    function valuetext(value: number) {
        return `${value}°C`;
    }

    return (
        <div className={S.doubleRange}>
            <Slider
                value={value}
                onChange={onChangeCallback}
                disabled={disabled}
                min={min}
                max={max}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                onClick={onClickHandler}
            />
        </div>
    );
}