import { Button, Flex, Heading, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import React from "react"
import { Container } from "../components/Container"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import { onSendResetPasswordEmail } from "../firebase/AuthFunctions"
import { ResetPasswordValidationSchema } from "../utils/SchemaValidator"

const ForgotPassword = () => {
    
    const toast = useToast()

    return (
        <Container minH="100vh">
            <DarkModeSwitch />
            <Wrapper borderColor="blue.500" borderWidth="1px" borderStyle="solid" borderRadius="md">
                <Flex p={4} flexDir="column" m="auto" w="100%" >
                    <Heading size="lg" colorScheme="gray" textTransform="uppercase">Reset your password</Heading>
                    <Formik 
                        initialValues={{email: ""}}
                        validationSchema={ResetPasswordValidationSchema}
                        onSubmit={async (values, { setErrors }) => {
                            const { email } = values
                            try {
                                await onSendResetPasswordEmail(email)
                                toast({
                                    status: "success",
                                    title: "Email sent",
                                    description: "Please check your inbox to access the link.",
                                    variant: "flushed",
                                    isClosable: true,
                                    duration: 2000,
                                    position: "top"
                                })
                            }catch(e) {
                                if(e.code === "auth/user-not-found") {
                                    setErrors({
                                        email: e.message
                                    })
                                }
                            }
                            
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

                                <Button w="100%" type="submit" isLoading={isSubmitting} mt={8} colorScheme="whatsapp" >
                                    Reset your password
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </Wrapper>
        </Container>
    )
}

export default ForgotPassword