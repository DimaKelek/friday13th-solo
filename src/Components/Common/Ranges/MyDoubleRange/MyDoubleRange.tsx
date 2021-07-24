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
}

export const MyDoubleRange: React.FC<SuperDoubleRangePropsType> = props => {
    const {onChangeRangeFirst, onChangeRangeSecond, value, disabled, min, max, ...restProps} = props

    const onChangeDoubleRange = (value: [number, number]) => {
        onChangeRangeFirst && onChangeRangeFirst(value[0])
        onChangeRangeSecond && onChangeRangeSecond(value[1])
    }

    const onChangeCallback = (e: ChangeEvent<{}>, value: number | number[]) => {
        onChangeDoubleRange(value as [number, number])
    }

    return (
        <div className={S.doubleRange}>
            <Slider
                value={value}
                onChange={onChangeCallback}
                disabled={disabled}
                min={min}
                max={max}
            />
        </div>
    );
}