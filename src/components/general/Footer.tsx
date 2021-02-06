import { Box, Divider, Flex, HStack, Link, Text } from '@chakra-ui/react';
import React from 'react'

import logo from '../../assets/reserly-logo.png';

export const Footer: React.FC = () => {
  return (
    <Flex bg='secondary' py={10} px={4} mt={24}>
      <Flex direction='column' w='1180px' mx='auto'>
        <Box>
          <Link href="/">
            <img src={logo} alt="uorder" width="120" height="90" />
          </Link>
          <HStack spacing={5} py={4}>
            <Link target='_blank' fontWeight='500' color='#FFFFFF' fontSize='sm' href={`${process.env.REACT_APP_WEB_URL}/terminos-y-condiciones`}>
              Terminos y condiciones
            </Link>
            <Link target='_blank' fontWeight='500' color='#FFFFFF' fontSize='sm' href={`${process.env.REACT_APP_WEB_URL}/aviso-de-privacidad`}>
              Politica de privacidad
            </Link>
            <Text fontWeight='500' color='#FFFFFF' fontSize='sm'>
              Contacto: hola@reserly.mx
            </Text>
          </HStack>
        </Box>
        <Box>
          <Link target='_blank' fontWeight='500' color='#FFFFFF' fontSize='sm' href='https://www.facebook.com/reserlymx'>
            {/* <FaFacebook size={28} /> */}
            Facebook de Reserly
          </Link>
        </Box>
        <Divider my={6} borderColor='#FFFFFF' />
        <Text fontWeight='500' color='#FFFFFF' fontSize='sm'>
          © Reserly. Todos los derechos reservados
        </Text>
      </Flex>
    </Flex>
  );
}