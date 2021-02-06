import firebase from "firebase"
import "firebase/auth"
import { firebaseConfig } from "../utils/firebaseConfig"

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()


export const auth = firebase.auth()