import { IconButton } from "@chakra-ui/react"
import { MdNoteAdd } from "react-icons/md"

export const AddFile  = () => {
    return (
        <IconButton 
            aria-label="add-file"
            children={<MdNoteAdd />}
            fontSize="20px"
            colorScheme="whatsapp"
            ml={2}
        />
    )
}