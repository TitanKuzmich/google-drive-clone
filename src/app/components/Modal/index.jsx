import React, {useEffect, useRef, useState} from 'react'
import cn from "classnames"

import Icon from "components/Icon"

import style from './style.module.scss'
import icons from "assets/svg"

const Modal = ({
       onConfirmAction,
       onCloseAction,
       header,
       content,
       enableConfirm = true,
       buttons = true
   }) => {
    const modalRef = useRef(null)

    const onConfirm = () => {
        onConfirmAction()
    }

    const onClose = () => {
        onCloseAction()
    }

    const disableWindowScroll = () => window.scrollTo(
        window.pageYOffset || document.documentElement.scrollTop,
        window.pageXOffset || document.documentElement.scrollLeft
    )

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef?.current && !modalRef?.current.contains(event.target)) onClose()
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [modalRef])

    useEffect(() => {
        window.addEventListener('scroll', disableWindowScroll)
        return () => window.removeEventListener("scroll", disableWindowScroll)
    }, [])

    return (
        <div className={style.modal_cover}>
            <div className={style.modal_wrapper} ref={modalRef}>
                <div className={style.modal_header}>
                    {header()}
                    <div className={style.close_icon__wrapper} onClick={onClose}>
                        <Icon
                            icon={icons.Close}
                            classIcon={style.close_icon}
                        />
                    </div>
                </div>

                <div className={style.modal_content}>
                    {content()}
                </div>

                {buttons && (
                    <div className={style.modal_footer}>
                        <div
                            className={cn(style.modal_submit, {
                                [style.modal_submit__disabled]: !enableConfirm
                            })}
                            onClick={enableConfirm ? onConfirm : () => {}}
                        >
                            Submit
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal