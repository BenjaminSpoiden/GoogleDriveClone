import { Box, Center, Flex, Icon, Image, Link, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { MdAudiotrack, MdFileDownload, MdPhoto, MdPictureAsPdf, MdVideoLibrary } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai"
import { HiChevronDoubleDown } from "react-icons/hi"
import { FaFileWord } from "react-icons/fa"
import PDFViewer from "pdf-viewer-reactjs"
import dayjs from "dayjs";
import { IconType } from "react-icons";
import { FileData } from "../model/FileData";


interface FileProps {
    item: FileData
} 

interface IconTypeProps {
    iconType: IconType
}

const Placeholder = () => (
    <Center>
        <Icon w={100} h={100} as={HiChevronDoubleDown} />
    </Center>
)

const FileDisplayOverlay: React.FC<FileProps & IconTypeProps > = ({children, item, iconType}) => {

    const {colorMode} = useColorMode()
    // storage.ref(`files/${user?.uid}`).listAll().then(list => list.items.forEach(item => item.getMetadata().then(data => console.log(data))))

    //@ts-ignore
    const formattedDate = dayjs(item?.createdAt?.toDate()).format('MMMM D, YYYY h:mm A')
    return (
        <Box justifySelf="center" h="310px" maxW="250px" w="100%" bgColor={colorMode === "light" ? "gray.200" : "gray.800"} borderColor="blue.400" overflow="hidden" borderRadius="md" borderWidth="1px" borderStyle="solid" >
            <Box mx='auto' h="250px" overflow="hidden" >
                <Flex h="250px" justify="center" m="auto" overflow="hidden">
                    {children}
                </Flex>
            </Box>
            <Flex flexDir="column" w="100%" h="60px" bgColor={colorMode === "light" ? "blue.200" : "blue.400"} overflow="hidden">
                <Flex mx="auto" mt={2} align="center" >
                    <Flex mr={2}> 
                        <Icon as={iconType} fontSize="20px"/>
                    </Flex>
                    <Link href={item?.url ? item.url : ""} isExternal>
                        <Text maxW="220px" isTruncated fontSize="sm" fontWeight="bold" textColor={colorMode === "light" ? "black" : "white"}>
                            {`${item?.name}`}
                        </Text>
                    </Link>
                </Flex>
                <Flex mx="auto" p={2} align="flex-end" h="100%" >
                    <Text fontSize="x-small" fontWeight="bold" textColor={colorMode === "light" ? "black" : "white"}>
                        {`Last modified: ${formattedDate}`}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export const FileDisplay = ({item}: FileProps) => {

    switch(item.type) {
        case "application/pdf": {
            return (
                <FileDisplayOverlay item={item} iconType={MdPictureAsPdf}>
                    <PDFViewer 
                        externalInput
                        document={{
                            url: `${item.url}`
                        }}
                        scale={0.5}
                    />
                    
                </FileDisplayOverlay>
            )
        }
        case "video/mp4": {
            return (
                <FileDisplayOverlay item={item} iconType={MdVideoLibrary} >
                    Video displayed here
                </FileDisplayOverlay>
            )
        }
        case "text/pain": {
            return (
                <FileDisplayOverlay item={item} iconType={AiFillFileText} >
                    <Placeholder />
                </FileDisplayOverlay>
            )
        }
        case "audio/mpeg": {
            return (
                <FileDisplayOverlay item={item} iconType={MdAudiotrack} >
                    <Placeholder />
                </FileDisplayOverlay>
            )
        }
        case "application/msword": {
            return (
                <FileDisplayOverlay item={item} iconType={FaFileWord} >
                    <Placeholder />
                </FileDisplayOverlay>
            )
        }
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
            return (
                <FileDisplayOverlay item={item} iconType={FaFileWord} >
                    <Placeholder />
                </FileDisplayOverlay>
            )
        }
        default: {
            if(item.type?.includes("image/")) {
                return (
                    <FileDisplayOverlay item={item} iconType={MdPhoto} >
                        <Image src={`${item.url}`} w="150px" objectFit="contain" />
                    </FileDisplayOverlay>
                )
            }
            return (
                <FileDisplayOverlay item={item} iconType={MdFileDownload} >
                    <Placeholder />
                </FileDisplayOverlay>
            )
        }
    }
}