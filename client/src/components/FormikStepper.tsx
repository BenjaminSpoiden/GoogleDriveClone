import { MdArrowBack, MdArrowForward, MdSend } from "react-icons/md"
import { Button,  Flex } from "@chakra-ui/react"
import { Form, Formik, FormikConfig } from "formik"
import React, { useState } from "react"
import { Stepper } from "./Stepper"
import { UserDataProps } from "../pages/signup"

interface FormikStepperProps<T> extends Pick<FormikConfig<T>, 'children' | 'validationSchema'> {
    label: string,
    icon: JSX.Element
}

export const FormikStepper: React.FC<FormikConfig<UserDataProps>> = ({children, ...props}) => {

    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepperProps<UserDataProps>>[]
    const [step, setStep] = useState(0)
    const currentChildren = childrenArray[step]


    const isLastStep = () => {
        return step === childrenArray.length - 1
    }

    const labelArray = () => {
        let labels: string[]  = []
        childrenArray.map((child) => {
            labels.push(child.props.label)
        })
        return labels
    }

    const iconArray = () => {
        let icons: JSX.Element[] = []
        childrenArray.map(child => {
            icons.push(child.props.icon)
        })
        return icons
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChildren.props.validationSchema}
            onSubmit={async(values, helpers) => {
                if(isLastStep()) {
                    await props.onSubmit(values, helpers)
                }else {
                    setStep(c => c += 1)
                }
            }} 
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form>
                    <Stepper
                        steps={labelArray()}
                        icons={iconArray()}
                        currentStep={step}
                    />
                    
                    {currentChildren}

                    <Flex mt={4} justify="space-between" flexDir={ step > 0 ? "row" : "row-reverse"} >
                        {step > 0 
                            ? (
                                <Button
                                    disabled={isSubmitting}
                                    leftIcon={<MdArrowBack />}
                                    colorScheme="whatsapp"
                                    m="auto"
                                    onClick={() => setStep((s) => s - 1)}
                                >
                                    Back
                                </Button>
                            ) 
                            : null
                        }
                            <Button
                                isLoading={isSubmitting}
                                disabled={isSubmitting || !(isValid && dirty)}
                                rightIcon={isLastStep() ? <MdSend /> : <MdArrowForward />}
                                type="submit"
                                m="auto"
                                alignSelf="flex-end"
                                colorScheme="whatsapp"
                            >
                                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                            </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export const FormikStep: React.FC<FormikStepperProps<UserDataProps>> = ({children}) => {
    return <>{children}</>
}