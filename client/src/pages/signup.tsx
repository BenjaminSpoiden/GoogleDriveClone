import { Flex, Heading, Text, useToast, SimpleGrid, Button } from "@chakra-ui/react"
import React, { useState } from "react"
import { Container } from "../components/Container"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import NextLink from "next/link"
import { onSignUp } from "../firebase/AuthFunctions"
import { SignupValidationSchema } from "../utils/SchemaValidator"
import { useRouter } from "next/dist/client/router"
import { FaBuffer, FaIdCard, FaMoneyCheck, FaTrash, FaUser, FaUserPlus } from "react-icons/fa"
import { FormikStep, FormikStepper } from "../components/FormikStepper"
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { FieldArray, FormikProps } from "formik"
import { DropdownMenu } from "../components/DropdownMenu"

interface Card {
    cardNumber: string,
    cardHolder: string,
    cardMonth: string,
    cardYear: string,
    cardCVV: string
}

export interface UserDataProps {
    email: string,
    password: string,
    cards: Card[]
}

const Signup = () => {

    const {push} = useRouter()
    const toast = useToast()

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(!show)

  
    return (
        <Container minH="100vh">
            <DarkModeSwitch />
            <Wrapper variant="regular" >
                <Flex p={4} flexDir="column" m="auto" w="100%" >
                    <Heading size="lg" colorScheme="gray" textTransform="uppercase" >Signup</Heading>
                    <FormikStepper

                        initialValues={{
                            email: "", 
                            password: "", 
                            confirmPassword: "",
                            cards: [{
                                cardNumber: "",
                                cardHolder: "",
                                cardYear: "",
                                cardMonth: "",
                                cardCVV: ""
                            }]    
                        }}
                        onSubmit={async (values) => {
                            // const { email, password } = values
                            // await onSignUp(email, password)
                            // push("/dashboard")
                            // toast({
                            //     title: "Signed up",
                            //     description: "Thank you for registering, your are now redirected to the dashboard",
                            //     variant: "flushed",
                            //     duration: 2000,
                            //     isClosable: true,
                            //     position: "top"
                            // })
                            console.log(values)
                        }}
                    >
                        <FormikStep validationSchema={SignupValidationSchema} label="Create an account" icon={<FaUserPlus />} >
                            <SimpleGrid columns={2} gap={4} >
                                <InputField 
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    label="First Name"
                                    variant="flushed"
                                    icon={<FaUser />}
                                />
                                <InputField
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    label="Last Name"
                                    variant="flushed"
                                    icon={<FaUser />}
                                />
                            </SimpleGrid>

                            <InputField
                                name="email"
                                placeholder="Enter your email"
                                label="Email"
                                variant="flushed"
                                icon={<AtSignIcon />}
                            />

                            <InputField
                                name="password"
                                placeholder="Enter your password"
                                label="Password"
                                variant="flushed"
                                type={show ? "text" : "password"}
                                icon={<LockIcon />}
                                righIcon={show ? <ViewOffIcon /> : <ViewIcon />}
                                onShow={() => handleShow()}
                            />

                            <InputField
                                name="confirmPassword"
                                placeholder="Please confirm your password"
                                label="Confirm Password"
                                variant="flushed"
                                type={show ? "text" : "password"}
                                icon={<LockIcon />}
                                righIcon={show ? <ViewOffIcon /> : <ViewIcon />}
                                onShow={() => handleShow()}
                            />
                        </FormikStep>

                        <FormikStep label="Choose plan" icon={<FaBuffer />} >
                            {/* *** Cards with different type of plan displayed here, there is 3. */}
                        </FormikStep>

                        <FormikStep label="Payment Info" icon={<FaMoneyCheck />} >
                            <FieldArray name="cards">
                                {({push, remove, form}) => (
                                    <>
                                        {(form as FormikProps<UserDataProps>).values.cards.map((card, index) => (
                                            <>
                                                <InputField 
                                                    name={`cards[${index}].cardNumber`}
                                                    placeholder="Enter your card number"
                                                    maxLength={19}
                                                    value={card.cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                                                    label="Card Number"
                                                    variant="flushed"
                                                    type="tel"
                                                    inputSize="sm"
                                                />
                                                <InputField 
                                                    name={`cards[${index}].cardHolder`}
                                                    placeholder="Enter the full name of the card Holder. (Ex: John Smith)"
                                                    label="Card Holder"
                                                    variant="flushed"
                                                    inputSize="sm"
                                                />
                                                <SimpleGrid columns={3} gap={4} >
                                                    <DropdownMenu 
                                                        name={`cards[${index}].cardMonth`}
                                                        label="Month"
                                                        placeholder="Month"
                                                        onChange={form.handleChange}
                                                        variant="flushed"
                                                        selectSize="sm"
                                                        dropdownItems={[
                                                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                                                        ]}
                                                    />
                                                    <DropdownMenu 
                                                        name={`cards[${index}].cardYear`}
                                                        label="Year"
                                                        variant="flushed"
                                                        selectSize="sm"
                                                        onChange={form.handleChange}
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
                                                        name={`cards[${index}].cardCVV`}
                                                        label="CVV"
                                                        inputSize="sm"
                                                        placeholder="CVV"
                                                        maxLength={3}
                                                        variant="flushed"
                                                    />
                                                </SimpleGrid>
                                                <Flex justify="space-between" mt={4}>
                                                        <Button 
                                                            rightIcon={<FaIdCard />} 
                                                            size="sm" 
                                                            colorScheme="whatsapp"
                                                            onClick={() => push({
                                                                    cardNumber: "",
                                                                    cardHolder: "",
                                                                    cardYear: "",
                                                                    cardMonth: "",
                                                                    cardCVV: ""
                                                                })}
                                                        >
                                                            Add Card
                                                        </Button>
                                                        <Button 
                                                            rightIcon={<FaTrash />} 
                                                            size="sm" 
                                                            colorScheme="red" 
                                                            onClick={() => remove(index)}>
                                                            Delete Card
                                                        </Button>
                                                </Flex>
                                            </>
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                        </FormikStep>
                    </FormikStepper>

                    <NextLink href="/login">
                        <Text fontStyle="italic" m="auto" mt={4} color="blue.300" cursor="pointer" _hover={{textDecoration: "underline"}} >
                            Already have an account ? Login now
                        </Text>   
                    </NextLink>     
                </Flex>
            </Wrapper>
        </Container>
    )
}

export default Signup