
import { useEffect, useReducer } from "react"
import { db } from "../firebase"
import { getFolder } from "../firebase/FolderFunctions"
import { FolderActionType, FolderData, FolderState, SELECT_FOLDER, SET_CHILD_FILES, SET_CHILD_FOLDERS, UPDATE_FOLDER } from "../utils/types"
import { useAuth } from "./useAuth"



const ROOT_FOLDER: FolderData = {
    name: 'Root',
    uid: "",
    path: []
}

function reducer(state: any, {type, payloads}: FolderActionType) {
    switch (type) {
        case 'select-folder': 
            return {
                folderId: payloads.folderId,
                folder: payloads.folder,
                childFiles: [],
                childFolders: []
            }
        case 'update-folder':
            return {
                ...state,
                folder: payloads.folder
            }
        case 'set-child-folders':
            return {
                ...state,
                childFolders: payloads.childFolders
            }
        case 'set-child-files': 
            return {
                ...state,
                childFiles: payloads.childFiles
            }    
        default:
            return state
    }
}

const initialState: FolderState = {
    folders: []
}


export const useFolder = (folderId = "", folder = null) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const { user } = useAuth()
    
    useEffect(() => {
        dispatch({ 
            type: SELECT_FOLDER,
            payloads: {
                folderId,
                folder
            }
         })
    }, [folder, folderId])


    //No ID = "Root" folder

    useEffect(() => {
        if(folderId === "") {
            return dispatch({
                type: UPDATE_FOLDER,
                payloads: {
                    folder: ROOT_FOLDER
                }
            })
        }
        getFolder(folderId)
            .then(doc => {
                dispatch({
                    type: UPDATE_FOLDER,
                    payloads: {
                        folder: db.formatDocument(doc)
                    }
                })
            })        
            .catch(() => {
                dispatch({
                    type: UPDATE_FOLDER,
                    payloads: {
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
                .onSnapshot(snapshot => {
                    dispatch({
                        type: SET_CHILD_FOLDERS,
                        payloads: {
                            childFolders: snapshot.docs.map(folder => {
                                console.log(folder.data())
                                return db.formatDocument(folder)
                            })
                        }
                    })
                })
    }, [folderId, user])

    return state
}