import { Flex, Heading, Button, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { Container } from "../components/Container"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import { onResetPassword } from "../firebase/AuthFunctions"
import { ChangePasswordValidationSchema } from "../utils/SchemaValidator"

const ResetPassword = () => {

    const router = useRouter()
    const toast = useToast()

    return (
        <Container minH="100vh">
            <Wrapper>
                <Flex p={4} flexDir="column" m="auto" w="100%" >
                    <Heading size="lg" colorScheme="gray" textTransform="uppercase">Change your password</Heading>
                    <Formik 
                        initialValues={{password: "", confirmPassword: ""}}
                        validationSchema={ChangePasswordValidationSchema}
                        onSubmit={async (values, { setErrors }) => {
                            const { password } = values
                            try {
                                await onResetPassword(router.query.oobCode as string, password)
                                router.push("/login")
                                toast({
                                    status: "success",
                                    title: "Password reset",
                                    description: "Your password has been succesfully reset, you now be redirected to the dashboard.",
                                    variant: "flushed",
                                    isClosable: true,
                                    duration: 2000,
                                    position: "top"
                                })
                            }
                            catch(e) {
                                if(e.code === "auth/invalid-action-code") {
                                    setErrors({
                                        password: e.message
                                    })
                                }
                            }
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <InputField
                                    name="password"
                                    placeholder="Enter your new Password"
                                    label="New Password"
                                    variant="flushed"
                                    type="password"
                                />
                                <InputField
                                    name="confirmPassword"
                                    placeholder="Confirm your new password"
                                    label="Confirm New Password"
                                    variant="flushed"
                                    type="password"
                                />

                                <Button w="100%" type="submit" isLoading={isSubmitting} mt={8} colorScheme="whatsapp" >
                                    Change your password
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </Wrapper>
        </Container>
    )
}

export default ResetPassword