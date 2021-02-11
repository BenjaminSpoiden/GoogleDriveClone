import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import React from "react"
import { DashBoardView } from "../../../components/DashBoardView"
import { FolderDisplay } from "../../../components/FolderDisplay"
import { useDisplayFolders } from "../../../hooks/useDisplayFolders"


const CurrentFolder = () => {

    const router = useRouter()
    const {folder, childFolders} = useDisplayFolders(String(router.query.id), null)
    return (
        <>
        {folder && (
            <Head>
                <title>
                    {folder.name}
                </title>
            </Head>
        )}
            <DashBoardView currentFolder={folder}>
                {childFolders && childFolders.length > 0 ? (
                    //@ts-ignore
                    childFolders.map((childFolder) => <FolderDisplay key={childFolder.id} item={childFolder} />)
                ) : null}
            </DashBoardView>
        </>
    )
}

export default CurrentFolder