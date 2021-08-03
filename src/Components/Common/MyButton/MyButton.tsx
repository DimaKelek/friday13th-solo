import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import S from "./MyButton.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type MyButtonPropsType = DefaultButtonPropsType & {
    variant?: ElementColorVariants
}

export type ElementColorVariants = "light" | "dark" | "standard" | "purple"

export const MyButton: React.FC<MyButtonPropsType> = props => {
    const {disabled, onClick, className, children, variant, ...restProps} = props
    const finalClassName = `${className} ${S.button} ${variant && S[variant]}`

    return (
        <button
            className={finalClassName}
            onClick={onClick}
            disabled={disabled}
            {...restProps}
        >{children}</button>
    );
}