import React, {useState} from 'react'
import {useAuthState} from "react-firebase-hooks/auth"

import {ROOT_FOLDER} from "state/reducers/folders"
import {auth, storage} from "lib/firebase"
import Modal from "components/Modal"

import style from '../style.module.scss'

const UploadFileModal = ({currentFolder, setData, onConfirmAction, onCloseAction}) => {
    const [user] = useAuthState(auth)

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (!currentFolder || !file) return

        const filePath =
            currentFolder === ROOT_FOLDER
            ? `${currentFolder.path.join('/')}`
            : `${currentFolder.path.join('/')}/${currentFolder.folderName}`

        setData({
            file: file,
            fullFilePath: `/files/${user.uid}/${filePath}/${file.name}`
        })
    }

    const header = () => {
        return (
            <span className={style.modal_header__text}>Upload File</span>
        )
    }

    const content = () => {
        return (
            <label className={style.modal_content__upload}>
                Choose file
                <input
                    onChange={handleUpload}
                    type="file"
                    hidden
                />
            </label>
        )
    }

    return (
        <Modal
            onConfirmAction={onConfirmAction}
            onCloseAction={onCloseAction}
            header={header}
            content={content}
        />
    )
}

export default UploadFileModal