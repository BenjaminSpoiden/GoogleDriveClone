import { AddFolder } from "../../components/AddFolder"
import { Container } from "../../components/Container"
import { Navbar } from "../../components/Navbar"
import { useIsAuth } from "../../hooks/useIsAuth"

const Dashboard = () => {

    const { user } = useIsAuth()

    return (
        <Container minH="100vh">
            <Navbar />
            <AddFolder />
        </Container>
    )
}

export default Dashboard