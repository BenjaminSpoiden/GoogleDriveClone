import { Container } from "../../components/Container"
import { useIsAuth } from "../../hooks/useIsAuth";

const ProfileIndex = () => {

    const { user } = useIsAuth()

    return (
        <Container minH="100vh">
            PROFILE PAGE
        </Container>
    )
}

export default ProfileIndex