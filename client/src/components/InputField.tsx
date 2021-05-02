import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, InputProps, InputRightElement } from "@chakra-ui/react"
import { useField } from "formik"
import React, { InputHTMLAttributes } from "react"

type InputFielProps = InputHTMLAttributes<HTMLInputElement> & InputProps & {
    label: string, 
    name: string,
    icon?: JSX.Element
    righIcon?: JSX.Element
    onShow?: () => void
    inputSize?: string
}

export const InputField: React.FC<InputFielProps> = ({label, icon, inputSize='md', righIcon, onShow, ...props}) => {

    const [field, {error}] = useField(props)

    return (
        <FormControl isInvalid={!!error} mt={4} >
            <FormLabel fontSize="sm" htmlFor={field.name} >
                {label}
            </FormLabel>
            <InputGroup size={inputSize} >
                { icon ? <InputLeftElement children={icon} /> : null}
                <Input {...field} {...props} id={field.name} />
                { righIcon ? <InputRightElement onClick={onShow} children={righIcon} /> : null}
            </InputGroup>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}