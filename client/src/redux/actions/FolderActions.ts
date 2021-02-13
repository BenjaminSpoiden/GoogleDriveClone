import { SELECT_FOLDER, UPDATE_FOLDER, SET_CHILD_FOLDERS, SET_CHILD_FILES } from "../constants";
import { Folder } from "../utils";

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