import { FolderData } from "../utils/types"

interface FolderProps {
    folder: FolderData
}


export const Folder = ({folder}: FolderProps) => {

    
    return (
        <div>
            {folder.name}
        </div>
    )
}