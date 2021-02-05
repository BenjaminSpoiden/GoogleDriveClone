import { Flex, Heading, Button, Text } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import React from "react"
import { Container } from "../components/Container"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import NextLink from "next/link"
import { onSignOut, onSignUp } from "../firebase/AuthFunctions"
import * as yup from "yup"
import { useAuth } from "../hooks/useAuth"


const Signup = () => {

    const SignupValidationSchema = yup.object().shape({
        email: yup.string().email("Invalid email.").required("The email is required."),
        password: yup.string().min(8, "The password must be atleast 8 characters long.").required("The password is required."),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords did not match.")
    })

    
    return (
        <Container minH="100vh" >
            <DarkModeSwitch />
            <Wrapper borderColor="blue.500" borderWidth="1px" borderStyle="solid" borderRadius="md"  >
                <Flex p={4} flexDir="column" m="auto" w="100%" >
                    <Heading size="lg" colorScheme="gray" textTransform="uppercase" >Signup</Heading>
                    <Formik 
                        initialValues={{email: "", password: "", confirmPassword: ""}}
                        validationSchema={SignupValidationSchema}
                        onSubmit={async (values) => {
                            const { email, password } = values
                            await onSignUp(email, password)
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <InputField
                                    name="email"
                                    placeholder="Enter your email"
                                    label="Email"
                                    variant="flushed"
                                />

                                <InputField
                                    name="password"
                                    placeholder="Enter your password"
                                    label="Password"
                                    variant="flushed"
                                />

                                <InputField
                                    name="confirmPassword"
                                    placeholder="Please confirm your password"
                                    label="Confirm Password"
                                    variant="flushed"
                                />

                                <Button w="100%" type="submit" isLoading={isSubmitting} mt={8} colorScheme="whatsapp" >
                                    Signup
                                </Button>
                            </Form>
                        )}
                    </Formik>
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