import React, {ChangeEvent, DetailedHTMLProps, KeyboardEvent, TextareaHTMLAttributes} from "react";
import S from "./MyTextarea.module.css"

type DefaultInputPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type MyTextareaProps = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
}

export const MyTextarea: React.FC<MyTextareaProps> = props => {
    const {onChange, onKeyPress, className, error, onChangeText, onEnter, ...restProps} = props

    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }
    const finalClassName = `${className} ${error && S.error} ${S.textarea}`

    return (
        <>
            <textarea
                className={finalClassName}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                {...restProps}
            />
            <span className={S.errorMessage}>{error}</span>
        </>

    )
}