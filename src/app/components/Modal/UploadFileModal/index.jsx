import React, {useState} from 'react'
import {useAuthState} from "react-firebase-hooks/auth"
import {v4 as uuidV4} from 'uuid'

import {ROOT_FOLDER} from "state/reducers/folders"
import {auth, db, storage} from "lib/firebase"
import Modal from "components/Modal"

import style from '../style.module.scss'

const UploadFileModal = ({currentFolder, setData, setConfirmUpload, onCloseAction}) => {
    const [user] = useAuthState(auth)

    const [enableConfirm, setEnableConfirm] = useState(false)
    const [uploadingFiles, setUploadingFiles] = useState([])

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (!currentFolder || !file) return

        const id = uuidV4()
        setUploadingFiles(preventUploadingFiles => [
            ...preventUploadingFiles,
            {
                id: id,
                name: file.name,
                progress: 0,
                error: false
            }
        ])

        const filePath =
            currentFolder === ROOT_FOLDER
                ? `${currentFolder.path.join('/')}`
                : `${currentFolder.path.join('/')}/${currentFolder.folderName}`

        const uploadTask = storage
            .ref(`/files/${user.uid}/${filePath}/${file.name}`)
            .put(file)

        uploadTask.on(
            'state_changed',
            snapshot => {
            },
            () => {
            },
            () => {
                uploadTask
                    .snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        setEnableConfirm(true)
                        setData({
                            file: file,
                            fileUrl: url,
                            fileFullPath: filePath
                        })
                    })
            }
        )
    }

    const header = () => {
        return (
            <span className={style.modal_header__text}>Upload File</span>
        )
    }

    const content = () => {
        return (
            <>
                <label className={style.modal_content__upload}>
                    Choose file
                    <input
                        onChange={handleUpload}
                        type="file"
                        hidden
                    />
                </label>

                {uploadingFiles.length > 0 && (
                    <>
                        {uploadingFiles.map(file => (
                            <div>{file.name}</div>
                        ))}
                    </>
                )

                }
            </>
        )
    }

    return (
        <Modal
            enableConfirm={enableConfirm}
            onConfirmAction={() => setConfirmUpload(true)}
            onCloseAction={onCloseAction}
            header={header}
            content={content}
        />
    )
}

export default UploadFileModal