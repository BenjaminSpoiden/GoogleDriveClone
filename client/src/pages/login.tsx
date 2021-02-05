import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { Container } from "../components/Container"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import { sleep } from "../utils/sleep"
import NextLink from "next/link"

const Login = () => {
    return (
        <Container minH="100vh">
            <DarkModeSwitch />
            <Wrapper borderColor="blue.500" borderWidth="1px" borderStyle="solid" borderRadius="md"  >
                <Flex p={4} flexDir="column" m="auto" w="100%" >
                    <Heading size="lg" colorScheme="gray" textTransform="uppercase" >Login</Heading>
                    <Formik 
                        initialValues={{username: "", email: "", password: ""}}
                        onSubmit={async (values) => {
                            await sleep(2000)
                            console.log(values)
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <InputField
                                    name="username"
                                    placeholder="Enter your username"
                                    label="Username"
                                    variant="flushed"
                                    m="auto"
                                />

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

                                <Button w="100%" type="submit" isLoading={isSubmitting} mt={8} colorScheme="whatsapp" >
                                    Login
                                </Button>
                            </Form>
                        )}

                    </Formik>
                    <NextLink href="/login">
                        <Text fontStyle="italic" m="auto" mt={4} color="blue.300" cursor="pointer" _hover={{textDecoration: "underline"}} >
                            
                        </Text>   
                    </NextLink>   
                </Flex>
            </Wrapper>
        </Container>
    )
}


export default Login