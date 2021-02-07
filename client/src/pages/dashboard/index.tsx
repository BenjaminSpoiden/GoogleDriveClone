import { Container } from "../../components/Container"
import { Navbar } from "../../components/Navbar"
import { useIsAuth } from "../../hooks/useIsAuth"

const Dashboard = () => {

    const { user } = useIsAuth()

    console.log(user?.getIdToken())
    return (
        <Container minH="100vh">
            <Navbar />
            <pre>{JSON.stringify(user?.uid, null, 2)}</pre>
        </Container>
    )
}

export default Dashboard