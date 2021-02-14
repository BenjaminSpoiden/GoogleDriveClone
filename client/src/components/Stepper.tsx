import { SearchIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Progress, useNumberInput, Text, Stack } from "@chakra-ui/react"
import React from "react"


export const Stepper = () => {

    const {getInputProps, getIncrementButtonProps, getDecrementButtonProps} = useNumberInput({
        step: 1,
        defaultValue: 0,
        min: 1,
        max: 3
    })

    const increment = getIncrementButtonProps()
    const decrement = getDecrementButtonProps()
   
    
    return (
        <Stack direction="row">
            <Flex flexDir="column" justify="center" align="center">
                <IconButton w="40px" aria-label="Search database" icon={<SearchIcon />} />
                <Text fontSize="xs">Account</Text>
            </Flex> 

            <Progress w="250px" value={0} size="xs" colorScheme="pink" />

            <Flex flexDir="column" justify="center" align="center">
                <IconButton w="40px" aria-label="Search database" icon={<SearchIcon />} />
                <Text fontSize="xs">Plans</Text>
            </Flex> 

            <Progress w="250px" value={0} size="xs" colorScheme="pink" />

            <Flex flexDir="column" justify="center" align="center">
                <IconButton w="40px" aria-label="Search database" icon={<SearchIcon />} />
                <Text fontSize="xs">Resume</Text>
            </Flex> 
        </Stack>
    )

}