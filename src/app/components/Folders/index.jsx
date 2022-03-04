import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useAuthState} from "react-firebase-hooks/auth"
import cn from "classnames"

import * as actions from "state/actions/folders"
import {auth, db} from "lib/firebase"
import Icon from "components/Icon"
import CreateFolderModal from "components/Modal/CreateFolderModal"

import style from './style.module.scss'
import icons from 'assets/svg'

const Folders = () => {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()
    const {currentFolder} = useSelector(state => state.folders)

    const [folderName, setFolderName] = useState('')
    const [isOpenCreateFolder, setOpenCreateFolder] = useState(false)


    console.log(currentFolder)

    const createFolder = () => {
        if(currentFolder == null) return
        db
            .folders
            .add({
                userId: user.uid,
                folderName: folderName,
                parentId: currentFolder.id,
                // path
                createdAt: db.getCurrentTimestamp

            })
            .then(() => {
                setFolderName('')
                setOpenCreateFolder(false)
            })
    }

    const uploadFile = () => {

    }

    useEffect(() => {
        dispatch(actions.selectFolder({
            id: currentFolder.id,
            folder: currentFolder.folder
        }))
    }, [currentFolder.id, currentFolder.folder])

    useEffect(() => {
        if(currentFolder.id == null) return dispatch(actions.updateFolder())

        db.folders
            .doc(currentFolder.id)
            .get()
            .then(doc => {
                dispatch(actions.updateFolder(db.formatDoc(doc)))
            })
            .catch(() => dispatch(actions.updateFolder()))
    }, [currentFolder.id])

    return (
        <div className={style.content_wrapper}>
            {isOpenCreateFolder && (
                <CreateFolderModal
                    onConfirmAction={createFolder}
                    onCloseAction={() => setOpenCreateFolder(false)}
                    name={folderName}
                    setName={setFolderName}
                />
            )}
            <div className={style.content_header}>
                <div className={style.breadcrumbs_wrapper}>Breadcrumbs</div>

                <div className={style.content_actions}>
                    <div className={style.icon_wrapper}>
                        <Icon className={style.action_icon} icon={icons.UploadFile}/>
                    </div>
                    <div
                        className={style.icon_wrapper}
                        onClick={() => setOpenCreateFolder(true)}>
                        <Icon className={style.action_icon} icon={icons.UploadFolder}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Folders