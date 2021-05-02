import React, { InputHTMLAttributes } from "react"
import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react"
import { useField } from "formik"

type DropdownMenuProps = SelectProps & InputHTMLAttributes<HTMLInputElement> &{
    label: string,
    name: string,
    placeholder: string,
    dropdownItems: any[]
    selectSize?: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({label, placeholder, selectSize = "md", dropdownItems, ...props}) => {

    const [field] = useField(props)

    return (
        <FormControl id={field.name} mt={4}>
            <FormLabel fontSize="sm" >{label}</FormLabel>
            <Select size={selectSize} id={field.name} placeholder={placeholder} {...props} >
                {dropdownItems.map((dropdownItem, index) => (
                    <option key={index} value={dropdownItem}>{dropdownItem}</option>
                ))}
            </Select>
        </FormControl>
    )
}