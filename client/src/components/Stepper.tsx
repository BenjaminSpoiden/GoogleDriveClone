import { CheckIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Text, Stack, Divider } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

interface StepperProps {
    steps: string[],
    currentStep: number;
    icons: JSX.Element[]
}

interface StepState {
    desc: string,
    completed: boolean,
    selected: boolean,
    icon: JSX.Element
}

export const Stepper: React.FC<StepperProps> = ({steps, currentStep, icons}) => {

    const [stepObject, setStepObject] = useState<StepState[]>([])

    useEffect(() => {
        setStepObject(steps.map((step, index) => {
            return {
                desc: step,
                completed: index < currentStep ? true : false,
                selected: index === currentStep ? true : false,
                icon: icons[index]
            }
        }))
    }, [currentStep])

    return (
        <>
            <Stack px={4} d="flex" maxW="768px" w="100%" justify="space-between" align="center" direction={["column", "column","row"]}>
                {
                    stepObject.map((stepElement, index) => (
                        <>
                            <Flex w="auto" flexDir="column" justify="center" align="center">
                                <IconButton 
                                    borderRadius="full" 
                                    mt={4} 
                                    w="40px" 
                                    aria-label="Search database" 
                                    icon={stepElement.completed ? <CheckIcon /> : stepElement.icon}
                                    colorScheme={stepElement.completed ? "whatsapp" : "gray" && stepElement.selected ? "whatsapp" : "gray"}
                                    />
                                <Text 
                                    fontWeight={stepElement.selected ? "bold" : "normal"} 
                                    textAlign="center" 
                                    w="120px"
                                    fontSize="xs">
                                        {stepElement.desc}
                                </Text>
                            </Flex> 

                            <Divider 
                                d={index === stepObject.length -1 ? "none" : "flex"} 
                                borderWidth="2px" 
                                // maxW="250px"
                                borderColor={stepElement.completed ? "whatsapp.500" : "gray.300"}
                                // w="100%"
                                borderStyle={stepElement.completed ? "solid" : "dashed"}
                            />
                        </>
                    ))
                }
            </Stack>
        </>
    )

}