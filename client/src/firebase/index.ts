import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import { firebaseConfig } from "../utils/firebaseConfig"

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const firestore = firebase.firestore()
export const db = {
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    getCurentTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    formatDocument: (doc: any) => {
        return {
            id: doc.id,
            ...doc.data() 
        }
    }
}

export const auth = firebase.auth()
export const storage = firebase.storage()
export default firebase