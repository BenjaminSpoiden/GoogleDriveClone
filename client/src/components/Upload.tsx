import React from "react"
import { Flex } from "@chakra-ui/react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { db, storage } from "../firebase"
import { FolderData, ROOT_FOLDER } from "../utils/types"
import { useIsAuth } from "../hooks/useIsAuth"
import { addNewFile } from "../firebase/FolderFunctions"


interface UploadProps {
    currentFolder: FolderData | null;
    onClose: () => void
}


const UploadBox: React.FC = ({children}) => {
    return (
        <Flex p={4} borderRadius="md" borderStyle="dashed" borderColor="black" borderWidth="1px" justify="center" align="center">
            {children}
        </Flex>
    )
}

export const Upload = ({ currentFolder, onClose }: UploadProps) => {

   const {user} = useIsAuth()

    const onDrop = useCallback((acceptedFiles) => {
        if(user === null || currentFolder === null) return
        const file = acceptedFiles[0]

        if(file) onClose()

        const filePath = currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

        const upload = storage
            .ref(`files/${user?.uid}/${filePath}`)
            .put(file)

        upload.on("state-changed", 
            snapshot => {

            }, 
            (error) => {
                console.log("upload error: ", error)
            },
            () => {
                upload
                .snapshot
                .ref
                .getDownloadURL()
                .then(url => {
                    db.files
                        .where("uid", "==", user.uid)
                        .where("folderId", "==", currentFolder === ROOT_FOLDER ? null : currentFolder.id)
                        .where("name", "==", file.name)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0]
                            if(existingFile) {
                                existingFile.ref.update({url})
                            } else {
                                addNewFile({
                                    url, 
                                    name: file.name,
                                    uid: user.uid,
                                    folderId: currentFolder === ROOT_FOLDER ? null : currentFolder.id,
                                    createdAt: db.getCurentTimestamp
                                })  
                            }
                        })
                })
                .catch(e => {
                    console.log("getUrlError: ", e.message)
                })
            }
        )
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} >  
            <input {...getInputProps()} /> 
            { isDragActive 
                ?   <UploadBox>
                        Drop them here
                    </UploadBox>
                :   <UploadBox>
                        Click or Drag your files here
                    </UploadBox>
            }
        </div>
    )
}