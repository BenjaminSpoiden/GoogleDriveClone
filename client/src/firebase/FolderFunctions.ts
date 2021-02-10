import { db } from "."
import { FolderData } from "../utils/types"


export const addNewFolder = async (folderData: FolderData) => {
    return await db.folders.add(folderData)
}

export const fetchFolders = (uid: string) => {
    return db.folders.where("uid", "==", uid).orderBy("createdAt")
}
