import { Button, Flex, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { MdNoteAdd } from "react-icons/md"
import { FolderData } from "../utils/types"
import { Upload } from "./Upload"

interface AddFileProps {
    currentFolder: FolderData | null
}

export const AddFile  = ({currentFolder}: AddFileProps) => {

    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Button 
                aria-label="add-file"
                leftIcon={<MdNoteAdd />}
                colorScheme="whatsapp"
                ml={2}
                onClick={onOpen}
            >
                Add new File
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <Flex m='auto' w="100%" p={8} flexDir="column" >
                        <Upload currentFolder={currentFolder} onClose={onClose} />
                        <Flex mt={8} mx="auto" w="100%" >
                            <Button w="100%" m="auto" colorScheme="gray" onClick={onClose}>Close</Button>
                        </Flex>
                    </Flex>
                </ModalContent> 
            </Modal>
        </>
    )
}