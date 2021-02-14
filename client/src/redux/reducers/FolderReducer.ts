import { FolderActionType } from "../types/FolderTypes"
import { Folder } from "../utils"

export const folderReducer = (state: Folder, {type, payload}: FolderActionType): Folder => {
    switch(type) {
        case 'select-folder': {
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: []    
            }
        }
        case 'update-folder': {
            return {
                ...state,
                folder: payload.folder
                
            }
        }
        case 'set-child-folders': {
            return {
                ...state,
                childFolders: payload.childFolders
            }
        }
        case 'set-child-files': {
            return {
                ...state,
                childFiles: payload.childFiles
            }
        }
        default: {
            return state
        }
    }
    
}