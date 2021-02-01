import React from 'react'
import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { Link as Lnk } from 'react-router-dom';

interface WrapperSettingsProps {

}

const MenuLink: React.FC<{ title: string, href: string }> = ({title, href}) => (
  <Link as={Lnk} to={href} fontWeight='bold' pr={4}>
    <Flex direction='row'>
      <Text fontSize='md'>{title}</Text>
    </Flex>
  </Link>
)

export const WrapperSettings: React.FC<WrapperSettingsProps> = ({ children }) => {
  return (
    <Box>
      <HStack mt={4} borderBottomWidth={1} borderColor='borders' py={3}>
        <MenuLink title='Servicios' href='/settings/services' />
        <MenuLink title='Datos básicos' href='/settings' />
        <MenuLink title='Ubicación' href='/settings/location' />
        <MenuLink title='Dirección' href='/settings/address' />
        <MenuLink title='Horario' href='/settings/hours' />
        <MenuLink title='Fotos' href='/settings/photos' />
        {/* <MenuLink title='Usuario' href='/settings' /> */}
      </HStack>

      <Box my={4} bg='surface' borderColor='borders' borderWidth={1} p={6} borderRadius={3}>
        {children}
      </Box>

    </Box>
  );
}