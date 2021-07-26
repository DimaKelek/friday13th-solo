import React, {ChangeEvent} from "react";
import {ElementColorVariants} from "../../../../Common/MyButton/MyButton";
import {MyTextInput} from "../../../../Common/MyTextInput/MyTextInput";

export const createField = (name: string, value: string, error?: string | null,
                            handler?: (e: ChangeEvent<HTMLInputElement>) => void,
                            variant?: ElementColorVariants, placeholder?: string, type?: string,
                            blur?: (e: React.FocusEvent<any>) => void) => {

    return (
        <>
            <MyTextInput
                variant={variant}
                placeholder={placeholder}
                type={type}
                onChange={handler}
                name={name}
                onBlur={blur}
                value={value}
                style={{minWidth: "300px"}}
                error={error}
            />
        </>
    )
}