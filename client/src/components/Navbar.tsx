import { Avatar, Button, Flex, Text } from "@chakra-ui/react"

export const Navbar = () => {

    return (
        <Flex h="80px" w="100%" mx="auto" boxShadow="md" >
            <Flex w="100%" p={4} justify="space-between" m="auto" align="center">
                Some App name
                <Flex spa align="center" justify="space-between">
                    <Text>Welcome, John Johnson</Text>
                    <Avatar src="" size="sm" ml={4} name="John Johnson" />
                    <Button colorScheme="whatsapp" ml={4} >Sign out</Button> 
                </Flex>
            </Flex>
        </Flex>
    )
}