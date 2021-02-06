import { Button, Flex, Heading } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import React from "react"
import { Container } from "../components/Container"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import { onResetPassword } from "../firebase/AuthFunctions"
import { ResetPasswordValidationSchema } from "../utils/SchemaValidator"

const ForgotPassword = () => {
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
                                await onResetPassword(email)
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