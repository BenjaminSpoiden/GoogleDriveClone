import { AddFolder } from "../../components/AddFolder"
import { Container } from "../../components/Container"
import { Folder } from "../../components/Folder"
import { Navbar } from "../../components/Navbar"
import { useFolder } from "../../hooks/useFolder"
import { useIsAuth } from "../../hooks/useIsAuth"

const Dashboard = () => {

    const { user } = useIsAuth()
    const { folder, childFolders } = useFolder("AsHcUCp4N8PshQuxFX5Q")
    
    return (
        <Container minH="100vh">
            <Navbar />
            <AddFolder currentFolder={folder} />
            { folder && <Folder folder={folder} />}
            {childFolders.length > 0 && (
                <div>
                    {childFolders.map(childFolder => <div>{childFolder.name}</div>)}
                </div>
            )}
        </Container>
    )
}

export default Dashboard