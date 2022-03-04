import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useAuthState} from "react-firebase-hooks/auth"
import {useParams} from "react-router-dom"

import * as actions from "state/actions/folders"
import {ROOT_FOLDER} from "state/reducers/folders"
import {auth, db, storage} from "lib/firebase"
import Icon from "components/Icon"
import CreateFolderModal from "components/Modal/CreateFolderModal"
import UploadFileModal from "components/Modal/UploadFileModal"
import Folder from "components/Folders/Folder"
import FolderBreadcrumbs from "components/FolderBreadcrumbs"

import style from './style.module.scss'
import icons from 'assets/svg'

const Folders = () => {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()
    const {currentFolder} = useSelector(state => state.folders)

    const {folderId} = useParams()

    const [folderName, setFolderName] = useState('')
    const [isOpenCreateFolder, setOpenCreateFolder] = useState(false)
    const [isOpenUploadFile, setOpenUploadFile] = useState(false)
    const [data, setData] = useState({
        file: null,
        fullFilePath: "",
    })

    const createFolder = () => {
        if (currentFolder == null) return

        console.log(currentFolder)
        const path = [...currentFolder.folder.path]
        if (currentFolder.folder !== ROOT_FOLDER) {
            path.push({folderName: currentFolder.folder.folderName, id: currentFolder.folder.id})
            console.log(path)
        }

        db
            .folders
            .add({
                userId: user.uid,
                folderName: folderName,
                parentId: folderId || null,
                path: path,
                createdAt: db.getCurrentTimestamp

            })
            .then(() => {
                setFolderName('')
                setOpenCreateFolder(false)
            })
    }

    const uploadFile = () => {
        storage.ref(data.fullFilePath).put(data.file)
    }

    useEffect(() => {
        dispatch(actions.selectFolder({
            id: folderId || null,
            folder: currentFolder.folder
        }))
    }, [folderId, currentFolder.folder])

    useEffect(async () => {
        if (!folderId) return dispatch(actions.updateFolder())

        await db.folders
            .doc(folderId)
            .get()
            .then(doc => {
                dispatch(actions.updateFolder(db.formatDoc(doc)))
            })
            .catch(() => dispatch(actions.updateFolder()))
    }, [folderId])

    useEffect(() => {
        return db.folders
            .where('parentId', '==', folderId || null)
            .where('userId', '==', user.uid)
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                dispatch(actions.setChildFolders(snapshot.docs.map(db.formatDoc)))
            })
    }, [folderId, user])

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
            {isOpenUploadFile && (
                <UploadFileModal
                    currentFolder={currentFolder.folder}
                    setData={setData}
                    onConfirmAction={uploadFile}
                    onCloseAction={() => setOpenUploadFile(false)}
                />
            )}
            <div className={style.content_header}>
                <FolderBreadcrumbs currentFolder={currentFolder.folder}/>

                <div className={style.content_actions}>
                    <div
                        className={style.icon_wrapper}
                        onClick={() => setOpenUploadFile(true)}
                    >
                        <Icon className={style.action_icon} icon={icons.UploadFile}/>
                    </div>
                    <div
                        className={style.icon_wrapper}
                        onClick={() => setOpenCreateFolder(true)}
                    >
                        <Icon className={style.action_icon} icon={icons.UploadFolder}/>
                    </div>
                </div>
            </div>

            <div className={style.content_folders}>
                {currentFolder.childFolders.length > 0 && (
                    <div className={style.content_folders_wrapper}>
                        {currentFolder.childFolders.map(childFolder => (
                            <Folder key={childFolder.id} folder={childFolder}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Folders
