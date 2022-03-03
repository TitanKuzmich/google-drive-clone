import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useAuthState} from "react-firebase-hooks/auth"
import cn from "classnames"

import {auth} from "lib/firebase"
import Icon from "components/Icon"

import style from './style.module.scss'
import images from 'assets/img'
import icons from 'assets/svg'

const Header = () => {
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
        <div className={style.header}>
            <div className={style.header_logo}>
                <img src={images.DriveLogo} alt="logo"/>
                <p>Drive</p>
            </div>

            <div/>

            <div className={style.header_apps}>
                <div className={style.icon_wrapper}>
                    <Icon icon={icons.Apps} classIcon={style.apps_icon}/>
                </div>

                <div className={cn(style.header_avatar, {[style.header_avatar__open]: isInfoOpen})}>
                    {user?.photoURL || user?.displayName ?(
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            onClick={() => setInfoOpen(!isInfoOpen)}
                        />
                    ) : (
                        <div
                            className={style.header_avatar__blank}
                            onClick={() => setInfoOpen(!isInfoOpen)}
                        >
                            {user?.email.slice(0, 2)}
                        </div>
                    )}

                    <div ref={popupRef}>
                        {isInfoOpen && (
                            <div className={style.info_pop_up}>
                                <div className={style.info_pop_up__info}>
                                    <p>{user?.displayName}</p>
                                    <p>{user?.email}</p>
                                </div>
                                <div
                                    className={style.sign_out}
                                    onClick={onSignOut}
                                >
                                    Sign Out
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header