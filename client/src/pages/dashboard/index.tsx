import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { AddFile } from "../../components/AddFile"
import { Container } from "../../components/Container"
import { Navbar } from "../../components/Navbar"
import { useIsAuth } from "../../hooks/useIsAuth"


const Dashboard = () => {

    const { user } = useIsAuth()
    const router = useRouter()

    return (
        <Container minH="100vh">
            <Navbar />
            <Flex px={4} w="100%" mx="auto" justify="flex-start" >
                
                <AddFile />
            </Flex>
            <Flex p={4} w="100%" mx="auto" justify="flex-start" >
                <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                    <BreadcrumbItem isCurrentPage >
                        <BreadcrumbLink href="#">Root</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex>
        </Container>
    )
}

export default Dashboard