import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link"
import { FolderData } from "../utils/types"

interface FolderBCProps  {
    currentFolder: any | null
}

export const FolderBreadCrumbs  = ({currentFolder}: FolderBCProps) => {
    // console.log("bc: ", currentFolder.name)
    return (
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500"/>}>
           { currentFolder ? <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink as={NextLink} href="/dashboard">{currentFolder.name}</BreadcrumbLink>
            </BreadcrumbItem> : null}
        </Breadcrumb>
    )
}