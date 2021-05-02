import { Button, Flex, Input, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { MdCreateNewFolder } from "react-icons/md"
import { db } from "../firebase"
import { addNewFolder } from "../firebase/FolderFunctions"
import { useIsAuth } from "../hooks/useIsAuth"
import { FolderData } from "../model/FolderData"
import { Path } from "../model/Path"
import { ROOT_FOLDER } from "../redux/utils"

interface AddFolderProps {
    currentFolder: FolderData | null
}


export const AddFolder = ({ currentFolder }: AddFolderProps) => {
    
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [folderName, setFolderName] = useState("")
    const { user } = useIsAuth()

    let path: Path[] = currentFolder?.path ? [...currentFolder.path] : []

    if(currentFolder !== ROOT_FOLDER) {
        //@ts-ignore
        path.push({ name: currentFolder?.name, id: currentFolder?.id})
    }
    const addFolder = async (name: string, uid: string) => {

        await addNewFolder({
            name,
            uid,
            path,
            //@ts-ignore
            parentId: currentFolder.id !== undefined ? currentFolder.id : null,
            createdAt: db.getCurentTimestamp 
        })
        
        onClose()
    }

    return (
        <>
            <Button
                aria-label="add-folder"
                leftIcon={<MdCreateNewFolder />}
                colorScheme="whatsapp"
                onClick={onOpen}
            >
                Add new folder
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent mx={4} >
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