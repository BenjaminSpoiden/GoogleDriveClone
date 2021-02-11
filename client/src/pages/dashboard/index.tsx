import { WrapItem } from "@chakra-ui/react"
import Head from "next/head"
import React from "react"
import { DashBoardView } from "../../components/DashBoardView"
import { FolderDisplay } from "../../components/FolderDisplay"
import { useDisplayFolders } from "../../hooks/useDisplayFolders"
import { useIsAuth } from "../../hooks/useIsAuth"

const Dashboard = () => {

    const { user } = useIsAuth()
    
    const { folder, childFolders } = useDisplayFolders(null, null)
    
    return (
        <>
            <Head>
                <title>Root Folder</title>
            </Head>
            <DashBoardView currentFolder={folder}>
                {childFolders && childFolders.length > 0 ? (
                    //@ts-ignore
                    childFolders.map((childFolder) => (
                        <WrapItem>
                            <FolderDisplay key={childFolder.id} item={childFolder} />
                        </WrapItem>
                    ))
                ) : null}
            </DashBoardView>
        </>
    )
}

export default Dashboard