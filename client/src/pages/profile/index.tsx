import { Avatar, Button, Center, Divider, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash, FaUserCheck } from "react-icons/fa";
import { Container } from "../../components/Container"
import { DropdownMenu } from "../../components/DropdownMenu";
import { InputField } from "../../components/InputField";
import { Navbar } from "../../components/Navbar";
import { Wrapper } from "../../components/Wrapper";
import { storage } from "../../firebase";
import { useIsAuth } from "../../hooks/useIsAuth";
import { Gender } from "../../model/Gender";


const ProfileIndex = () => {

    const { user } = useIsAuth()
    
    const onDrop = (files: any) => {
        if(user === null) return
        const file = files[0]
        console.log(file)

        const uploadTask = storage.ref(`avatar/${user.uid}`).put(file)

        uploadTask.on("state_changed", 
        (_) => {
            
        },
        (error) => {
            console.log(error)
        },
        () => {
            uploadTask  
                .snapshot
                .ref
                .getDownloadURL()
                .then(url => {
                    user.updateProfile({
                        photoURL: url
                    })
                    .then(value => console.log(value))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))   
        })

    }


    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <Container minH="100vh">
            <Navbar />
            <Wrapper variant="regular">
                <Flex p={4} w="100%" m="auto" flexDir="column" >
                    <Heading as="h5" size="sm" textTransform="uppercase">
                        Avatar
                    </Heading>
                    <Flex p={4} w="100%" justify="center">
                        <div {...getRootProps()} >
                            <input {...getInputProps()} accept="image/*" />
                            <Avatar name={`${user?.displayName}`} src={`${user?.photoURL}`} size="2xl"/>
                        </div>
                    </Flex>
                    <Flex p={4} w="100%" justify="flex-end" align="center"> 
                        <Button colorScheme="red" leftIcon={<FaTrash />} onClick={async () => {
                            await storage
                            .ref()
                            .child(`avatar/${user?.uid}`)
                            .delete()

                            await user?.updateProfile({
                                photoURL: null
                            })
                            
                        }} >Delete Avatar</Button>
                    </Flex>
                    <Center>
                        <Divider m={4} borderWidth="2px" maxW="250px"/>
                    </Center>
                    <Heading as="h5" size="sm" textTransform="uppercase">
                        Personal information
                    </Heading>
                    <Formik
                        initialValues={{
                            firstName: "", 
                            lastName: "",
                            birthday: "",
                            gender: "",
                            couille: ""
                        }}
                        onSubmit={async(values) => {
                            // await user?.updateProfile({
                            //     displayName: `${values.firstName} ${values.lastName}`
                            // })
                            console.log(values)
                        }}
                    >
                        {({isSubmitting, handleChange}) => (
                            <Form>
                                <SimpleGrid columns={2} gap={4} >
                                    <InputField
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        label="First Name"
                                        variant="flushed"
                                        
                                    />
                                    <InputField
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        label="Last Name"
                                        variant="flushed"
                                        
                                    />
                                </SimpleGrid>
                                <InputField
                                    name="birthday"
                                    placeholder="Enter your date of birth"
                                    label="Birthday"
                                    variant="flushed"
                                    type="date"
                                />
                                <DropdownMenu 
                                    id="gender"
                                    name="Gender"
                                    placeholder="Select your gender"
                                    dropdownItems={[
                                        Gender.MALE,
                                        Gender.FEMALE,
                                        Gender.UNKNOWN
                                    ]}
                                    variant="flushed"
                                    onChange={handleChange}
                                />
                                <Flex justify="flex-end" p={4} >
                                    <Button type="submit" isLoading={isSubmitting} colorScheme="whatsapp" leftIcon={<FaUserCheck />} >Change info</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </Wrapper>
        </Container>
    )
}

export default ProfileIndex