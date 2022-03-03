import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useAuthState} from "react-firebase-hooks/auth"
import cn from "classnames"

import {auth} from "lib/firebase"
import Icon from "components/Icon"

import style from './style.module.scss'
import images from 'assets/img'
import icons from 'assets/svg'

const Folders = () => {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()

    const [isInfoOpen, setInfoOpen] = useState(false)
    const [timer, setTimer] = useState(0)

    const popupRef = useRef(null)

    const onSignOut = async () => {
        await auth.signOut()
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef?.current && !popupRef?.current.contains(event.target)) {
                event.stopPropagation()
                setInfoOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [popupRef])

    return (
        <div className={style.content_wrapper}>
            <div className={style.content_header}>
                <div className={style.breadcrumbs_wrapper}>Breadcrumbs</div>

                <div className={style.content_actions}>
                    <div className={style.icon_wrapper}>
                        <Icon className={style.action_icon} icon={icons.UploadFile}/>
                    </div>
                    <div className={style.icon_wrapper}>
                        <Icon className={style.action_icon} icon={icons.UploadFolder}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Folders