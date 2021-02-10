import { FolderProps } from "../utils/types"
import NextLink from "next/link"
import { Button, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import { MdFolder } from "react-icons/md"


export const FolderDisplay = ({folder}: FolderProps) => {

    return (
        <LinkBox as="button" >
            <NextLink href={`/dashboard/folder/${folder.id}`} passHref >
                <LinkOverlay>
                    <Button maxW="250px" leftIcon={<MdFolder />} fontWeight="bold" size="lg" variant="outline" colorScheme="blackAlpha" >
                        <Text isTruncated >{folder.name}</Text>
                    </Button>
                </LinkOverlay>
            </NextLink>
        </LinkBox>
    )
}