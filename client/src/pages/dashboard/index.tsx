import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import React, { useEffect } from "react"
import { AddFile } from "../../components/AddFile"
import { AddFolder } from "../../components/AddFolder"
import { Container } from "../../components/Container"
import { FolderDisplay } from "../../components/FolderDisplay"
import { Navbar } from "../../components/Navbar"
import { db } from "../../firebase"
import { useDisplayFolders } from "../../hooks/useDisplayFolders"
import { useIsAuth } from "../../hooks/useIsAuth"


const Dashboard = () => {

    const { user } = useIsAuth()
    const folders = useDisplayFolders()
    
    return (
        <Container minH="100vh">
            <Navbar />
            <Flex px={4} w="100%" mx="auto" justify="flex-start" >
                <AddFolder currentFolder={null} />
                <AddFile />
            </Flex>
            <Flex p={4} w="100%" mx="auto" justify="flex-start" >
                <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                    <BreadcrumbItem isCurrentPage >
                        <BreadcrumbLink href="#">Root</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>
            <Flex>
                {folders ? (
                    folders.map((doc, index) => {
                        console.log(db.formatDocument(doc))
                        return <FolderDisplay key={index} folder={db.formatDocument(doc)}/>
                    })
                ) : null}
            </Flex>
        </Container>
    )
}

export default Dashboard