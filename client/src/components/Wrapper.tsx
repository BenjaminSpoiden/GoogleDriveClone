import React from "react"
import { Box, Flex, FlexProps } from "@chakra-ui/react";

type WrapperVariant = "small" | "regular"

interface WrapperProps {
    variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps & FlexProps> = ({children, variant = "small", ...props}) => {

    return(
        <Box 
            mx={4} 
            m="auto"
            w="100%" 
            maxW={variant === "regular" ? "800px" : "400px"} 
            shadow="lg" 
            borderColor="blue.500" borderWidth="1px" borderStyle="solid" borderRadius="md" 
        >
            <Flex
                 
                m="auto"
                w="100%" 
                maxW={variant === "regular" ? "800px" : "400px"} 
                shadow="lg" 
                {...props}
            >
                {children}
            </Flex>
        </Box>
    )
}