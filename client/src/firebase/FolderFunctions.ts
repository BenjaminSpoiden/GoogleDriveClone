import { db } from "."
import { FileData } from "../model/FileData"
import { FolderData } from "../model/FolderData"



export const addNewFolder = async (folderData: FolderData) => {
    return await db.folders.add(folderData)
}

export const fetchFolders = (uid: string) => {
    return db.folders.where("uid", "==", uid).orderBy("createdAt")
}

export const addNewFile = async (fileData: FileData) => {
    return await db.files.add(fileData)
}