import { createAction } from "redux-act"

export const getFolderListRequest = createAction("GET_FOLDER_LIST_REQUEST")
export const getFolderListSuccess = createAction("GET_FOLDER_LIST_SUCCESS")
export const getFolderListFail = createAction("GET_FOLDER_LIST_FAIL")

export const selectFolder = createAction("SELECT_FOLDER")
export const updateFolder = createAction("UPDATE_FOLDER")