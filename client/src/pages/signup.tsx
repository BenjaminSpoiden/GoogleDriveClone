import { Flex, Heading, Button, Text, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import React from "react"
import { Container } from "../components/Container"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import NextLink from "next/link"
import { onSignUp } from "../firebase/AuthFunctions"
import { SignupValidationSchema } from "../utils/SchemaValidator"
import { useRouter } from "next/dist/client/router"


const Signup = () => {

    const {push} = useRouter()
    const toast = useToast()
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
                            push("/dashboard")
                            toast({
                                title: "Signed up",
                                description: "Thank you for registering, your are now redirected to the dashboard",
                                variant: "flushed",
                                duration: 2000,
                                isClosable: true,
                                position: "top"
                            })
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
                                    type="password"
                                />

                                <InputField
                                    name="confirmPassword"
                                    placeholder="Please confirm your password"
                                    label="Confirm Password"
                                    variant="flushed"
                                    type="password"
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