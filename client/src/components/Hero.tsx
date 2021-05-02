import { Box, Button, Flex, Heading, Stack, Text, Image, SimpleGrid, transition } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link"


const HeroData = {
    title: "Your Storage Space",
    subtitle: "Store and share your files & folders in our safe cloud storage space",
    image: "https://images.unsplash.com/photo-1580106815433-a5b1d1d53d85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ctaText: "Register now",
    ctaLink: "/signup"
}

export const Hero = ({id = ""}) => {

    
    return (
        <Flex
            id={id}
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="wrap"
            minH="100vh"
            px={2}
            mb={16}
            
        >
            <Stack
                spacing={4}
                w={{base: "80%", md: "40%"}}
                align={["center", "center", "flex-start", "flext-start"]}
            >
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="teal.600"
                    textAlign={["center", "center", "left", "left"]}
                >
                    {HeroData.title}
                </Heading>
             
                <Heading
                    as="h2"
                    size="md"
                    color="gray.400"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                    >
                    {HeroData.subtitle}
                </Heading>

                <SimpleGrid columns={[1, 2]} gap={4}>
                    <NextLink href={HeroData.ctaLink} >
                        <Button
                            lineHeight="1"
                            fontSize="md"
                            fontWeight="600"
                            bgColor="whitesmoke"
                            color="teal.600"
                            _hover={{ bgColor:"teal.600", color:"whitesmoke", transition:"ease all 0.3s" }}
                        >
                            {HeroData.ctaText}
                        </Button>
                    </NextLink>
                    <NextLink href="/dashboard" >
                        <Button
                            lineHeight="1"
                            fontSize="md"
                            fontWeight="600"
                            bgColor="whatsapp.600"
                            color="white"
                            _hover={{ bgColor:"teal.600", color:"whitesmoke", transition:"ease all 0.3s" }}
                        >
                            Access the storage space
                        </Button>
                    </NextLink>
                </SimpleGrid>
                <Text
                    fontSize="xs"
                    mt={2}
                    textAlign="center"
                    color="gray.600"
                >
                    No credit card required.
                </Text>
            </Stack>
            <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                <Image src={HeroData.image} size="100%" rounded="1rem" shadow="2xl" />
            </Box>
        </Flex>
    )
}