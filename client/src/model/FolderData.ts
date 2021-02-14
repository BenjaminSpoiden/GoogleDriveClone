import firebase from "../firebase/index"
import { Path } from "./Path"

export type FolderData = {
    name: string | null,
    parentId: string | null,
    uid: string | null,
    path: Path[],
    createdAt: firebase.firestore.FieldValue | null
}