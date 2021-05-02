import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { useAuth } from "./useAuth"

export const useIsAuth = () => {

    const auth = useAuth()
    const router = useRouter()
    const { user, loading } = auth

     useEffect(() => {
        if(!user && !loading) {
            router.replace("/login")
        }
    }, [user, loading])

    return auth
}