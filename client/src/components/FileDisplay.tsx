import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { MdNote } from "react-icons/md";
import { FileData } from "../utils/types";


interface FileProps {
    item: FileData
}

export const FileDisplay = ({item}: FileProps) => {
    return (
        <>
            <Button 
                maxW="250px" 
                w="100%"
                leftIcon={<MdNote />} 
                fontWeight="bold" size="lg" 
                variant="solid"
                colorScheme="gray" 
            >
                <Text isTruncated>{item?.name}</Text>
            </Button>
        </>
    )
}