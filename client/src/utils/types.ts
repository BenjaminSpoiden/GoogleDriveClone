import firebase from "firebase"

export interface FirebaseUser {
    user: firebase.User | null
}
