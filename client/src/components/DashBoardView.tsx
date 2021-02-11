import { Flex} from "@chakra-ui/react"
import React from "react"
import { AddFile } from "./AddFile"
import { AddFolder } from "./AddFolder"
import { Container } from "./Container"
import { Navbar } from "./Navbar"
import { FolderBreadCrumbs } from "./FolderBreadcrumbs"
import { FolderData } from "../utils/types"
import { Head } from "next/document"

interface DashBoardViewProps {
    currentFolder: FolderData | null

}

export const DashBoardView: React.FC<DashBoardViewProps> = ({children, currentFolder}) => {

    return (
        <>
            <Container minH="100vh">
                <Navbar />
                <Flex px={4} w="100%" mx="auto" justify="flex-start" >
                    <AddFolder currentFolder={currentFolder}/>
                    <AddFile />
                </Flex>
                <Flex p={4} w="100%" mx="auto" justify="flex-start" >
                    <FolderBreadCrumbs currentFolder={currentFolder}/>
                </Flex>
                <Flex>
                    {children}
                </Flex>
            </Container>
        </>
    )
}