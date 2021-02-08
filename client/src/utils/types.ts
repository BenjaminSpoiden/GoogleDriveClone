import firebase from "firebase"

export type FirebaseUser = {
    user: firebase.User | null
}


export type FolderData = {
    name: string,
    parentId?: string,
    uid: string,
    path?: any[],
    createdAt?: firebase.firestore.FieldValue
} 

// Folder Type 

export interface Folder {
    folderId: string, 
    folder: any,
    childFolders: any[],
    childFiles: any[]
}

export interface FolderState {
    folders: Folder[]
}


export const SELECT_FOLDER = "select-folder"
export const UPDATE_FOLDER = "update-folder"
export const SET_CHILD_FOLDERS = "set-child-folders"
export const SET_CHILD_FILES = "set-child-files"

export type SelectFolderAction = {
    type: typeof SELECT_FOLDER
    payloads: Folder
}

export interface UpdateFolderAction {
    type: typeof UPDATE_FOLDER
    payloads: Folder
}

export interface SetChildFoldersAction {
    type: typeof SET_CHILD_FOLDERS
    payloads: Folder
}

export interface SetChildFilesAction {
    type: typeof SET_CHILD_FILES
    payloads: Folder
}

export type FolderActionType = SelectFolderAction | UpdateFolderAction | SetChildFoldersAction | SetChildFilesAction