import React from "react"
import { DashBoardView } from "../../components/DashBoardView"
import { FolderDisplay } from "../../components/FolderDisplay"
import { useDisplayFolders } from "../../hooks/useDisplayFolders"
import { useIsAuth } from "../../hooks/useIsAuth"
import { useRouter } from "next/dist/client/router"

const Dashboard = () => {

    const { user } = useIsAuth()
    const router = useRouter()

    console.log("router: ", router.query)

    const { folder, childFolders } = useDisplayFolders(null, null)
    // console.log(folder)
    // console.log("child", childFolders)
    return (
        
        <DashBoardView currentFolder={folder}>
            {childFolders && childFolders.length > 0 ? (
                //@ts-ignore
                childFolders.map((childFolder) => <FolderDisplay key={childFolder.id} item={childFolder} />)
            ) : null}
        </DashBoardView>
    )
}

export default Dashboard