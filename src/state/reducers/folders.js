import { createReducer } from "redux-act"

import * as actions from "../actions/folders"

const ROOT_FOLDER = {id: null, name: 'Root', path: []}

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
            // console.log(payload)
            const updatedFolder = {
                ...state.currentFolder,
                folder: payload?.id
                    ? payload
                    : ROOT_FOLDER
            }

            return {
                ...state,
                currentFolder: updatedFolder
            }
        },
    },
    defaultState
)

export default folders