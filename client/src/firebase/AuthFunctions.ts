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

export const onSendResetPasswordEmail = async (email: string) => {
    return await auth.sendPasswordResetEmail(email, {
        url: "http://localhost:3000/reset-password",
        handleCodeInApp: true
    })
}

export const onResetPassword = async (code: string, password: string) => {
    return await auth.confirmPasswordReset(code, password)
}