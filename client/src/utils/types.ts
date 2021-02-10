import firebase from "firebase"

export type FirebaseUser = {
    user: firebase.User | null
}


export type FolderData = {
    name: string | null,
    parentId: string | null,
    uid: string | null,
    path: any[] | null,
    createdAt: firebase.firestore.FieldValue | null
}

// Folder Type 

export interface Folder {
    folderId: string | null, 
    folder: FolderData | null,
    childFolders: FolderData[] | null,
    childFiles: any[] | null
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
    payload: Folder
}

export interface UpdateFolderAction {
    type: typeof UPDATE_FOLDER
    payload: Folder 
}

export interface SetChildFoldersAction {
    type: typeof SET_CHILD_FOLDERS
    payload: Folder 
}

export interface SetChildFilesAction {
    type: typeof SET_CHILD_FILES
    payload: Folder 
}

export type FolderActionType = SelectFolderAction | UpdateFolderAction | SetChildFoldersAction | SetChildFilesAction


export interface FolderProps {
    item: FolderData | null
}