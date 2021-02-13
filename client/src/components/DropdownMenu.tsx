import React, { InputHTMLAttributes } from "react"
import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react"
import { useField } from "formik"

type DropdownMenuProps = SelectProps & InputHTMLAttributes<HTMLInputElement> &{
    id: string,
    name: string,
    placeholder: string,
    dropdownItems: string[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({id, placeholder, dropdownItems, ...props}) => {

    const [field] = useField(props)

    return (
        <FormControl id={id} mt={4}>
            <FormLabel>{field.name}</FormLabel>
            <Select id={id} placeholder={placeholder} {...props} >
                {dropdownItems.map((dropdownItem, index) => (
                    <option key={index} value={dropdownItem}>{dropdownItem}</option>
                ))}
            </Select>
        </FormControl>
    )
}