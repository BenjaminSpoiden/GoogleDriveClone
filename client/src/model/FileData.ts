import firebase from "../firebase/index"

export type FileData = {
    url: string | null,
    name: string | null,
    folderId: string | null,
    uid: string | null,
    type: string | null,
    size: number | null, 
    createdAt: firebase.firestore.FieldValue | null
}