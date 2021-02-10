import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Avatar, Text, Flex, DrawerHeader, CloseButton } from "@chakra-ui/react"
import React, { MutableRefObject } from "react"
import { onSignOut } from "../firebase/AuthFunctions"
import { DarkModeSwitch } from "./DarkModeSwitch"


type DrawerFunctions = {
    isOpen: boolean
    onClose: () => void
    btnRef: MutableRefObject<null>
}


export const NavBarDrawer: React.FC<DrawerFunctions> = ({isOpen, onClose, btnRef}) => {
    
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="right"
            finalFocusRef={btnRef}
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerHeader>
                        <Flex align="center" m="auto" justify="space-between" p={4} >
                            <DarkModeSwitch aria-label="switch-button" />
                            <CloseButton onClick={onClose} />
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                        <Flex flexDir="column" p={4}>
                            <Flex flexDir="row" align="center" justify="center" >
                                <Text fontSize="sm" fontWeight="bold" >Welcome, John Johnson</Text>
                                <Button colorScheme="whatsapp" ml={4} size="sm" onClick={async() => await onSignOut()} >Sign out</Button> 
                            </Flex>
                            <Flex mt={4} justify="center" >
                                <Avatar src="" size="md" ml={4} name="John Johnson" />
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}