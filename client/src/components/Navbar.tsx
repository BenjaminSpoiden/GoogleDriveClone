import { HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Button, Flex, IconButton, Link, Text, useDisclosure } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRef } from "react"
import { onSignOut } from "../firebase/AuthFunctions"
import { useIsAuth } from "../hooks/useIsAuth"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { NavBarDrawer } from "./NavBarDrawer"

export const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)
    const {user} = useIsAuth()
    return (
        <Flex h="80px" w="100%" mx="auto">
            <Flex w="100%" p={4} justify="space-between" m="auto" align="center">
                <NextLink href="/dashboard"><Text cursor="pointer">GD Clone</Text></NextLink>
                <Flex d={["none", "none", "flex"]} align="center" justify="space-between">
                    <Text fontSize="sm" fontWeight="bold" >Welcome, {`${user?.displayName}`}</Text>

                    <NextLink href="/profile" passHref >
                        <Link>
                            <Avatar src="" size="sm" ml={4} name={`${user?.displayName}`} 
                            //@ts-ignore
                            src={`${user?.photoURL}`} />
                        </Link>
                    </NextLink>

                    <Button colorScheme="whatsapp" ml={4} size="sm" onClick={async() => await onSignOut()} >Sign out</Button> 
                    <DarkModeSwitch
                        aria-label="switch-button"
                        ml={8}
                    />
                </Flex>
                <Flex d={["flex", "flex", "none"]}>
                    <IconButton
                        aria-label="sidemenu"
                        children={<HamburgerIcon />}
                        variant="ghost"
                        onClick={onOpen}
                        ref={btnRef}
                    /> 
                    <NavBarDrawer
                        btnRef={btnRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}