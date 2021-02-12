import React, { useState } from "react"
import { Button, Portal, Progress } from "@chakra-ui/react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { db, storage } from "../firebase"
import { FolderData, ROOT_FOLDER } from "../utils/types"
import { useIsAuth } from "../hooks/useIsAuth"
import { addNewFile } from "../firebase/FolderFunctions"
import { v4 } from "uuid"
import { MdFileUpload } from "react-icons/md"


interface UploadProps {
    currentFolder: FolderData | null
}

type UploadFile = {
    id: string,
    name: string,
    progress: number,
    error: boolean,
    type: string,
    size: number
}

export const Upload = ({ currentFolder }: UploadProps) => {

    const {user} = useIsAuth()
    const [uploadFilesData, setUploadFilesData] = useState<UploadFile[]>([])

    const onDrop = (acceptedFiles: any) => {
        if(user === null || currentFolder === null) return
        const file = acceptedFiles[0]
        const id = v4()
        
        console.log("file: ", file)

        setUploadFilesData(value => [
            ...value,
            {id, name: file.name, progress: 0, error: false, type: file.type, size: file.size}
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
                    return value.filter((uploadedFile) => {
                        return uploadedFile.id !== id
                    })
                })

                upload
                .snapshot
                .ref
                .getDownloadURL()
                .then(url => {
                    db.files
                        .where("uid", "==", user.uid)
                        //@ts-ignore
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
                                    type: file.type,
                                    name: file.name,
                                    uid: user.uid,
                                    size: file.size,
                                    //@ts-ignore
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
    }

    const {getRootProps, getInputProps} = useDropzone({ onDrop })

    return (
        <>
            <div {...getRootProps()} >  
                <input {...getInputProps()} />
                <Button 
                    aria-label="add-file"
                    leftIcon={<MdFileUpload />}
                    colorScheme="whatsapp"
                    ml={2}
                >
                    Upload new File
                </Button>
            </div>
            {uploadFilesData.length > 0 && (
                <Portal>
                        {uploadFilesData.map(uploadFile => {
                            return (
                                <>
                                    <Progress 
                                        size="md"
                                        value={uploadFile.progress}
                                        colorScheme={uploadFile.error ? "red" : "teal"}
                                        pos="absolute"
                                        w="100%"
                                        bottom="0"
                                    />
                                </>
                            )
                        })}
                </Portal>
            )}
        </>
    )
}