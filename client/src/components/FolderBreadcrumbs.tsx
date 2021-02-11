import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import React, { useState } from "react"
import NextLink from "next/link"
import { FolderData, Path, ROOT_FOLDER } from "../utils/types"

interface FolderBCProps  {
    currentFolder: FolderData | null
}

export const FolderBreadCrumbs = ({currentFolder}: FolderBCProps) => {

    let path: Path[] = currentFolder === ROOT_FOLDER ? [] : [{name: 'Root', id: ''}]
   
    if(currentFolder) {
        currentFolder.path.forEach(itemPath => {
            path.push(itemPath)
        })
    }
    console.log("path: ", path)
   
    return (
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500"/>}>
            {path.map((path, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink><NextLink href={ path.id !== '' ? `/dashboard/folder/${path.id}` : `/dashboard`}>{path.name}</NextLink></BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}