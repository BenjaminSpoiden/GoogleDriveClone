import { FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react"

type PaymentInputsFielProps = InputHTMLAttributes<HTMLInputElement> & InputProps & {
    label: string, 
    name: string,
}

export const PaymentInput: React.FC<PaymentInputsFielProps> = ({label, ...props}) => {

    const [field] = useField(props)

    return (
        <FormLabel>
            <FormLabel htmlFor={field.name} >
                {label}
            </FormLabel>
                <Input id={field.name} {...field} {...props}/>
        </FormLabel>
    )
}