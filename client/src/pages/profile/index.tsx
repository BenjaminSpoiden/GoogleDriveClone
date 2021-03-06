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
import validator from "validator"
import Head from "next/head";

interface CreditCardProps {
    cardNumber: string,
    cardHolder: string,
    cardYear: string,
    cardMonth: string,
    cardCVV: string
}


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
        <>
        <Head>
            <title>Profile</title>
        </Head>
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
                            await user?.updateProfile({
                                displayName: `${values.firstName} ${values.lastName}`
                            })
                            
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
                    <Center>
                        <Divider m={4} borderWidth="2px" maxW="250px"/>
                    </Center>
                    <Heading as="h5" size="sm" textTransform="uppercase">
                        Billing informations
                    </Heading>
                    <Formik<CreditCardProps>
                        onSubmit={(values, {setErrors}) => {
                            if(!validator.isCreditCard(values.cardNumber)) {
                                setErrors({
                                    cardNumber: "Invalid Credit Card Number"
                                })
                            }
                            console.log(values)
                            
                        }}
                        initialValues={{
                            cardNumber: "",
                            cardHolder: "",
                            cardMonth: "",
                            cardYear: "",
                            cardCVV: ""
                        }}
                    >
                        {({values, isSubmitting, handleChange}) => (
                            <Form>
                                <InputField 
                                    name="cardNumber"
                                    label="Credit Card Number"
                                    placeholder="Enter your credit card number"
                                    type="tel"
                                    value={values.cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                                    onChange={handleChange}
                                    maxLength={19}
                                    variant="flushed"
                                />
                              
                                <InputField 
                                    name="cardHolder"
                                    label="Card Holder Name"
                                    placeholder="Enter the name of the credit card owner"
                                    type="text"
                                    variant="flushed"
                                />
                                <SimpleGrid columns={3} gap={4} >
                                    <DropdownMenu 
                                        id="cardMonth"
                                        name="Month"
                                        placeholder="Month"
                                        onChange={handleChange}
                                        variant="flushed"
                                        dropdownItems={[
                                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                                        ]}
                                    />
                                    <DropdownMenu 
                                        id="cardYear"
                                        name="Year"
                                        variant="flushed"
                                        onChange={handleChange}
                                        placeholder="Year"
                                        dropdownItems={[
                                            2020,
                                            2021,
                                            2023,
                                            2024,
                                            2025,
                                            2026,
                                            2027,
                                            2028,
                                            2029,
                                            2030,
                                            2031,
                                            2032
                                        ]}
                                    />
                                    <InputField 
                                        name="cardCVV"
                                        label="CVV"
                                        placeholder="CVV"
                                        maxLength={3}
                                        variant="flushed"
                                    />
                                </SimpleGrid>
                                <Flex justify="flex-end" p={4} >
                                    <Button type="submit" isLoading={isSubmitting} colorScheme="whatsapp" leftIcon={<FaUserCheck />}>Change billing info</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </Wrapper>
        </Container>
        </>
    )
}

export default ProfileIndex