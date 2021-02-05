import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { AuthProdiver } from '../context/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AuthProdiver>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProdiver>
  )
}

export default MyApp
