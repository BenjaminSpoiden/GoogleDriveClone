import React, { useRef, useState } from "react"
import { Flex, Portal, Progress } from "@chakra-ui/react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { db, storage } from "../firebase"
import { FolderData, ROOT_FOLDER } from "../utils/types"
import { useIsAuth } from "../hooks/useIsAuth"
import { addNewFile } from "../firebase/FolderFunctions"
import { v4 } from "uuid"

interface UploadProps {
    currentFolder: FolderData | null;
    onClose: () => void
}

type UploadFile = {
    id: string,
    name: string,
    progress: number,
    error: boolean
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
    const [uploadFilesData, setUploadFilesData] = useState<UploadFile[]>([])
    
    const onDrop = useCallback((acceptedFiles) => {
        if(user === null || currentFolder === null) return
        const file = acceptedFiles[0]
        const id = v4()
        
        setUploadFilesData(value => [
            ...value,
            {id, name: file.name, progress: 0, error: false}
        ])
        

        const filePath = currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

        const upload = storage
            .ref(`files/${user?.uid}/${filePath}`)
            .put(file)

        upload.on("state_changed", 
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setUploadFilesData(value => {
                    return value.map(uploadFile => {
                        return {...uploadFile, progress}
                    })
                   
                })
                
            }, 
            (error) => {
                setUploadFilesData(value => {
                    return value.map(uploadFile => {
                        if(uploadFile.id === id) {
                            return {...uploadFile, error: true}
                        }
                        return uploadFile
                    })
                })
                console.log(error)
            },
            () => {
                setUploadFilesData(value => {
                    return value.filter(uploadedFile => {
                        return uploadedFile.id !== id
                    })
                })
                console.log("finished")
                onClose()
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

    console.log(uploadFilesData)

    return (
        <>
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
            {uploadFilesData.length > 0 && (
                <Portal >
                    {uploadFilesData.map(uploadFile => (
                        <Progress 
                            size="md"
                            value={uploadFile.progress}
                            colorScheme={uploadFile.error ? "red" : "teal"}
                            pos="absolute"
                            w="100%"
                            bottom="0"
                        />
                    ))}
                </Portal>
            )}
        </>
    )
}