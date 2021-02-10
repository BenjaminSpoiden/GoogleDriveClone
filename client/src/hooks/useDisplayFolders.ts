import { useEffect, useState } from "react"
import { db } from "../firebase"
import { fetchFolders } from "../firebase/FolderFunctions"
import firebase from "../firebase/index"
import { useAuth } from "./useAuth"

export const useDisplayFolders = () => {
    const [folderData, setFolderData] = useState<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] | null>(null)
    
    const {user} = useAuth()

    useEffect(() => {
        if(user)
            fetchFolders(user.uid)
                .onSnapshot(snapShotData => {
                    setFolderData(snapShotData.docs)
                })
           
    }, [user])

    return folderData

}