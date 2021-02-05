import React from "react"
import { Flex, FlexProps } from "@chakra-ui/react";

type WrapperVariant = "small" | "regular"

interface WrapperProps {
    variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps & FlexProps> = ({children, variant, ...props}) => {

    return(
        <Flex 
            m="auto"
            w="100%" 
            maxW={variant === "regular" ? "800px" : "400px"} 
            shadow="lg" 
            {...props}
        >
            {children}
        </Flex>
    )
}