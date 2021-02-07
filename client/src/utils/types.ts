import firebase from "firebase"

export type FirebaseUser = {
    user: firebase.User | null
}


export type FolderData = {
    name: string,
    parentId?: string,
    uid: string,
    path?: string,
    createdAt: firebase.firestore.FieldValue
} 
