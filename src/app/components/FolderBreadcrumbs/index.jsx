import React from 'react'
import cn from "classnames"
import {useNavigate} from "react-router-dom"
import nextId from "react-id-generator"

import {ROOT_FOLDER} from "state/reducers/folders"
import Icon from "components/Icon"

import style from './style.module.scss'
import icons from "assets/svg"

const FolderBreadcrumbs = ({currentFolder}) => {
    const navigate = useNavigate()
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) path = [...path, ...currentFolder.path]

    return (
        <div className={style.breadcrumbs_wrapper}>
            {path.map((folder, ind) => (
                <>
                    {folder.id && <Icon icon={icons.Next} classIcon={style.breadcrumbs_icon}/>}
                    <div
                        key={`${nextId()}`}
                        className={style.breadcrumbs_item}
                        onClick={() => folder.id
                            ? navigate(`/drive/${folder.id}`)
                            : navigate(`/drive`)}
                    >
                        {folder.folderName}
                    </div>
                </>
            ))}
            {currentFolder && (
                <>
                    <Icon icon={icons.Next} classIcon={style.breadcrumbs_icon}/>
                    <div className={cn(style.breadcrumbs_item, style.breadcrumbs_item__active)}>
                        {currentFolder.folderName}
                    </div>
                </>
            )}
        </div>
    )
}

export default FolderBreadcrumbs
