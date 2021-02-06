import { auth } from "."

export const onSignUp = async (email: string, password: string) => {
    return await auth.createUserWithEmailAndPassword(email, password)
}

export const onSignIn = async(email: string, password: string) => {
    return await auth.signInWithEmailAndPassword(email, password)
}

export const onSignOut = async () => {
    return await auth.signOut()
}

export const onResetPassword = async (email: string) => {
    return await auth.sendPasswordResetEmail(email)
}