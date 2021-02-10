import { FolderProps } from "../utils/types"
import NextLink from "next/link"
import { Button, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import { MdFolder } from "react-icons/md"


export const FolderDisplay = ({item}: FolderProps) => {
    // console.log("display: ", item)
    return (
        <LinkBox as="button" >
           {/* @ts-ignore */}
            <NextLink href={`/dashboard/folder/${item?.id}`} passHref >
                <LinkOverlay>
                    <Button maxW="250px" leftIcon={<MdFolder />} fontWeight="bold" size="lg" variant="outline" colorScheme="blackAlpha" >
                        <Text isTruncated >{item?.name}</Text>
                    </Button>
                </LinkOverlay>
            </NextLink>
        </LinkBox>
    )
}