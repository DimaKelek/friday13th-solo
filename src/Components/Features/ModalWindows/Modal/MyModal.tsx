import React from "react";
import S from "./Modal.module.css"

type ModalProps = {
    closeModal: () => void
    width?: string
    height?: string
    title?: string
    prevMessage?: string
    afterMessage?: string
    data?: any
}

export const MyModal: React.FC<ModalProps> = props => {
    const {closeModal, width, height, title, prevMessage, afterMessage, children, data} = props
    const styleSettings = {width, height}

    return (
        <>
            <div className={S.background} onClick={closeModal}/>
            <div className={S.modal} style={styleSettings}>
                <div className={S.closeModal} onClick={closeModal}>X</div>
                <div className={S.modal_container}>
                    {title && <h2>{title}</h2>}
                    {prevMessage && <span className={S.prev}>{prevMessage}</span>}
                    {children}
                    {afterMessage && <span className={S.after}>{prevMessage}</span>}
                </div>
            </div>
        </>

    )
}