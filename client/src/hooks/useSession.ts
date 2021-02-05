import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useSession = () => {
    
    const {user} = useContext(AuthContext)
    return user
}