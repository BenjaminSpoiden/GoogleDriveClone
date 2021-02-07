import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { Container } from "../../components/Container"
import { DarkModeSwitch } from "../../components/DarkModeSwitch"
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
        <Container minH="100vh">
            <DarkModeSwitch />
            <pre>{JSON.stringify(user?.uid, null, 2)}</pre>
        </Container>
    )
}

export default Dashboard