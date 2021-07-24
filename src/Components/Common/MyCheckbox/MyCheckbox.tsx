import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import S from "./MyCheckbox.module.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type NeonCheckboxPropsType = DefaultInputPropsType & {
    checked?: boolean
    onChangeChecked?: (e: boolean) => void
}

export const MyCheckbox: React.FC<NeonCheckboxPropsType> = props => {
    const {onChange, children, onChangeChecked, checked, ...restProps} = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }
    const labelCheckbox = `${S.check} ${S.option}`

    return (
        <label className={labelCheckbox}>
            <input
                checked={checked}
                onChange={onChangeCallback}
                type={"checkbox"}
                className={S.checkInput}
                {...restProps}
            />
            <span className={S.checkbox}/>
            {children && <span className={S.labelText}>{children}</span>}
        </label>
    )
}