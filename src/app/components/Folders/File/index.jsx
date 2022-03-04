import React from 'react'
import {useNavigate} from "react-router-dom"
import dayjs from "dayjs"

import Icon from "components/Icon"

import fileStyle from '../style.module.scss'
import icons from "assets/svg"

const File = ({file}) => {
    const navigate = useNavigate()

    return (
        <div className={fileStyle.action_file} onClick={() => {navigate(`/drive/${file.id}`)}}>
            <Icon icon={icons.File} classIcon={fileStyle.action_folder_icon}/>
            <div className={fileStyle.action_folder_data}>
                <div>{file.folderName}</div>
                {file.createdAt && <p>{dayjs(file.createdAt.toDate()).format("MM.DD.YYYY")}</p>}
            </div>
        </div>
    )
}

export default File