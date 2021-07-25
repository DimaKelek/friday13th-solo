import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import S from "./MyRange.module.css";
import {Slider} from "@material-ui/core";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type SuperRangePropsType = DefaultInputPropsType & {
    onChangeRange?: (value: number) => void
    value?: number | number[]
};

export const MyRange: React.FC<SuperRangePropsType> = props => {
    const {onChangeRange, value} = props

    const onChangeCallback = (e: ChangeEvent<{}>, value: number | number[]) => {
        onChangeRange && onChangeRange(value as number);
    }

    return (
        <div className={S.range}>
            <Slider
                value={value}
                onChange={onChangeCallback}
            />
        </div>
    );
}