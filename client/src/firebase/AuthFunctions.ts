import { auth } from "."

export const onSignUp = async (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password)
}