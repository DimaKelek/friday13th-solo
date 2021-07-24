import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from 'react'
import {MyTextInput} from "../MyTextInput/MyTextInput";
import {MyButton} from "../MyButton/MyButton";
import S from "./MyEditSpan.module.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string

    spanProps?: DefaultSpanPropsType
}

export const MyEditableSpan: React.FC<SuperEditableSpanType> = props => {
    const {autoFocus, onBlur, onEnter, spanProps, ...restProps} = props
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEnterCallback = () => {
        setEditMode(false)
        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
        onDoubleClick && onDoubleClick(e)
    }
    const editCallback = () => {
        setEditMode(true)
    }
    return (
        <div className={S.editSpan_box}>
            {editMode
                ? <MyTextInput autoFocus onBlur={onBlurCallback} onEnter={onEnterCallback} {...restProps}/>
                : <>
                    <MyButton onClick={editCallback}>✎ Edit</MyButton>
                    <div className={S.span_box}>
                        <span onDoubleClick={onDoubleClickCallBack}
                             className={className} {...restSpanProps}
                        >{children || restProps.value}</span>
                        <span className={S.line}/>
                    </div>
                </>
            }
        </div>
    )
}