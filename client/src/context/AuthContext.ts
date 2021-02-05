import { createContext } from "react"
import { FirebaseUser } from "../utils/types"

type AuthProps = {
    user: FirebaseUser | null
}

export const AuthContext = createContext<AuthProps>({
    user: null
})

