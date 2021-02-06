import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { Container } from "../components/Container"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import NextLink from "next/link"
import { LoginValidationSchema } from "../utils/SchemaValidator"
import { onSignIn } from "../firebase/AuthFunctions"

const Login = () => {


    return (
        <Container minH="100vh">
            <DarkModeSwitch />
            <Wrapper borderColor="blue.500" borderWidth="1px" borderStyle="solid" borderRadius="md"  >
                <Flex p={4} flexDir="column" m="auto" w="100%" >
                    <Heading size="lg" colorScheme="gray" textTransform="uppercase">Login</Heading>
                    <Formik 
                        initialValues={{email: "", password: ""}}
                        validationSchema={LoginValidationSchema}
                        onSubmit={async (values, { setErrors }) => {
                            const { email, password } = values
                            try {
                                await onSignIn(email, password)
                            }catch(e) {
                                if(e.code === "auth/user-not-found") {
                                    setErrors({
                                        email: e.message
                                    })
                                }
                                if(e.code === "auth/wrong-password") {
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

                                <Button w="100%" type="submit" isLoading={isSubmitting} mt={8} colorScheme="whatsapp" >
                                    Login
                                </Button>
                            </Form>
                        )}

                    </Formik>
                    <NextLink href="/signup">
                        <Text fontStyle="italic" m="auto" mt={4} color="blue.300" cursor="pointer" _hover={{textDecoration: "underline"}} >
                            Doesn't have an account yet ? Sign up
                        </Text>   
                    </NextLink>   
                </Flex>
            </Wrapper>
        </Container>
    )
}


export default Login