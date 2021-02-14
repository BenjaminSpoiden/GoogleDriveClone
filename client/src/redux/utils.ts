import { FileData } from "../model/FileData";
import { FolderData } from "../model/FolderData";

export const ROOT_FOLDER: FolderData = {
    createdAt: null,
    name: 'Root',
    uid: null,
    path: [],
    parentId: null
}

export interface Folder {
    folderId: string | null, 
    folder: FolderData | null,
    childFolders: FolderData[] | null,
    childFiles: FileData[] | null
}