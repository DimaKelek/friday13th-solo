import React, {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes} from 'react'
import S from "./MySelect.module.css";

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: any) => void
}

export const MySelect: React.FC<SuperSelectPropsType> = props => {
    const {options, onChange, onChangeOption, ...restProps} = props

    const mappedOptions: any[] = options ? options
        .map((o, i) => <option key={"option - " + i}>{o}</option>) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <div className={S.select_box}>
            <select onChange={onChangeCallback} className={S.select} {...restProps}>
                {mappedOptions}
            </select>
        </div>
    )
}