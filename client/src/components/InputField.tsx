import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react"
import { useField } from "formik"
import { InputHTMLAttributes } from "react"

type InputFielProps = InputHTMLAttributes<HTMLInputElement> & InputProps & {
    label: string, 
    name: string,
}

export const InputField: React.FC<InputFielProps> = ({label, size:_, ...props}) => {

    const [field, {error}] = useField(props)

    return (
        <FormControl isInvalid={!!error} mt={4} >
            <FormLabel htmlFor={field.name} >
                {label}
            </FormLabel>
            <Input {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}