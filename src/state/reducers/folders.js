import { createReducer } from "redux-act"

import * as actions from "../actions/folders"

export const ROOT_FOLDER = {id: null, folderName: 'Root', path: []}

const defaultState = {
    isLoading: false,
    folders: [],

    currentFolder: {
        id: null,
        folder: null,
        childFolders: [],
        childFiles: []
    }
}

const folders = createReducer(
    {
        [actions.getFolderListRequest.getType()](state) {
            return {
                ...state,
                isLoading: true
            }
        },
        [actions.getFolderListSuccess.getType()](state, payload) {
            return {
                ...state,
                isLoading: false,
                folders: payload
            }
        },
        [actions.getFolderListFail.getType()](state) {
            return {
                ...state,
                isLoading: false
            }
        },
        [actions.selectFolder.getType()](state, payload) {
            const selectedFolder = {...state.currentFolder, ...payload}

            return {
                ...state,
                currentFolder: selectedFolder
            }
        },
        [actions.updateFolder.getType()](state, payload) {
            const updatedFolder = {
                ...state.currentFolder,
                folder: payload?.id
                    ? {...state.currentFolder.folder, ...payload}
                    : ROOT_FOLDER
            }

            return {
                ...state,
                currentFolder: updatedFolder
            }
        },
        [actions.setChildFolders.getType()](state, payload) {
            const childFolders = {
                ...state.currentFolder,
                childFolders: payload
            }

            return {
                ...state,
                currentFolder: childFolders
            }
        },
        [actions.setChildFiles.getType()](state, payload) {
            const childFiles = {
                ...state.currentFolder,
                childFiles: payload
            }

            return {
                ...state,
                currentFolder: childFiles
            }
        },
    },
    defaultState
)

export default folders