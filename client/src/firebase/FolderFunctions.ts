import { db } from "."
import { FolderData } from "../utils/types"


export const addNewFolder = async (folderData: FolderData) => {
    return await db.folders.add(folderData)
}

export const getFolder = async (folderId: string) => {
    return await db.folders.doc(folderId).get()
}