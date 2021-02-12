import { Center, Divider, Heading, SimpleGrid } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import React from "react"
import { DashBoardView } from "../../../components/DashBoardView"
import { FileDisplay } from "../../../components/FileDisplay"
import { FolderDisplay } from "../../../components/FolderDisplay"
import { useDisplayFolders } from "../../../hooks/useDisplayFolders"


const CurrentFolder = () => {

    const router = useRouter()
    const {folder, childFolders, childFiles} = useDisplayFolders(String(router.query.id), null)

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
                    <>
                        <Heading mb={2} size="sm" as="h5" textTransform="uppercase" >Folders</Heading>
                        <SimpleGrid columns={[1, 2, 3, 5, 6, 7]} spacing={4} >
                            {childFolders.map((childFolder) => (
                                <FolderDisplay 
                                    //@ts-ignore
                                    key={childFolder.id} 
                                    item={childFolder} />
                            
                            ))}
                        </SimpleGrid>
                    </>
                ) : null}
                {
                    //@ts-ignore
                    childFiles?.length > 0 && childFolders?.length > 0 && <Center><Divider maxW="250px" m={4} /></Center>
                }
                {childFiles && childFiles.length > 0 ? (
                    <>
                        <Heading mb={2} size="sm" as="h5" textTransform="uppercase">Files</Heading>
                        <SimpleGrid columns={[1, 2, 3, 5, 6, 7]} spacing={4}>
                            {childFiles.map(childFile => (
                                <FileDisplay 
                                    //@ts-ignore
                                    key={childFile.id} 
                                    item={childFile} 
                                />
                            ))}
                        </SimpleGrid>
                    </>
                ) : null}
            </DashBoardView>
        </>
    )
}

export default CurrentFolder