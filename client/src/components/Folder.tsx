import { FolderData } from "../utils/types"
import NextLink from "next/link"
import { Button, LinkBox, LinkOverlay } from "@chakra-ui/react"
import { MdFolder } from "react-icons/md"

interface FolderProps {
    folder: FolderData
}


export const Folder = ({folder}: FolderProps) => {

    
    return (
        <LinkBox as="button" >
            <NextLink href={`/dashboard/folder/${folder.id}`} passHref >
                <LinkOverlay>
                    <Button leftIcon={<MdFolder />} fontWeight="bold" size="lg" variant="outline" colorScheme="blackAlpha" >
                        {folder.name}
                    </Button>
                </LinkOverlay>
            </NextLink>
        </LinkBox>
    )
}