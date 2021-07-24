import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import S from "./MyRadioButton.module.css"

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

export const MyRadioButton: React.FC<SuperRadioPropsType> = props => {
    const {type, name, options, value, onChange, onChangeOption, className, ...restProps} = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }
    const finalRadioStyle = `${S.radio_container} ${className}`
    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label key={name + '-' + i} className={finalRadioStyle}>
            <input
                type={'radio'}
                onChange={onChangeCallback}
                value={o}
                name={name}
                checked={o === value}
                className={S.radio}
                {...restProps}
            />
            <span className={S.fakeRadio}/>
            {o}
        </label>
    )) : []

    return (
        <div className={S.radio_box}>{mappedOptions}</div>
    )
}