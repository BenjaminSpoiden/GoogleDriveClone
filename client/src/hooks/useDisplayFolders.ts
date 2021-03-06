import { useEffect, useReducer} from "react"
import { db } from "../firebase"
import { FolderData } from "../model/FolderData"
import { folderReducer } from "../redux/reducers/FolderReducer"
import { ROOT_FOLDER } from "../redux/utils"
import { useAuth } from "./useAuth"


export const useDisplayFolders = (folderId: string | null, folder: FolderData | null = null) => {

    const {user} = useAuth()

    const [state, dispatch] = useReducer(folderReducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
        
    })

    useEffect(() => {        
        dispatch({
            type: "select-folder",
            //@ts-ignore
            payload: {
                folderId,
                folder
            }
        })
              
    }, [folderId, folder])

    useEffect(() => {
        if(folderId === null) {
            return dispatch({
                type: 'update-folder',
                //@ts-ignore
                payload: {
                    folder: ROOT_FOLDER
                }
            })
        }
        db.folders
            .doc(folderId)
            .get()
            .then((doc) => {
                dispatch({
                    type: 'update-folder',
                    //@ts-ignore
                    payload: {
                        folder: db.formatDocument(doc)
                    }
                })
            })
            .catch(() => {
                dispatch({
                    type: "update-folder",
                    //@ts-ignore
                    payload: {
                        folder: ROOT_FOLDER
                    }
                })
            }) 
    }, [folderId])

    useEffect(() => {
        if(user)
        return db.folders
            .where("parentId", "==", folderId)
            .where("uid", "==", user.uid)
            .orderBy("createdAt")
            .onSnapshot(querySnapshopt => {
                dispatch({
                    type: "set-child-folders",
                    //@ts-ignore
                    payload: {
                        childFolders: querySnapshopt.docs.map(doc => db.formatDocument(doc))
                    }
                })
            })
    }, [folderId, user])

    useEffect(() => {   
        if(user)
            return db.files
                .where("folderId", "==", folderId)
                .where("uid", "==", user.uid)
                .orderBy("createdAt")
                .onSnapshot(querySnapshot => {
                    dispatch({
                        type: "set-child-files",
                        //@ts-ignore
                        payload: {
                            childFiles: querySnapshot.docs.map(doc => db.formatDocument(doc))
                        }
                    })
                })
    }, [folderId, user])

    return state
}