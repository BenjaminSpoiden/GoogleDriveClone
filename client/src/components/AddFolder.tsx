import { Button, Flex, IconButton, Input, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { MdCreateNewFolder } from "react-icons/md"
import { db } from "../firebase"
import { addNewFolder } from "../firebase/FolderFunctions"
import { useIsAuth } from "../hooks/useIsAuth"

interface AddFolderProps {
    currentFolder: any | null
}


export const AddFolder = ({ currentFolder }: AddFolderProps) => {
    
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [folderName, setFolderName] = useState("")
    const { user } = useIsAuth()

    console.log("currentFolder: ", currentFolder)

    const addFolder = async (name: string, uid: string) => {

        await addNewFolder({
            name,
            uid,
            path: null,
            parentId: currentFolder.id !== undefined ? currentFolder.id : null,
            createdAt: db.getCurentTimestamp 
        })
        
        onClose()
    }

    return (
        <>
            <IconButton
                aria-label="add-folder"
                children={<MdCreateNewFolder />}
                fontSize="20px"
                colorScheme="whatsapp"
                onClick={onOpen}
            />

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <Flex m='auto' w="100%" p={8} flexDir="column" >
                        <Input onChange={(e) => setFolderName(e.target.value)} placeholder="Enter your folder name."/>
                        <Flex mt={8} mx="auto" justify="space-between" w="100%" >
                            <Button w="100%" m="auto" colorScheme="whatsapp" onClick={async() => await addFolder(folderName, user!.uid)}>Add Folder</Button>
                            <Button w="100%" m="auto" colorScheme="gray" ml={16} onClick={onClose}>Close</Button>
                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    )
}