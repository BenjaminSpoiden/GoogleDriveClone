import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"

const Dashboard = () => {

    const router = useRouter()
    const { user, loading } = useAuth()

    useEffect(() => {
        if(!user && !loading) {
            router.replace("/")
        }
    }, [user, loading])

    return (
        <Heading>
            USERS ONLY
        </Heading>
    )
}

export default Dashboard