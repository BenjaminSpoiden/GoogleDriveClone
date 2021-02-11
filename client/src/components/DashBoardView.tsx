import { Flex, Wrap } from "@chakra-ui/react"
import React from "react"
import { AddFolder } from "./AddFolder"
import { Container } from "./Container"
import { Navbar } from "./Navbar"
import { FolderBreadCrumbs } from "./FolderBreadcrumbs"
import { FolderData } from "../utils/types"
import { Upload } from "./UploadFile"

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
                    <Upload currentFolder={currentFolder} />
                </Flex>
                <Flex p={4} w="100%" mx="auto" justify="flex-start" >
                    <FolderBreadCrumbs currentFolder={currentFolder}/>
                </Flex>
                <Flex p={4} w="100%" flexDir="column" >
                    {/* <Wrap spacing={4} justify={["center", "center", "center", "normal"]}> */}
                        {children}
                    {/* </Wrap> */}
                </Flex>
            </Container>
        </>
    )
}