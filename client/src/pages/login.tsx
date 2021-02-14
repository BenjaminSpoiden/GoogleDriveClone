import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { Container } from "../components/Container"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import NextLink from "next/link"
import { LoginValidationSchema } from "../utils/SchemaValidator"
import { onSignIn } from "../firebase/AuthFunctions"
import { useRouter } from "next/dist/client/router"

const Login = () => {

    const { push } = useRouter()
    const toast = useToast()
    return (
        <Container minH="100vh">
            <Wrapper>
                <Flex p={4} flexDir="column" m="auto" w="100%" >
                    <Heading size="lg" colorScheme="gray" textTransform="uppercase">Login</Heading>
                    <Formik 
                        initialValues={{email: "", password: ""}}
                        validationSchema={LoginValidationSchema}
                        onSubmit={async (values, { setErrors }) => {
                            const { email, password } = values
                            try {
                                await onSignIn(email, password)
                                push("/dashboard")
                                toast({
                                    status: "success",
                                    title: "Logged in",
                                    description: "You are successfully logged in.",
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
                    <NextLink href="/forgot-password"> 
                        <Text fontStyle="italic" m="auto" mt={4} color="blue.300" cursor="pointer" _hover={{textDecoration: "underline"}} >
                            Forgot your password ? Click here
                        </Text> 
                    </NextLink> 
                </Flex>
            </Wrapper>
        </Container>
    )
}


export default Login