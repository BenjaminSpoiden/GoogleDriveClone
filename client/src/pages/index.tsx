import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { Container } from '../components/Container'
import { Hero } from '../components/Hero'

const Index = () => (
  <>
    <Head>
      <title>GD Clone</title>
    </Head>
    <Container height="auto">
      <Flex
          direction="column"
          align="center"
          maxW={{xl: "1440px"}}
          m="auto"
          px={[0, 2, 4]}
      >
          <Hero />
      </Flex> 
    </Container>
  </>
)

export default Index
