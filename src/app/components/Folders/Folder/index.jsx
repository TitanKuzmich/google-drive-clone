import React from 'react'
import {useNavigate} from "react-router-dom"
import dayjs from "dayjs"

import Icon from "components/Icon"

import style from './style.module.scss'
import icons from "assets/svg"

const Folder = ({folder}) => {
    const navigate = useNavigate()

    return (
        <div className={style.folder} onClick={() => {navigate(`/drive/${folder.id}`)}}>
            <Icon icon={icons.Folder} classIcon={style.folder_icon}/>
            <div className={style.folder_data}>
                <div>{folder.folderName}</div>
                {folder.createdAt && <p>{dayjs(folder.createdAt.toDate()).format("MM.DD.YYYY")}</p>}
            </div>
        </div>
    )
}

export default Folder