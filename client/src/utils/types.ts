import firebase from "../firebase/index"
import { FolderData } from "../model/FolderData"

export type FirebaseUser = {
    user: firebase.User | null
}


export interface FolderProps {
    item: FolderData | null
}

