import React from "react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode,  IconButton, IconButtonProps } from '@chakra-ui/react'

export const DarkModeSwitch: React.FC<IconButtonProps> = ({...props}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <IconButton
      colorScheme="whatsapp"
      fontSize="20px"
      children={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      {...props}
    />
  )
}
