import { useAuth } from "../hooks/useAuth"
import { AuthContext } from "./AuthContext"

export const AuthProdiver = ({children}: any) => {

    const {user} = useAuth()

    return (
        //@ts-ignore
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider> 
    )
}